export type FormFields = {
  type: 'input' | 'select' | 'slider' | 'string' | string,
  name: string,
  label: string,
  multiple: boolean,
  required: boolean,
  message?: string,
  min?: number,
  max?: number,
  step?: number,
  placeholder?: string,
  options?: Array<string>,
  default?: string | number | Array<string | number>
}
