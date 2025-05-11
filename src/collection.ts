import { BoardGame } from './interface'
import collectionData from './data.json'; 

export function convertGameData(collection: any): BoardGame[] {
    return collection.items.item.map((game: any) => ({
      name: game.name?.__text || "Unknown",
      yearPublished: parseInt(game.yearpublished) || null,
      image: game.image || null,
      thumbnail: game.thumbnail || null,
      playerMin: parseInt(game.stats?._minplayers) || null,
      playerMax: parseInt(game.stats?._maxplayers) || null,
      playtime: parseInt(game.stats?._playingtime) || null,
      usersRated: parseFloat(game.stats?.rating?.average?._value).toFixed(2),
      popularity: parseInt(game.stats?._numowned) || null,
      theme: " Not entered yet",
      mainMechanics: " Not entered yet"
    }));
  }

const fullCollection:BoardGame[] = convertGameData(collectionData);

export default fullCollection