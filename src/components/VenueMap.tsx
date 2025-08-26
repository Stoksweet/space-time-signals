import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";

type Venue = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: string;
  available_space_percent: number;
  venue_type: string;
  screen_count: number;
}

type MapState = 'loading' | 'loaded' | 'error' | 'no-api-key' | 'no-venues';

export const VenueMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [mapState, setMapState] = useState<MapState>('loading');
  const [error, setError] = useState<string>('');

  // Debug logging helper
  const log = (message: string, data?: any) => {
    console.log(`[VenueMap] ${message}`, data || '');
  };

  // Fetch venues from database
  const fetchVenues = async () => {
    log('Fetching venues from database...');
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*');
      
      if (error) {
        log('Error fetching venues:', error);
        setError(`Database error: ${error.message}`);
        setMapState('error');
        return;
      }
      
      log('Venues fetched successfully', { count: data?.length || 0 });
      setVenues(data || []);
      
      if (!data || data.length === 0) {
        setMapState('no-venues');
      }
    } catch (error) {
      log('Unexpected error fetching venues:', error);
      setError('Failed to load venue data');
      setMapState('error');
    }
  };

  // Fetch Google Maps API key
  const fetchApiKey = async (): Promise<string | null> => {
    log('Fetching Google Maps API key...');
    try {
      const { data, error } = await supabase.functions.invoke('get-google-maps-key');
      
      if (error) {
        log('Error fetching API key:', error);
        setError(`API key error: ${error.message}`);
        setMapState('no-api-key');
        return null;
      }
      
      if (!data?.apiKey) {
        log('No API key in response:', data);
        setError('Google Maps API key not configured');
        setMapState('no-api-key');
        return null;
      }
      
      log('API key fetched successfully');
      return data.apiKey;
    } catch (error) {
      log('Unexpected error fetching API key:', error);
      setError('Failed to fetch Google Maps API key');
      setMapState('no-api-key');
      return null;
    }
  };

  // Initialize Google Maps
  const initializeMap = async (apiKey: string) => {
    if (!mapRef.current) {
      log('Map container ref not available');
      setError('Map container not ready');
      setMapState('error');
      return;
    }

    if (venues.length === 0) {
      log('No venues available for map');
      setMapState('no-venues');
      return;
    }

    log('Initializing Google Maps...', { venueCount: venues.length });

    try {
      // Load Google Maps API
      const loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["marker"]
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      log('Google Maps API loaded, creating map instance...');

      // Create map instance
      const map = new Map(mapRef.current, {
        center: { lat: -33.9249, lng: 18.4241 },
        zoom: 12,
        mapId: "space-time-venues-map"
      });

      mapInstanceRef.current = map;
      log('Map instance created successfully');

      // Add venue markers
      log('Adding venue markers...');
      let markersAdded = 0;
      
      venues.forEach((venue, index) => {
        try {
          const markerContent = createMarkerContent(venue);
          
          new AdvancedMarkerElement({
            map,
            position: { lat: venue.latitude, lng: venue.longitude },
            content: markerContent,
            title: venue.name
          });
          
          markersAdded++;
          log(`Added marker ${index + 1}/${venues.length} for ${venue.name}`);
        } catch (markerError) {
          log(`Failed to add marker for ${venue.name}:`, markerError);
        }
      });

      log(`Map initialization complete! Added ${markersAdded}/${venues.length} markers`);
      setMapState('loaded');
      
    } catch (error) {
      log('Error initializing map:', error);
      setError(`Map initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setMapState('error');
    }
  };

  // Create marker content
  const createMarkerContent = (venue: Venue) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'relative';
    
    const statusColor = venue.status === 'active' ? 'bg-green-500' : 
                       venue.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500';
    
    markerDiv.innerHTML = `
      <div class="relative">
        <div class="w-8 h-8 ${statusColor} rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap border">
          ${venue.available_space_percent}% available
        </div>
      </div>
    `;
    
    return markerDiv;
  };

  // Main initialization effect
  useEffect(() => {
    let cancelled = false;

    const initializeEverything = async () => {
      log('Starting map initialization process...');
      
      // Step 1: Fetch venues
      await fetchVenues();
      
      if (cancelled) return;
      
      // Wait for venues to be set in state
      await new Promise(resolve => setTimeout(resolve, 100));
    };

    initializeEverything();

    return () => {
      cancelled = true;
      log('Cleanup: Map initialization cancelled');
    };
  }, []);

  // Effect to initialize map when venues are available
  useEffect(() => {
    if (venues.length === 0 || mapState !== 'loading') return;

    let cancelled = false;

    const setupMap = async () => {
      log('Setting up map with venues...', { venueCount: venues.length });
      
      // Step 2: Fetch API key
      const apiKey = await fetchApiKey();
      
      if (cancelled || !apiKey) return;
      
      // Step 3: Initialize map
      await initializeMap(apiKey);
    };

    setupMap();

    return () => {
      cancelled = true;
      log('Cleanup: Map setup cancelled');
    };
  }, [venues]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        log('Cleanup: Destroying map instance');
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render based on state
  if (mapState === 'loading') {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading venue map...</p>
        </div>
      </div>
    );
  }

  if (mapState === 'error') {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-red-300">
        <div className="text-center space-y-4 max-w-md">
          <MapPin className="h-16 w-16 text-red-500 mx-auto" />
          <h3 className="text-2xl font-semibold text-red-700">Map Error</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={() => {
              setMapState('loading');
              setError('');
              fetchVenues();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (mapState === 'no-venues') {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-primary mx-auto" />
          <h3 className="text-2xl font-semibold">No Venues Available</h3>
          <p className="text-muted-foreground max-w-md">
            No venue data found in the database. Check back later for venue locations.
          </p>
        </div>
      </div>
    );
  }

  if (mapState === 'no-api-key') {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-primary mx-auto" />
          <h3 className="text-2xl font-semibold">Map Configuration Required</h3>
          <p className="text-muted-foreground max-w-md">
            Google Maps API key needed to display venue locations. Found {venues.length} venues in database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] rounded-lg"
        style={{ height: '400px', width: '100%' }}
      />
    </div>
  );
};