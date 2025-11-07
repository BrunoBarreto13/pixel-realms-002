import { useMemo } from 'react';
import { Character } from '@/pages/dashboard/character-sheet/types';
import { getClassFeatures, ClassFeatures } from '@/lib/class-features';

export const useClassFeatures = (character: Character): ClassFeatures | null => {
  return useMemo(() => {
    if (!character || !character.class) {
      return null;
    }
    return getClassFeatures(character.class);
  }, [character.class]);
};