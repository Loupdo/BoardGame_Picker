import { BoardGame } from '../interface';

export default function filterCollection(
  playerCount: number,
  maxPlaytime: number,
  selectedMechanics: string[],
  collection: BoardGame[]
): BoardGame[] {
  return collection.filter(game => {
    if (game.playtime! > maxPlaytime) 
      return false;
    if ( playerCount < game.playerMin! || playerCount > game.playerMax!)
      return false;
    if ( selectedMechanics.length > 0 && selectedMechanics.includes(game.mainMechanics)
      ) return false;
    return true;
  });
}