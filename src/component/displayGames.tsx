import { BoardGame } from '../interface';


function Game({ game }: { game: BoardGame }) {
  const playersDiffValue = game.playerMax && game.playerMin ? game.playerMax - game.playerMin : null;
  return (
    <div className='gameCard'>
      <div className="gameDetails">
        {game.image && (
          <div className="imageContainer">
            <img className='gameImage' src={game.image} alt={`${game.name} cover`} />
          </div>
        )}
        <div className='gameInfo'>
          <h2>{game.name} ({game.yearPublished})</h2>
          <p>Number of players:{" "}
            {playersDiffValue === 0 ? game.playerMin : `${game.playerMin} - ${game.playerMax}`}
          </p>
          <p>Average playtime: {game.playtime} min</p>
          <p>Rated {game.usersRated} by {game.popularity} players</p>
          <p>Theme: {game.theme}</p>
          <p>Main mechanics: {game.mainMechanics}</p>
        </div>
        <div className='gameEdit'>
          <label htmlFor='newThemeGame'>Theme:</label>
          <input id='newThemeGame' />
          <label htmlFor='newMechGame'>Mechanics:</label>
          <input id='newMechGame' />
          <button>Edit Theme and main mechanics</button>
        </div>
      </div>
    </div>
  );
}


function DisplayGames({collection} : { collection: BoardGame[] }) {
    return (
    <>
    {collection.map((game, index) => (
        <Game key={index} game={game} />
      ))}
    </> )
}

export default DisplayGames;
