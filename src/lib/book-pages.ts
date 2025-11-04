const TOTAL_PAGES = 320;

export const PLAYER_HANDBOOK_PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  return `/books/players-handbook/page_${i + 1}.jpg`;
});