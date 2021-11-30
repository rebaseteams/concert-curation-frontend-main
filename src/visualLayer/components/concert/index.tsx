/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  Form,
  Button,
  notification,
} from 'antd';
import './concert.scss';
import myForm from './utils/myForm.json';
import { ConcertFormProp } from './util';
import createConcertFormData from './utils/createConcertFormData';
import { onSubmitFormDataType } from '../../../model/types/concertForm';
import { QuestionsUI } from '../../../model/types/questions';
import services from '../../services';
import renderFormFields from '../FormRenderer';
import { ArtistBudget } from '../../../model/types/concertDataResponse';

const ConcertForm = ({
  setVisible, forms,
} : ConcertFormProp): JSX.Element => {
  const [budget, setBudget] = useState<ArtistBudget>({ min: 20000, max: 50000 });
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (values: onSubmitFormDataType) => {
    setLoading(true);
    const result: QuestionsUI = createConcertFormData(values, budget);
    const response = await services.ArtistRecommendation.addNewRecommendation(result);
    if (response.error) {
      setLoading(false);
      setVisible(false);
      notification.error({
        message: 'Error',
        description: 'Could not create concert',
      });
      return;
    }
    if (response.data && !('id' in response.data)) {
      setLoading(false);
      setVisible(false);
      notification.error({
        message: 'Error',
        description: 'Could not create concert',
      });
      return;
    }
    if (response.data && ('id' in response.data)) {
      forms.unshift(response.data);
      setLoading(false);
      setVisible(false);
      notification.success({
        message: 'Success',
        description: 'Concert Successfully created',
      });
      return;
    }
    setVisible(false);
    setLoading(false);
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
