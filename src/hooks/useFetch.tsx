import React, { useEffect, useState } from 'react';
import { ISearchResult } from '../../lib/types';
interface IFetchMovies {
    asyncResults: ISearchResult[] | undefined
}
export const useFetch = (param: string): IFetchMovies => {
  const [asyncResults, setResults] = useState<ISearchResult[]>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=9d6d5955&s=${param}`)
      .then(async res => await res.json())
      .then(result => {
        setResults(result.Search);
      })
      .catch(err => setError(err));
  }, [param]);
  return { asyncResults };
};

/**
 *    "Search": [
        {
            "Title": "The Tit and the Moon",
            "Year": "1994",
            "imdbID": "tt0111403",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjcwNTE2YzgtNjM0OC00MzA3LTg3ZjctYzkwYmJhNTBhY2FmXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"
        },
 *
 */
