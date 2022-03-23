/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormFields = {
  type: 'input' | 'select' | 'slider' | 'string' | string,
  name: string,
  label: string,
  multiple: boolean,
  required: boolean,
  message?: string,
  step?: number,
  placeholder?: string,
  selectOptions?: Array<string>,
  selectOptionsWithValue?: Array<{id: string, name: string}>
  default?: string | number | Array<string | number> | any
  sliderRange? : { min: number, max: number },
  sliderValue? : { min: number, max: number }
  onChange?: (val: any) => any
}
