/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form, Input, Select, Slider,
} from 'antd';
import { FormFields } from '../../../model/types/formRenderer';
import IconRenderer from '../IconRenderer';

const renderOptions = (options: Array<string>) => options.map((option: string) => <Select.Option key={`option${option}`} value={option}>{option}</Select.Option>);

const renderSelect = (field: FormFields): JSX.Element => {
  if (field.multiple) {
    return (
      <Form.Item
        key={`field${field.name}`}
        name={field.name}
        label={field.label}
        className="formLabel"
        rules={[{ required: field.required || false, message: field.message || 'Not required' }]}
      >
        <Select
          showSearch
          mode="multiple"
        >
          {
            field.selectOptions
            && field.selectOptions.length > 0
            && renderOptions(field.selectOptions)
          }
        </Select>
      </Form.Item>
    );
  }
  return (
    <Form.Item
      key={`field${field.name}`}
      name={field.name}
      label={field.label}
      className="formLabel"
      rules={[{ required: field.required || true, message: field.message || 'Not required' }]}
    >
      <Select
        showSearch
      >
        {
          field.selectOptions
          && field.selectOptions.length > 0
          && renderOptions(field.selectOptions)
        }
      </Select>
    </Form.Item>
  );
};

const renderSlider = (field: FormFields):
JSX.Element => (
  <Form.Item
    key={`field${field.name}`}
    name={field.name}
    label={field.label}
  >
    <Slider
      range
      min={field.sliderRange ? field.sliderRange.min : 0}
      max={field.sliderRange ? field.sliderRange.max : 100}
      step={field.step}
      onChange={field.onChange}
      defaultValue={field.default}
    />
    <span>
      From
      {' '}
      {field.sliderValue ? field.sliderValue.min : '00'}
      $
    </span>
    {'     '}
    <span>
      To
      {' '}
      {field.sliderValue ? field.sliderValue.max : '00'}
      $
    </span>
  </Form.Item>
);

export type TextInputFieldProp = {
  name: string,
  label: string,
  required: boolean,
  message: string,
  placeholder: string,
  default? : string,
}

type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';
export const inputField = (field: TextInputFieldProp, type: InputType): JSX.Element => (
  <Form.Item
    key={field.name}
    label={field.label}
    name={field.name}
    rules={[{ required: field.required, message: field.message }]}
  >
    <Input
      prefix={IconRenderer(field.name)}
      type={type}
      placeholder={field.placeholder}
    />
  </Form.Item>
);

// eslint-disable-next-line max-len
const renderFormFields = (formData: Array<FormFields>):
any => formData.map((field: FormFields) => {
  switch (field.type) {
    case 'select':
      return renderSelect(field);

    case 'slider':
      return renderSlider(field);

    case 'text':
      return inputField(field as TextInputFieldProp, 'text');

    case 'email':
      return inputField(field as TextInputFieldProp, 'email');

    case 'password':
      return inputField(field as TextInputFieldProp, 'password');

    case 'date':
      return inputField(field as TextInputFieldProp, 'date');

    default:
      return inputField(field as TextInputFieldProp, 'text');
  }
});

export default renderFormFields;
