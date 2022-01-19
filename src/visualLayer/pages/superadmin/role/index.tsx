/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
import { ExclamationCircleOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal, Space,
} from 'antd';
import { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

const list : Array<{name : string, resource : Array<string>, actions : Array<string>}> = [];
const resources = [
  {
    name: 'res1',
    actions: ['ac1', 'ac2', 'ac3'],
  },
  {
    name: 'res2',
    actions: ['ac1', 'ac2', 'ac3'],
  },
];
const Roles = () : JSX.Element => {
  let loadingRoles = true;
  const [role, setRole] = useState<{name : string, actions : Array<string>}>({ name: '', actions: [] });
  const [listToDisplay] = useState<Array<{name : string, actions : Array<string>}>>(list);

  const loadRoles = () => {
    for (let i = 0; i < 10; i += 1) {
      list.push({
        name: 'Role x',
        resource: ['resource1', 'resource2', 'resource3'],
        actions: ['get', 'view'],
      });
    }
    loadingRoles = false;
  };

  loadRoles();

  const validateMessages = {
    required: '${label} is required!',
  };

  const onValuesChange = async (changedValues: {name: string, actions: Array<string>}, values: {name: string, actions: Array<string>}) => {
    console.log(values);
  };

  const onSave = () => {
    console.log(role);
  };

  const handleResourceChange = (value : JSON) => {
    console.log(value);
  };

  const modal = CustomModal(
    'Create Role',
    'Save',
    'Cancel',
    onSave,
    <>
      <Form onValuesChange={onValuesChange} validateMessages={validateMessages}>
        <Form.Item name={['role', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.List name={['role', 'resource']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing resource name' }]}
                  >
                    <Select onChange={handleResourceChange} placeholder="Select Resource">
                      {resources.map((resource) => (
                        <Select.Option key={resource.name}>{resource.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'actions']}
                    rules={[{ required: true, message: 'Missing actions' }]}
                  >
                    <Select placeholder="Select Actions" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add(resources[0])} block icon={<PlusOutlined />}>
                  Add resource
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </>,
  );

  const editRoleModal = CustomModal(
    'Update Role',
    'Save',
    'Cancel',
    () => { console.log('save'); },
    <>
      <Form initialValues={role} onValuesChange={onValuesChange} validateMessages={validateMessages}>
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
      {editRoleModal.modal}
      <div>
        <Button onClick={modal.showModal}>
          {IconRenderer('add')}
        </Button>
      </div>
      <List
        loading={loadingRoles}
        itemLayout="horizontal"
        dataSource={listToDisplay}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => {
                setRole({ name: item.name, actions: item.actions });
                editRoleModal.showModal();
              }}
              >
                edit
              </Button>,
              <Button onClick={() => Modal.confirm({
                title: `Do you want to delete role ${item.name}`,
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
              })}
              >
                delete
              </Button>]}
          >
            <Skeleton avatar title={false} loading={loadingRoles} active>
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

export default Roles;
