-- Create waiting list table
CREATE TABLE public.waiting_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  type TEXT NOT NULL CHECK (type IN ('advertiser', 'venue_owner')),
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (waiting list signup should be public)
CREATE POLICY "Anyone can insert into waiting list" 
ON public.waiting_list 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing (optional - if you want to show a list later)
CREATE POLICY "Public can view waiting list" 
ON public.waiting_list 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_waiting_list_updated_at
  BEFORE UPDATE ON public.waiting_list
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();