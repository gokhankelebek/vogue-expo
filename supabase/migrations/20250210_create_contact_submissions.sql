-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT,
    interest TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new'
);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from the website
CREATE POLICY "Allow anonymous submissions" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow admin to read all submissions
CREATE POLICY "Allow admin read" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);
