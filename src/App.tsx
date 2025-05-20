import { useState, useEffect } from "react";
import { BoardGame } from "./interface";

// component
import DisplayGames from "./component/displayGames";

// variable
import fullCollection from "./collection";
import mechanicsList from "./mechanics";

// function on Collection
import sortCollection from "./component/sortCollection";
import filterCollection from "./component/filterCollection";

function App() {
  const [sortTerm, setSortTerm] = useState("Alphabetic");
  const [timePlay, setTimePlay] = useState("180");
  const [numPlayer, setNumPlayer] = useState(100);
  const [selectedMechanic, setSelectedMechanic] = useState("");

  const [collection, setCollection] = useState(() => {
    const saved = localStorage.getItem("collection");
    return saved ? JSON.parse(saved) : fullCollection;
  });

  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="container my-4">
      <img
        className="mainLogo"
        src="/logoPaPlong.png"
        alt="pick-a-play logo"
      ></img>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <div className="dropdown">
          <button
            className="btn btnColor dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort: {sortTerm}
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <button
                className={`dropdown-item ${
                  sortTerm === "Alphabetic" ? "active" : ""
                }`}
                onClick={() => {
                  setSortTerm("Alphabetic");
                  setCollection(sortCollection(sortTerm, collection));
                }}
              >
                Alphabetic
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  sortTerm === "PlayerNumber" ? "active" : ""
                }`}
                onClick={() => {
                  const newSortTerm = "PlayerNumber";
                  setSortTerm(newSortTerm);
                  setCollection(sortCollection(newSortTerm, collection));
                }}
              >
                Max Number of Players (Descending)
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  sortTerm === "PlayTime" ? "active" : ""
                }`}
                onClick={() => {
                  const newSortTerm = "PlayTime";
                  setSortTerm(newSortTerm);
                  setCollection(sortCollection(newSortTerm, collection));
                }}
              >
                Playtime
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  sortTerm === "Grade" ? "active" : ""
                }`}
                onClick={() => {
                  const newSortTerm = "Grade";
                  setSortTerm(newSortTerm);
                  setCollection(sortCollection(newSortTerm, collection));
                }}
              >
                Grade
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  sortTerm === "Popularity" ? "active" : ""
                }`}
                onClick={() => {
                  const newSortTerm = "Popularity";
                  setSortTerm(newSortTerm);
                  setCollection(sortCollection(newSortTerm, collection));
                }}
              >
                Popularity
              </button>
            </li>
          </ul>
        </div>
        <button
          className="btn btnColor dropdown-toggle "
          type="button"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide Filter" : "Show Filter"}
        </button>
      </div>
      {showFilter && (
        <form className="px-4 py-3 formGame">
          <div className="form-group mb-3">
            <label htmlFor="numberPlayers">
              Number of players: {numPlayer}
            </label>
            <input
              type="range"
              className="form-control"
              id="numberPlayers"
              min="1"
              max="100"
              value={numPlayer}
              onChange={(e) => setNumPlayer(Number(e.target.value))}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="timePlay">Time: less than {timePlay} min</label>
            <input
              type="range"
              className="form-control"
              id="timePlay"
              min="10"
              max="180"
              value={timePlay}
              onChange={(e) => setTimePlay(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="mechanics">Mechanics</label>
            <select
              className="form-control"
              id="mechanics"
              value={selectedMechanic}
              onChange={(e) => setSelectedMechanic(e.target.value)}
            >
              <option value="">-- Select a mechanic --</option>
              {mechanicsList.map((mech) => (
                <option key={mech} value={mech}>
                  {mech}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              const filtered = filterCollection(
                numPlayer,
                Number(timePlay),
                selectedMechanic,
                fullCollection
              );
              setCollection(sortCollection(sortTerm, filtered));
            }}
          >
            Filter
          </button>
        </form>
      )}
      <DisplayGames
        collection={collection}
        onUpdateGame={(updatedGame) => {
          const updatedCollection = collection.map((game: BoardGame) =>
            game.name === updatedGame.name ? updatedGame : game
          );
          setCollection(updatedCollection);
        }}
      />
    </div>
  );
}

export default App;
