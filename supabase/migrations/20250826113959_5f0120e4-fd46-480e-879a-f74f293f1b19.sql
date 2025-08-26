-- Remove the dangerous public SELECT policy on waiting_list table
DROP POLICY IF EXISTS "Public can view waiting list" ON public.waiting_list;

-- Create a secure policy that only allows admins to view waiting list entries
-- For now, we'll remove public access entirely since there's no admin system yet
-- Users can still sign up (INSERT policy remains), but can't view the list

-- Note: Once authentication and admin roles are implemented, 
-- you can add a policy like:
-- CREATE POLICY "Admins can view waiting list" ON public.waiting_list
-- FOR SELECT USING (public.has_role(auth.uid(), 'admin'));