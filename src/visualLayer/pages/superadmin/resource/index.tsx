/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */

// TODO : Replace hardcoded data with API data

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal, message,
} from 'antd';
import { useEffect, useState } from 'react';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import { CreateResourceForm, NewResourceResponseData } from '../../../../model/types/resources';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

const createResources = (resourceService: ResourcesInterface) => function Resources(): JSX.Element {
  const [loadingResources, setLoadingResource] = useState(false);
  const [newResource, setNewResource] = useState<CreateResourceForm>({ name: '', actions: [] });
  const [listToDisplay, setListToDisplay] = useState<Array<NewResourceResponseData>>();

  const getResources = async () => {
    setLoadingResource(true);
    const response = await resourceService.getResources(0, 10);
    if (response.success) {
      const resList: Array<{name : string, actions : Array<string>, id: string}> = response.data.resources.map((res) => ({ name: res.name, actions: res.actions, id: res.id }));
      setListToDisplay(resList);
    }
    setLoadingResource(false);
  };

  useEffect(() => {
    getResources();
  }, []);

  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required!',
  };

  const onValuesChange = async (changedValues: {name: string, actions: Array<string>}, values: {resource: { name: string, actions: Array<string> }}) => {
    const { name } = values.resource;
    const actions = values.resource.actions ? values.resource.actions : [];
    setNewResource({ name, actions });
  };

  const onSave = async () => {
    const message1 = newResource.name.length === 0 ? 'Resource name can not be empty' : '';
    const message2 = newResource.actions.length === 0 ? 'Resource actions can not be empty' : '';
    if (newResource.name.length === 0 || newResource.actions.length === 0) {
      message.warning(`${message1} ${message2}`);
    } else {
      const response = await resourceService.createResource(newResource);
      if (response.success) getResources();
    }
  };

  const onEdit = async (data: NewResourceResponseData) => {
    const response = await resourceService.editResource(data);
    if (response.success) {
      message.success('Resource Updated Successfully');
      getResources();
    }
  };

  const createResourceModal = CustomModal(
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
    () => form.submit(),
    <>
      <Form form={form} onFinish={onEdit} validateMessages={validateMessages}>
        <Form.Item>
          <Form.Item name="id" hidden><Input /></Form.Item>
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
      {createResourceModal.modal}
      {editResourceModal.modal}
      <div>
        <Button onClick={createResourceModal.showModal}>
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
                form.setFieldsValue({ name: item.name, actions: item.actions, id: item.id });
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
