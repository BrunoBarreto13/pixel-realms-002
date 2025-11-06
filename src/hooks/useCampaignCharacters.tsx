import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Character } from "@/pages/dashboard/character-sheet/types";

interface CampaignCharacter {
  id: string;
  character_name: string;
  player_name: string;
  level: number;
  character_data: Character;
}

const fetchCampaignCharacters = async (campaignName: string | null): Promise<CampaignCharacter[]> => {
  if (!campaignName) return [];

  const { data, error } = await supabase
    .from('characters')
    .select('id, character_name, player_name, level, character_data')
    .eq('campaign_name', campaignName)
    .order('player_name', { ascending: true });

  if (error) {
    console.error("Error fetching campaign characters:", error);
    throw new Error(error.message);
  }

  return data.map(row => ({
    ...row,
    character_data: row.character_data as unknown as Character,
  })) as CampaignCharacter[];
};

export const useCampaignCharacters = () => {
  const { profile, isMaster, loading: authLoading } = useAuth();
  const campaignName = profile?.campaign_name;

  const { data, isLoading, error } = useQuery({
    queryKey: ['campaignCharacters', campaignName],
    queryFn: () => fetchCampaignCharacters(campaignName),
    enabled: isMaster && !authLoading && !!campaignName,
    initialData: [],
  });

  return {
    characters: data,
    isLoading,
    error,
  };
};