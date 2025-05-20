export interface BoardGame {
    name: string;
    yearPublished: number | null;
    image: string | null;
    thumbnail: string | null;
    playerMin: number | null;
    playerMax: number | null;
    playtime: number | null;
    usersRated: number;
    popularity: number;
    theme: string;
    mainMechanics: string[];
  }

