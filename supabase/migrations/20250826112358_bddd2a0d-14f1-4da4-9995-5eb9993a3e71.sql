-- Create a table for venue locations
CREATE TABLE public.venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  available_space_percent INTEGER NOT NULL DEFAULT 100 CHECK (available_space_percent >= 0 AND available_space_percent <= 100),
  venue_type TEXT NOT NULL DEFAULT 'cafe' CHECK (venue_type IN ('cafe', 'gym', 'salon', 'waiting_area', 'restaurant', 'other')),
  screen_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (venues are publicly viewable)
CREATE POLICY "Venues are publicly viewable" 
ON public.venues 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_venues_updated_at
BEFORE UPDATE ON public.venues
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for Cape Town venues
INSERT INTO public.venues (name, address, latitude, longitude, status, available_space_percent, venue_type, screen_count) VALUES
('Truth Coffee', '36 Buitenkant St, Cape Town', -33.9249, 18.4241, 'active', 75, 'cafe', 2),
('V&A Waterfront Gym', 'V&A Waterfront, Cape Town', -33.9022, 18.4190, 'active', 60, 'gym', 3),
('Green Point Salon', 'Green Point, Cape Town', -33.9064, 18.4036, 'pending', 90, 'salon', 1),
('Sea Point Promenade Cafe', 'Sea Point Promenade, Cape Town', -33.9147, 18.3838, 'active', 40, 'cafe', 2),
('Cape Town CBD Office', 'Long St, Cape Town', -33.9191, 18.4227, 'pending', 100, 'waiting_area', 1),
('Kloof Street Restaurant', 'Kloof St, Cape Town', -33.9344, 18.4082, 'active', 30, 'restaurant', 2),
('Green Point Urban Park', 'Fritz Sonnenberg Rd, Green Point', -33.9084, 18.4104, 'pending', 85, 'other', 1),
('Canal Walk Shopping Centre', 'Century Blvd, Century City', -33.8910, 18.4957, 'active', 55, 'waiting_area', 4),
('Sea Point Medical Centre', 'Main Rd, Sea Point', -33.9156, 18.3894, 'active', 70, 'waiting_area', 1);