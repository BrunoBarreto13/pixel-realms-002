-- Align profiles schema with app types (optional but recommended)
-- Add columns if they don't exist and keep existing data
DO $$
BEGIN
  -- Add full_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
    -- Populate full_name from existing name if present
    UPDATE public.profiles SET full_name = name WHERE full_name IS NULL;
  END IF;

  -- Add campaign_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'campaign_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN campaign_name TEXT;
  END IF;

  -- Add character_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'character_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN character_name TEXT;
  END IF;

  -- Add role column (string cache for quick reads)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT;
  END IF;
END $$;

-- Keep existing RLS; optional: allow reading own profile
-- Already handled by previous migration policies.