/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
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

const QuestionsForm = (): JSX.Element => {
  const [budget, setBudget] = useState({ min: 20000, max: 50000 });

  const onFormSubmit = (values: any) => {
    const result = {
      ...values,
      artist_budget: budget,
      target_audience: {
        age_group: values.age,
        gender: values.gender,
        genre: values.gender,
      },
    };
    const deleteProp: Array<string> = ['age', 'gender', 'genre'];
    deleteProp.map((prop: string) => {
      return delete result[prop];
    });
  };

  function onBudgetChange(event: any) {
    setBudget({ min: event[0], max: event[1] });
  }
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
        <Form.Item name="sponsorship_type" label="Type of sponsorship sought">
          <Select>
            <Select.Option value="brand awareness">Brand awareness</Select.Option>
            <Select.Option value="direct sales">Direct sales</Select.Option>
            <Select.Option value="customer engagement">Customer Engagement</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="wanted_brands" label="Specific brand you want">
          <Select
            showSearch
            mode="multiple"
          >
            <Select.Option value="delhi">Coca Cola</Select.Option>
            <Select.Option value="mumbai">Moutain deo</Select.Option>
            <Select.Option value="london">Kingfisher</Select.Option>
            <Select.Option value="kolkata">Vimal</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="unwanted_brands" label="Brand you don't want">
          <Select
            showSearch
            mode="multiple"
          >
            <Select.Option value="delhi">Coca Cola</Select.Option>
            <Select.Option value="mumbai">Moutain deo</Select.Option>
            <Select.Option value="london">Kingfisher</Select.Option>
            <Select.Option value="kolkata">Vimal</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="age" label="Targeted age group">
          <Select
            showSearch
            mode="multiple"
          >
            <Select.Option value="18-25">18 - 25</Select.Option>
            <Select.Option value="26-35">26 - 35</Select.Option>
            <Select.Option value="36-60">36 - 60</Select.Option>
            <Select.Option value="60+">60 plus</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="gender" label="Targeted gender">
          <Select
            showSearch
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="both">Both</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="genre" label="Targeted genre">
          <Select
            showSearch
          >
            <Select.Option value="male">Hollywood</Select.Option>
            <Select.Option value="female">POP</Select.Option>
            <Select.Option value="both">Rock</Select.Option>
            <Select.Option value="both">Classic</Select.Option>
          </Select>
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

function renderOptions(options: any) {
  return options.map((option: string) => {
    return <Select.Option key={`option${option}`} value={option}>{option}</Select.Option>;
  });
}

function renderSelect(feild: any) {
  if (feild.multiple) {
    return (
      <Form.Item key={`feild${feild.name}`} name={feild.name} label={feild.label}>
        <Select
          showSearch
          mode="multiple"
        >
          { feild.options.length > 0 && renderOptions(feild.options) }
        </Select>
      </Form.Item>
    );
  }
  return (
    <Form.Item key={`feild${feild.name}`} name={feild.name} label={feild.label}>
      <Select
        showSearch
      >
        { feild.options.length > 0 && renderOptions(feild.options) }
      </Select>
    </Form.Item>
  );
}

function renderFormFields(formData: any, budget: any, onBudgetChange:any) {
  return formData.map((feild: any) => {
    switch (feild.type) {
      case 'select':
        return renderSelect(feild);

      case 'slider':
        return renderSlider(feild, budget, onBudgetChange);

      default:
        return <span>None</span>;
    }
  });
}

function renderSlider(feild: any, budget: any, onBudgetChange: any): any {
  return (
    <Form.Item key={`feild${feild.name}`} name={feild.name} label={feild.label}>
      <Slider
        range
        min={feild.min}
        max={feild.max}
        step={feild.step}
        onChange={(value) => onBudgetChange(value)}
        defaultValue={feild.default}
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
}

export default QuestionsForm;
