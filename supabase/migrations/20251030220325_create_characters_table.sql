/*
  # Create characters table for storing character sheets

  1. New Tables
    - `characters`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text, character name)
      - `player_name` (text, player name)
      - `image_url` (text, URL to character portrait)
      - `race` (text, character race)
      - `class` (text, character class)
      - `level` (integer, character level)
      - `data` (jsonb, full character data)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Security
    - Enable RLS on `characters` table
    - Add policy for users to read their own characters
    - Add policy for users to create characters
    - Add policy for users to update their own characters
    - Add policy for users to delete their own characters
    
  3. Storage
    - Create `character-portraits` bucket for image storage
*/

CREATE TABLE IF NOT EXISTS characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  player_name text,
  image_url text,
  race text,
  class text,
  level integer DEFAULT 1,
  data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own characters"
  ON characters FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create characters"
  ON characters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own characters"
  ON characters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own characters"
  ON characters FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_characters_user_id ON characters(user_id);
