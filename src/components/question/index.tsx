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
} from 'antd';
import './question.scss';
import myForm from './myForm.json';
import { QuestionsFormProp } from './util';
import submitQuestionsForm from '../../services/submitForm';

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

const renderFormFields = (formData: any, budget: any, onBudgetChange:any) => {
  return formData.map((field: any) => {
    switch (field.type) {
      case 'select':
        return renderSelect(field);

      case 'slider':
        return renderSlider(field, budget, onBudgetChange);

      default:
        return <span>None</span>;
    }
  });
};

const QuestionsForm = ({ setVisible } : QuestionsFormProp): JSX.Element => {
  const [budget, setBudget] = useState({ min: 20000, max: 50000 });

  const onFormSubmit = async (values: any) => {
    const result = {
      ...values,
      artist_budget: budget,
      target_audience: {
        age_group: values.age,
        gender: values.gender,
        genre: values.genre,
      },
    };
    const deleteProp: Array<string> = ['age', 'gender', 'genre'];
    deleteProp.map((prop: string) => {
      return delete result[prop];
    });
    const response = await submitQuestionsForm(result);
    if (!response.error) {
      const forms: Array<any> | any = localStorage.getItem('forms') || [];
      forms.push(response);
      localStorage.setItem('forms', forms);
    }
    setVisible(false);
  };

  const onBudgetChange = (event: any) => {
    setBudget({ min: event[0], max: event[1] });
  };
  return (
    <div className="questions-container">
      <Form
        id="qustionsForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: 1000 }}
        onFinish={onFormSubmit}
      >
        { myForm && renderFormFields(myForm, budget, onBudgetChange) }
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default QuestionsForm;
