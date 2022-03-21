import { AdvancedSearchResponseData } from '../../../model/types/advancedSearch';

/* eslint-disable @typescript-eslint/ban-types */
export type ValueObject = {
    type: string,
    value: string,
  }

export type CategoryObject = {
    category: string
    subcategories?: Array<string>
  }

export type AdvancedSearchProps = {
    filterOptions: Array<CategoryObject>
    onSearching?: Function;
    searchResults: AdvancedSearchResponseData;
    onResultSelect?: Function;
  }

export type FilterOptions = Array<CategoryObject>

export type OptionType={
    label: JSX.Element;
    value: string;
}
