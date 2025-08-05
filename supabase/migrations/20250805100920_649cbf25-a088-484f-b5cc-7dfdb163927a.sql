-- Drop existing storage policies that might be problematic
DROP POLICY IF EXISTS "Anyone can view report files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload report files" ON storage.objects;

-- Create comprehensive storage policies for the reports bucket
CREATE POLICY "Anyone can view report files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'reports');

CREATE POLICY "Anyone can upload report files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'reports');

CREATE POLICY "Anyone can update report files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'reports')
WITH CHECK (bucket_id = 'reports');

CREATE POLICY "Anyone can delete report files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'reports');