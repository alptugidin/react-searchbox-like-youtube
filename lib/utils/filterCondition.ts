import { ISearchResult } from '../types';

export const filterCondition = (param: ISearchResult, value: string): ISearchResult => {
  let output;
  if (param.title.toLowerCase().includes(value.toLocaleLowerCase())) {
    output = param;
  }
  return output as ISearchResult;
};
