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
  }

export type FilterOptions = Array<CategoryObject>
