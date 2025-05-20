import { useState } from "react";
import { BoardGame } from "../interface";
import mechanicsList from "../mechanics";

type GameProps = {
  game: BoardGame;
  onUpdateGame: (updatedGame: BoardGame) => void;
};
function Game({ game, onUpdateGame }: GameProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedMechanics, setSelectedMechanics] = useState<string[]>(
    Array.isArray(game.mainMechanics) ? game.mainMechanics : []
  );
  const [mechanics, setMechanics] = useState<string[]>(
    mechanicsList.filter((mech) => !game.mainMechanics?.includes(mech))
  );
  const [theme, setTheme] = useState<string>(game.theme || "Not entered yet");

  const playersDiffValue =
    game.playerMax && game.playerMin ? game.playerMax - game.playerMin : null;

  const handleMechanicSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected) {
      setSelectedMechanics((prev) => [...prev, selected]);
      setMechanics((prev) => prev.filter((mech) => mech !== selected));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedGame: BoardGame = {
      ...game,
      theme,
      mainMechanics: selectedMechanics,
    };
    onUpdateGame(updatedGame);
    setShowForm(false);
  };

  return (
    <div className="card shadow-m gameCard">
      <div className="card-body text-center">
        <h4 className="card-title">
          {game.name}{" "}
          <small className="text-muted">({game.yearPublished})</small>
        </h4>
        <hr />
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
              <strong>Theme:</strong> {game.theme || "Not entered yet"}
            </p>
            <p className="card-text mb-3">
              <strong>Mechanics:</strong>{" "}
              {Array.isArray(game.mainMechanics) &&
              game.mainMechanics.length > 0
                ? game.mainMechanics.join(", ")
                : "None selected"}
            </p>

            <button
              className="btn btn-outline-primary btn-sm mb-3"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Cancel Edit" : "Edit Theme and Mechanics"}
            </button>

            {showForm && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="newThemeGame" className="form-label">
                    Theme
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newThemeGame"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newMechGame" className="form-label">
                    Mechanics
                  </label>
                  <select
                    className="form-select"
                    id="newMechGame"
                    onChange={handleMechanicSelect}
                    value=""
                  >
                    <option value="">Select a mechanic</option>
                    {mechanics.map((mech, index) => (
                      <option key={index} value={mech}>
                        {mech}
                      </option>
                    ))}
                  </select>

                  {selectedMechanics.length > 0 && (
                    <div className="mt-2">
                      <strong>Selected Mechanics:</strong>{" "}
                      {selectedMechanics.map((mech) => (
                        <span
                          key={mech}
                          style={{
                            display: "inline-block",
                            marginRight: "8px",
                            padding: "2px 6px",
                            border: "1px solid #007bff",
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedMechanics((prev) =>
                              prev.filter((m) => m !== mech)
                            );
                            setMechanics((prev) => [...prev, mech].sort());
                          }}
                          title="Click to remove"
                        >
                          {mech} &times;
                        </span>
                      ))}
                    </div>
                  )}
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

export default Game;
