import {useState} from 'react'
import DisplayGames from './component/displayGames';
import fullCollection from './collection';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <>
      <h1> Board Game </h1>
      <button>Filters</button>
      
      <button>Search</button>
      <DisplayGames collection={fullCollection}></DisplayGames>
    </>
  );
}

export default App;
