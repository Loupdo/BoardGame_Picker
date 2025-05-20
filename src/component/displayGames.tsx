import Game from "./Game"; // adjust path as needed
import { BoardGame } from "../interface";

type DisplayGamesProps = {
  collection: BoardGame[];
  onUpdateGame: (updatedGame: BoardGame) => void;
};

function DisplayGames({ collection, onUpdateGame }: DisplayGamesProps) {
  return (
    <div className="container my-4">
      <div className="row">
        {collection.map((game, index) => (
          <div key={index} className="col-12 col-lg-6 mb-4">
            <Game game={game} onUpdateGame={onUpdateGame} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayGames;
