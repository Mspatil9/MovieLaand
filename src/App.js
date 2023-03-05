import React, { useState } from "react";
//c712953d
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
const API_URL = " http://www.omdbapi.com/?i=tt3896198&apikey=c712953d";

const movie1 = {
  Title: "Batman v Superman: Dawn of Justice (Ultimate Edition)",
  Year: "2016",
  imdbID: "tt18689424",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BN2I4OTllM2MtMWVhNC00MjkzLWJlMDUtN2FhMGQ2ZGVjMjllXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm] =useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
    searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);
  return (
    <div className="app">
      <h1> MovieLand </h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}  onKeyDown={handleKeyPress}/>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {/* <MovieCard movie1={movies[0]}/> shows only one card */}

          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
