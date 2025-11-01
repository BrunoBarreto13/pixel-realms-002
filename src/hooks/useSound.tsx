import { useCallback } from 'react';

const useSound = (soundFile: string, volume: number = 0.5) => {
  const play = useCallback(() => {
    try {
      const audio = new Audio(soundFile);
      audio.volume = volume;
      audio.play().catch(error => {
        // Autoplay was prevented, which is common.
        // We can ignore this error as it's not critical for UI sounds.
        console.warn("Sound autoplay prevented:", error);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [soundFile, volume]);

  return play;
};

export default useSound;