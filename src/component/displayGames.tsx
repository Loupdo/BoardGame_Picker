import { useState } from "react";
import { BoardGame } from "../interface";

function Game({ game }: { game: BoardGame }) {
  const [showForm, setShowForm] = useState(false);
  const playersDiffValue =
    game.playerMax && game.playerMin ? game.playerMax - game.playerMin : null;

  return (
    <div className="card shadow-m gameCard">
      <div className="card-body text-center">
        <h4 className="card-title">
          {game.name}{" "}
          <small className="text-muted">({game.yearPublished})</small>
        </h4>
        <hr></hr>
        <div className="row g-0 h-100">
          {game.image && (
            <div className="col-md-4">
              <img
                src={game.image}
                alt={`${game.name} cover`}
                className="img-fluid rounded gameImage"
              />
            </div>
          )}

          <div className="col-md-8">
            <p className="card-text mb-1">
              <strong>Players:</strong>{" "}
              {playersDiffValue === 0
                ? game.playerMin
                : `${game.playerMin} - ${game.playerMax}`}
            </p>
            <p className="card-text mb-1">
              <strong>Playtime:</strong> {game.playtime} min
            </p>
            <p className="card-text mb-1">
              <strong>Rated:</strong> {game.usersRated} by {game.popularity}{" "}
              players
            </p>
            <p className="card-text mb-1">
              <strong>Theme:</strong> {game.theme}
            </p>
            <p className="card-text mb-3">
              <strong>Mechanics:</strong> {game.mainMechanics}
            </p>

            <button
              className="btn btn-outline-primary btn-sm mb-3"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel Edit" : "Edit Theme and Mechanics"}
            </button>

            {showForm && (
              <form>
                <div className="mb-3">
                  <label htmlFor="newThemeGame" className="form-label">
                    Theme
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newThemeGame"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newMechGame" className="form-label">
                    Mechanics
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newMechGame"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayGames({ collection }: { collection: BoardGame[] }) {
  return (
    <div className="container my-4">
      <div className="row">
        {collection.map((game, index) => (
          <div key={index} className="col-12 col-lg-6 mb-4">
            <Game game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayGames;
