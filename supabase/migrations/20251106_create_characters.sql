-- Create characters table required by the app
CREATE TABLE IF NOT EXISTS public.characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_name TEXT NULL,
  character_name TEXT NOT NULL,
  player_name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  character_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;

-- Policies
-- Users can view their own characters
CREATE POLICY "Users can view their own characters"
  ON public.characters FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Masters can view all characters (broad policy for simplicity)
CREATE POLICY "Masters can view all characters"
  ON public.characters FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'master'));

-- Users can insert their own characters
CREATE POLICY "Users can insert their own characters"
  ON public.characters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own characters
CREATE POLICY "Users can update their own characters"
  ON public.characters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Masters can update any character (optional, helpful for campaign admin)
CREATE POLICY "Masters can update any character"
  ON public.characters FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'master'));

-- Users can delete their own characters
CREATE POLICY "Users can delete their own characters"
  ON public.characters FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Timestamp trigger to maintain updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at_characters()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at_characters
  BEFORE UPDATE ON public.characters
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at_characters();

-- Helpful index for campaign queries
CREATE INDEX IF NOT EXISTS characters_campaign_name_idx ON public.characters (campaign_name);