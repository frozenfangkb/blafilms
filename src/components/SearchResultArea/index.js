import React from 'react';
import { ReactComponent as ChevronLeft } from '../../chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../chevron-right.svg'

export default function SearchResultArea(props) {
    const { handleSearch, canChangePage, searchResult } = props;

    return (
        <div className="search-results">
          <div className="chevron">
            {canChangePage ? <ChevronLeft onClick={() => handleSearch(false, false)} /> : ''}
          </div>
          <div className="search-results-list">
            {searchResult.map(result => (
              <div key={result.imdbID+Math.random(0,1024).toString()} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? "/assets/img/placeholder.png" : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron">
            {canChangePage ? <ChevronRight onClick={() => handleSearch(false, true)} /> : ''}
          </div>
        </div>
    );
}
