import React from 'react';
import cuid from 'cuid';
import { SearchResult } from './singleSearchResult';

const SearchResults = ({ searchResults }) => {
    return (
        <div>
            {searchResults.map(result => {
                return <SearchResult searchResult={result} key={cuid()}/>
            })}
        </div>
    );
};

export { SearchResults };
