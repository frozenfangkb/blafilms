import React, { useState, useEffect } from 'react'
import './App.css'
import DisableOverlay from './components/DisableOverlay'
import SearchBar from './components/SearchBar'
import SearchResultArea from './components/SearchResultArea'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [canChangePage, setCanChangePage] = useState(true);
  const [page, setPage] = useState(1);

  const makeSearch = async () => {
    if(searchInput !== "") {
      setLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&s=${searchInput}&page=${page}`,
      );
  
      const data = await response.json();

      if(data.Response === "True")
      {
        setSearchResult([]);
        setSearchResult(data.Search);
        setErrorMessage("");
        setCanChangePage(true);
      } else {
        switch (data.Error) {
          case "Too many results.":
            setErrorMessage(`Well, that search seems to be too ambiguous... Try to be more specific`);
            setSearchResult([]);
            setCanChangePage(false);
            break;
          case "Movie not found!":
            setErrorMessage(`We can't find any movie with that search query :(`);
            setSearchResult([]);
            setCanChangePage(false);
            break;
          default:
            setErrorMessage(`Oooops! Something nasty happened... Please try again later`);
            setSearchResult([]);
            setCanChangePage(false);
            break;
        }
      }
      setLoading(false);
    } 
  }

  const handleSearch = async (resetQuery, increasePage) => {
    if(resetQuery) {
      if(page === 1) {
        makeSearch();
      } else {
        setPage(1);
      }
    } else {
      if(increasePage) {
        setPage(page+1);
      } else {
        setPage(Math.max(1, page-1));
      }
    }
  }

  useEffect(() => {
    makeSearch();
  }, [page]);

  return (
    <div className="App">
      {loading ? <DisableOverlay /> : ""}
      <SearchBar
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        errorMessage={errorMessage}
      />
      {!searchResult ? (
        <p className="searchPlaceholder">No results yet</p>
      ) : (
        <SearchResultArea 
          canChangePage={canChangePage}
          handleSearch={handleSearch}
          searchResult={searchResult}
        />
      )}
    </div>
  )
}

export default App
