/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import {
  Layout, Button, Modal, Row,
} from 'antd';

import ConcertForm from '../concert/index';

import { returnMockData } from '../../services/submitForm';

import SubmittedCard from '../submittedCard';

const { Content } = Layout;

const DashboardComponent = (): JSX.Element => {
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [forms, setForms] = useState([returnMockData]);

  return (
    <Content>
      <Button type="primary" onClick={() => setDisplayFormModal(true)}>
        Curate Concert
      </Button>
      <Modal
        title="Choose your prefrences"
        centered
        style={
            {
              height: 'calc(100vh - 100px)',
              overflowY: 'scroll',
              padding: '0',
            }
          }
        visible={displayFormModal}
        onOk={() => setDisplayFormModal(false)}
        onCancel={() => setDisplayFormModal(false)}
        width={800}
        className="questionsModal"
        footer={false}
      >
        <ConcertForm setVisible={setDisplayFormModal} setForms={setForms} forms={forms} />
      </Modal>
      <h4 style={{ textAlign: 'center' }}>My Forms</h4>
      {forms.length > 0 ? (
        <Row>
          { forms.map((form:any) => (
            <SubmittedCard
              key={form.id + Math.random()}
              form={form}
            />
          ))}
        </Row>
      ) : (<span>No Foms available yet</span>)}
    </Content>
  );
};

export default DashboardComponent;
