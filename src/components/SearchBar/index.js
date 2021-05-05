import React from 'react';

export default function SearchBar(props) {

    const { searchInput, setSearchInput, handleSearch, errorMessage } = props;

    return (
        <>
            <div className="errorArea">{errorMessage}</div>
            <div className="search">
                <input type="text" placeholder="Search..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
                <button onClick={() => handleSearch(true, false)}>Search</button>
            </div>
        </>
    );
}
