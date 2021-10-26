/* eslint-disable linebreak-style */
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
// import myForm from './myForm.json';

// function renderFormFields(formData: any) {
//   return formData.map((field: any) => {
//     switch (field.type) {
//       case 'select':
//         return (
//           <Form.Item name="genre" label="Targeted genre">
//             <Select
//               showSearch
//               mode="multiple"
//             >
//               <Select.Option value="male">Hollywood</Select.Option>
//               <Select.Option value="female">POP</Select.Option>
//               <Select.Option value="both">Rock</Select.Option>
//               <Select.Option value="both">Classic</Select.Option>
//             </Select>
//           </Form.Item>
//         );

//       default:
//         return <span>None</span>;
//     }
//   });
// }

const QuestionsForm = (): JSX.Element => {
  const [budget, setBudget] = useState({ min: 20000, max: 50000 });

  const onFormSumbmit = (values: any) => {
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
        onFinish={onFormSumbmit}
      >
        {/* {myForm && renderFormFields(myForm)} */}
        <Form.Item name="event_type" label="What type of event is it">
          <Select
            showSearch
          >
            <Select.Option value="music concert">Music Concert</Select.Option>
            <Select.Option value="music festival">Music Concert</Select.Option>
            <Select.Option value="Listning parti">Listning Part</Select.Option>
            <Select.Option value="community center">Community Center</Select.Option>
            <Select.Option value="college and university">College and University</Select.Option>
            <Select.Option value="corporate events">Corporate Events</Select.Option>
            <Select.Option value="stadium">Stadium</Select.Option>
            <Select.Option value="concert hall">Concert Hall</Select.Option>

          </Select>
        </Form.Item>
        <Form.Item name="venue" label="Select Venue">
          <Select
            showSearch
            mode="multiple"
          >
            <Select.Option value="delhi">Delhi</Select.Option>
            <Select.Option value="mumbai">Mumbai</Select.Option>
            <Select.Option value="london">London</Select.Option>
            <Select.Option value="kolkata">Kolkata</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="artist_budget" label="Budget">
          <Slider
            range
            min={1000}
            max={100000}
            step={1000}
            onChange={(value) => onBudgetChange(value)}
            defaultValue={[20000, 50000]}
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

export default QuestionsForm;
