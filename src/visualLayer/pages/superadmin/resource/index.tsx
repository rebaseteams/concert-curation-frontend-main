/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */

// TODO : Replace hardcoded data with API data

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal,
} from 'antd';
import { useEffect, useState } from 'react';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

const createResources = (resourceService: ResourcesInterface) => function Resources(): JSX.Element {
  const [loadingResources, setLoadingRes] = useState(false);
  const [resource, setResource] = useState<{name : string, actions : Array<string>}>({ name: '', actions: [] });
  const [listToDisplay, setListToDisplay] = useState<Array<{name : string, actions : Array<string>}>>();

  useEffect(() => {
    const getResources = async () => {
      setLoadingRes(true);
      const response = await resourceService.getResources(0, 4);
      if (response.success) {
        const resList: Array<{name : string, actions : Array<string>}> = response.data.resources.map((res) => ({ name: res.name, actions: res.actions }));
        setListToDisplay(resList);
      }
      setLoadingRes(false);
    };
    getResources();
  }, []);

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

export default createResources;
