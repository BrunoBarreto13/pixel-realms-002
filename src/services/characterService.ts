import { supabase } from "@/integrations/supabase/client";

export const uploadCharacterImage = async (
  file: File,
  userId: string,
  characterId: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${characterId}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from("character-portraits")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("character-portraits")
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading character image:", error);
    return null;
  }
};

export const deleteCharacterImage = async (
  userId: string,
  characterId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from("character-portraits")
      .remove([`${userId}/${characterId}`]);

    if (error) {
      console.error("Delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting character image:", error);
    return false;
  }
};
