import { BoardGame } from '../interface';

export default function sortCollection(sortTerm: string, collection: BoardGame[]): BoardGame[] {
  return [...collection].sort((a: BoardGame, b: BoardGame) => {
    switch (sortTerm) {
      case "PlayerNumber":
        return (b.playerMax ?? 0) - (a.playerMax ?? 0);
      case "PlayTime":
        return (a.playtime ?? 0) - (b.playtime ?? 0);
      case "Popularity":
        return (b.popularity ?? 0) - (a.popularity ?? 0);
      case "Grade":
        return (b.usersRated ?? 0) - (a.usersRated ?? 0);
      case "Alphabetic":
      default:
        return a.name.localeCompare(b.name);
    }
  });
}