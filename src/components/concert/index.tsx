/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  Form,
  Button,
  Select,
  Slider,
  Input,
  notification,
} from 'antd';
import './concert.scss';
import myForm from './myForm.json';
import { ConcertFormProp } from './util';
import submitConcertForm, { QuestionsFormDataInterface } from '../../services/submitForm';
import createConcertFormData from '../../services/createConcertFormData';
import { onSubmitFormDataType } from '../../interfaces/concertForm';

const renderOptions = (options: any) => {
  return options.map((option: string) => {
    return <Select.Option key={`option${option}`} value={option}>{option}</Select.Option>;
  });
};

const renderSelect = (field: any) => {
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
          { field.options.length > 0 && renderOptions(field.options) }
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
        { field.options.length > 0 && renderOptions(field.options) }
      </Select>
    </Form.Item>
  );
};

const renderSlider = (field: any, budget: any, onBudgetChange: any): any => {
  return (
    <Form.Item
      key={`field${field.name}`}
      name={field.name}
      label={field.label}
    >
      <Slider
        range
        min={field.min}
        max={field.max}
        step={field.step}
        onChange={(value) => onBudgetChange(value)}
        defaultValue={field.default}
      />
      <span>
        From
        {' '}
        {budget.min}
        $
      </span>
      {'     '}
      <span>
        To
        {' '}
        {budget.max}
        $
      </span>
    </Form.Item>
  );
};

const renderInput = (field: any) => {
  return (
    <Form.Item
      key={field.name}
      label={field.label}
      name={field.name}
      rules={[{ required: field.required, message: field.message }]}
    >
      <Input placeholder={field.placeholder} />
    </Form.Item>
  );
};

const renderFormFields = (formData: any, budget: any, onBudgetChange:any) => {
  return formData.map((field: any) => {
    switch (field.type) {
      case 'select':
        return renderSelect(field);

      case 'slider':
        return renderSlider(field, budget, onBudgetChange);

      case 'input':
        return renderInput(field);

      default:
        return <span>None</span>;
    }
  });
};

const ConcertForm = ({ setVisible, setForms, forms } : ConcertFormProp): JSX.Element => {
  const [budget, setBudget] = useState({ min: 20000, max: 50000 });
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (values: onSubmitFormDataType) => {
    setLoading(true);
    const result: QuestionsFormDataInterface = createConcertFormData(values, budget);
    const response = await submitConcertForm(result);
    if (response && !('id' in response)) {
      setLoading(false);
      setVisible(false);
      notification.error({
        message: 'Error',
        description: 'Could not create concert',
      });
    }
    if (response && ('id' in response)) {
      forms?.push(response);
      setForms(forms);
      setVisible(false);
      notification.success({
        message: 'Success',
        description: 'Concert Successfully created',
      });
    }
  };

  const onBudgetChange = (event: any) => {
    setBudget({ min: event[0], max: event[1] });
  };
  return (
    <div className="concert-container">
      <Form
        id="qustionsForm"
        layout="vertical"
        initialValues={{ size: 1000 }}
        onFinish={onFormSubmit}
      >
        { myForm && renderFormFields(myForm, budget, onBudgetChange) }
        { loading && <Button disabled className="submit" htmlType="submit" type="primary">Submiting</Button> }
        { !loading && <Button className="submit" htmlType="submit" type="primary">Submit</Button> }
      </Form>
    </div>
  );
};

export default ConcertForm;
