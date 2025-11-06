import { supabase } from './client';

type TableStatus = {
  name: string;
  exists: boolean;
  rls_ok: boolean;
  error?: string;
};

type StorageStatus = {
  bucket: string;
  exists: boolean;
};

export const checkTable = async (table: string): Promise<TableStatus> => {
  try {
    const { data, error } = await supabase
      .from(table as any)
      .select('*')
      .limit(1);

    if (error) {
      const msg = (error as any)?.message || String(error);
      const exists = !/schema cache|does not exist|not exist/i.test(msg);
      const rlsDenied = /permission denied|policy|not allowed/i.test(msg);
      return { name: table, exists, rls_ok: !rlsDenied, error: msg };
    }
    // No error means table exists and SELECT is allowed by RLS
    return { name: table, exists: true, rls_ok: true };
  } catch (e: any) {
    const msg = e?.message || String(e);
    const exists = !/schema cache|does not exist|not exist/i.test(msg);
    return { name: table, exists, rls_ok: false, error: msg };
  }
};

export const checkAvatarBucket = async (): Promise<StorageStatus> => {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      return { bucket: 'avatars', exists: false };
    }
    const exists = (data || []).some(b => b.id === 'avatars');
    return { bucket: 'avatars', exists };
  } catch {
    return { bucket: 'avatars', exists: false };
  }
};

export const runSupabaseHealthCheck = async () => {
  const [characters, profiles, diceRolls, avatars] = await Promise.all([
    checkTable('characters'),
    checkTable('profiles'),
    checkTable('user_roles'),
    checkAvatarBucket(),
  ]);

  return {
    tables: {
      characters,
      profiles,
      user_roles: diceRolls,
    },
    storage: avatars,
    env: {
      url: import.meta.env.VITE_SUPABASE_URL,
      keyPresent: !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
  };
};