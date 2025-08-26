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

export const VenueMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*');
      
      if (error) {
        console.error('Error fetching venues:', error);
        return;
      }
      
      setVenues(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
    // Don't set loading to false here - let the map initialization handle it
  };

  useEffect(() => {
    const initializeMapWhenReady = async () => {
      if (!venues.length || !mapRef.current || mapInitialized) {
        return;
      }

      try {
        console.log('Fetching Google Maps API key...');
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        
        if (error || !data?.apiKey) {
          console.error('Error fetching Google Maps API key:', error);
          setHasApiKey(false);
          setIsLoading(false);
          return;
        }
        
        console.log('API key received, initializing map...');
        setHasApiKey(true);
        await initializeMap(data.apiKey);
        setMapInitialized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error during map initialization:', error);
        setHasApiKey(false);
        setIsLoading(false);
      }
    };

    if (venues.length > 0) {
      console.log('Attempting to initialize map with', venues.length, 'venues');
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        initializeMapWhenReady();
      });
    } else if (venues.length === 0) {
      console.log('No venues yet...');
      // Keep loading until we have venues and map is ready
    }
  }, [venues, mapInitialized]);

  const initializeMap = async (apiKey: string) => {
    if (!mapRef.current) {
      console.log('Map ref not ready:', mapRef.current);
      throw new Error('Map container not ready');
    }
    
    if (venues.length === 0) {
      console.log('No venues available:', venues.length);
      throw new Error('No venues available');
    }
    
    console.log('Map initialization starting with', venues.length, 'venues');

    try {
      console.log('Loading Google Maps API...');
      const loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["marker"]
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      console.log('Creating map...');
      // Center map on Cape Town
      const map = new Map(mapRef.current, {
        center: { lat: -33.9249, lng: 18.4241 },
        zoom: 12,
      });

      console.log('Adding markers for', venues.length, 'venues...');
      // Add markers for each venue
      venues.forEach((venue, index) => {
        console.log(`Adding marker ${index + 1} for ${venue.name}`);
        const markerContent = createMarkerContent(venue);
        
        new AdvancedMarkerElement({
          map,
          position: { lat: venue.latitude, lng: venue.longitude },
          content: markerContent,
          title: venue.name
        });
      });
      
      console.log('Map successfully initialized with all markers');
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const createMarkerContent = (venue: Venue) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'relative';
    
    const statusColor = venue.status === 'active' ? 'bg-green-500' : 
                       venue.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500';
    
    markerDiv.innerHTML = `
      <div class="relative">
        <div class="w-8 h-8 ${statusColor} rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap border">
          ${venue.available_space_percent}% available
        </div>
      </div>
    `;
    
    return markerDiv;
  };

  if (isLoading) {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading venue map...</p>
        </div>
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-primary mx-auto" />
          <h3 className="text-2xl font-semibold">Interactive Coverage Map</h3>
          <p className="text-muted-foreground max-w-md">
            Google Maps integration ready - API key needed to display live venue locations
          </p>
          <div className="text-sm text-muted-foreground">
            Found {venues.length} venues in database
          </div>
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