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
    if (param !== undefined && param.length > 1) {
      const arr: ISearchResult[] = [];
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=204f2cebe811d76c47a873f7233cf17a&language=en-US&query=${param}&page=1&include_adult=false`)
        .then(async res => await res.json())
        .then(response => {
          response.results.forEach((data: any) => {
            const el: ISearchResult = {
              id: data.id,
              title: data.title,
              href: '/'
            };
            arr.push(el);
          });
        })
        .catch(err => setError(err))
        .finally(() => {
          setResults(arr);
        });
    }
  }, [param]);
  return { asyncResults };
};
