import { BoardGame } from '../interface';

export default function filterCollection(
  numPlayers: number,
  maxPlayTime: number,
  mechanic: string,
  games: BoardGame[]
): BoardGame[] {
  return games.filter((game) => {
    const fitsPlayer =
      game.playerMin! <= numPlayers && game.playerMax! >= numPlayers;
    const fitsTime = game.playtime! <= maxPlayTime;
    const hasMechanic = mechanic === "" || game.mainMechanics?.includes(mechanic);
    return fitsPlayer && fitsTime && hasMechanic;
  });
}