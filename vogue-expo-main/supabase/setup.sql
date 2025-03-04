-- Create an enum for interest types
CREATE TYPE interest_type AS ENUM ('custom', 'modular', 'sustainable', 'full');

-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL CHECK (char_length(name) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    company TEXT NOT NULL CHECK (char_length(company) >= 2),
    phone TEXT CHECK (phone ~* '^\+?[0-9\s-()]{10,20}$' OR phone IS NULL),
    interest interest_type NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) >= 10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    replied_at TIMESTAMPTZ
);

-- Create index for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous submissions
CREATE POLICY "Allow anonymous submissions" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy for admin to read all submissions
CREATE POLICY "Allow admin read" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy for admin to update status
CREATE POLICY "Allow admin update status" ON contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create a view for recent submissions
CREATE VIEW recent_submissions AS
SELECT 
    id,
    name,
    email,
    company,
    interest,
    status,
    created_at
FROM contact_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Create a function to mark submission as replied
CREATE OR REPLACE FUNCTION mark_submission_replied(submission_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE contact_submissions
    SET 
        status = 'replied',
        replied_at = NOW()
    WHERE id = submission_id;
END;
$$ LANGUAGE plpgsql;
