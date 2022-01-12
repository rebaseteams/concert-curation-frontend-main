/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal,
} from 'antd';
import { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

const list : Array<{name : string, actions : Array<string>}> = [];

const Resources = () : JSX.Element => {
  let loadingResources = true;
  const [resource, setResource] = useState<{name : string, actions : Array<string>}>({ name: '', actions: [] });
  const [listToDisplay] = useState<Array<{name : string, actions : Array<string>}>>(list);

  const loadResources = () => {
    for (let i = 0; i < 10; i += 1) {
      list.push({
        name: 'Resource x',
        actions: ['get', 'view'],
      });
    }
    loadingResources = false;
  };

  loadResources();

  const validateMessages = {
    required: '${label} is required!',
  };

  const onValuesChange = async (changedValues: {name: string, actions: Array<string>}, values: {name: string, actions: Array<string>}) => {
    setResource(values);
  };

  const onSave = () => {
    console.log(resource);
  };

  const modal = CustomModal(
    'Create Resource',
    'Save',
    'Cancel',
    onSave,
    <>
      <Form onValuesChange={onValuesChange} validateMessages={validateMessages}>
        <Form.Item>
          <Form.Item name={['resource', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['resource', 'actions']} label="Actions" rules={[{ required: true }]}>
            <Select
              mode="tags"
              placeholder="Please select"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </>,
  );

  const editResourceModal = CustomModal(
    'Update Resource',
    'Save',
    'Cancel',
    () => { console.log('save'); },
    <>
      <Form initialValues={resource} onValuesChange={onValuesChange} validateMessages={validateMessages}>
        <Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="actions" label="Actions" rules={[{ required: true }]}>
            <Select
              mode="tags"
              placeholder="Please select"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </>,
  );

  return (
    <>
      {modal.modal}
      {editResourceModal.modal}
      <div>
        <Button onClick={modal.showModal}>
          {IconRenderer('add')}
        </Button>
      </div>
      <List
        loading={loadingResources}
        itemLayout="horizontal"
        dataSource={listToDisplay}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => {
                setResource({ name: item.name, actions: item.actions });
                editResourceModal.showModal();
              }}
              >
                edit
              </Button>,
              <Button onClick={() => Modal.confirm({
                title: `Do you want to delete resource ${item.name}`,
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
              })}
              >
                delete
              </Button>]}
          >
            <Skeleton avatar title={false} loading={loadingResources} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Resources;
