/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */

// TODO : Replace hardcoded data with API data

import { ExclamationCircleOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal, Space, Switch,
} from 'antd';
import { useEffect, useState } from 'react';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import { RolesInterface } from '../../../../model/interfaces/roles';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

const list : Array<{id: string, name : string, resource : Array<{id: string, permission : boolean, name : string, actions : string}>, actions : Array<string>}> = [];

type RolesProps = {
  rolesService: RolesInterface;
  resourcesService: ResourcesInterface;
}
const Roles = ({ rolesService, resourcesService }: RolesProps) : JSX.Element => {
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [role, setRole] = useState<{name : string, resource : Array<{permission : boolean, name : string, actions : string}>, actions : Array<string>}>({ name: '', resource: [], actions: [] });
  const [listToDisplay, setListToDisplay] = useState<Array<{id: string, name : string, resource : Array<{permission : boolean, name : string, actions : string}>, actions : Array<string>}>>(list);
  const [actions, setActions] = useState<Array<Array<string>>>([]);
  const [resources, setResources] = useState<Array<{id: string, name: string, actions: Array<string>}>>([]);

  const [createForm] = Form.useForm();

  const loadRoles = async () => {
    const roles = await rolesService.getRoles(0, 10);
    console.log(roles);
    if (roles.success) {
      roles.data.roles.forEach((item) => {
        list.push({
          id: item.id,
          name: item.name,
          resource: [{
            id: 'dd',
            permission: true,
            name: 'dd',
            actions: 'dd',
          }],
          // resource: item.resource_actions.actions.map((i) => ({
          //   id: item.resource_actions.resourceId,
          //   permission: i.permission,
          //   name: item.name,
          //   actions: i.name,
          // })),
          actions: ['ss'],
        });
      });
      setListToDisplay(list);
    }
    setLoadingRoles(false);
  };

  console.log(actions);
  // console.log(listToDisplay);

  const loadResources = async () => {
    const fetchedresources = await resourcesService.getResources(0, 10);
    console.log(fetchedresources);
    setResources(fetchedresources.data.resources);
  };

  useEffect(() => {
    loadRoles();
    loadResources();
  }, []);

  const validateMessages = {
    required: '${label} is required!',
  };

  const onValuesChange = async (
    changedValues: {name: string, actions: Array<string>},
    values: {name: string, resource : Array<{permission : boolean, name : string, actions : string}>, actions: Array<string>},
  ) => {
    console.log(values);
    setRole(values);
  };

  type formType = {name : string, resource : Array<{permission : boolean, name : string, actions : string}>}

  const onSave = async (value: formType) => {
    console.log(value);
    const array = resources.slice().filter((i) => value.resource.some(({ name }) => i.name === name));
    const newArr = array.map((res) => {
      const resArray = value.resource.filter((i) => i.name === res.name);
      return {
        resourceId: res.id,
        actions: resArray.map((i) => ({
          name: i.name,
          permission: i.permission,
        })),
      };
    });
    rolesService.createRole({
      name: value.name,
      resourceActions: newArr,
    });
    modal.hideModal();
  };

  const modal = CustomModal(
    'Create Role',
    'Save',
    'Cancel',
    createForm.submit,
    <>
      <Form form={createForm} onFinish={onSave} onValuesChange={onValuesChange} validateMessages={validateMessages}>
        <Form.Item name={['name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.List name={['resource']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing resource name' }]}
                  >
                    <Select
                      onChange={(value) => {
                        resources.forEach((element) => {
                          if (element.name === value) {
                            const ac = [...actions];
                            ac[key] = element.actions;
                            setActions(ac);
                          }
                          console.log('element=', element);
                        });
                      }}
                      placeholder="Select Resource"
                    >
                      {resources.map((resource) => (
                        <Select.Option value={resource.name} key={resource.name}>{resource.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name={[name, 'id']} required />
                  <Form.Item
                    {...restField}
                    name={[name, 'actions']}
                    rules={[{ required: true, message: 'Missing actions' }]}
                  >
                    <Select placeholder="Select Actions">
                      {
                          actions[key].map((action, index) => (<Select.Option value={actions[key][index]} key={actions[key][index]}>{actions[key][index]}</Select.Option>))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[name, 'permission']}
                    rules={[{ required: true, message: 'Missing resource name' }]}
                  >
                    <Switch checkedChildren="allow" unCheckedChildren="deny" defaultChecked />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    const ac = [...actions];
                    ac.push([]);
                    setActions(ac);
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
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
      <Form initialValues={{ role }} onValuesChange={onValuesChange} validateMessages={validateMessages}>
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
                    <Select
                      onChange={(value) => {
                        resources.forEach((element) => {
                          if (element.name === value) {
                            const ac = [...actions];
                            ac[key] = element.actions;
                            setActions(ac);
                          }
                        });
                      }}
                      placeholder="Select Resource"
                    >
                      {resources.map((resource) => (
                        <Select.Option value={resource.name} key={resource.name}>{resource.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'actions']}
                    rules={[{ required: true, message: 'Missing actions' }]}
                  >
                    <Select placeholder="Select Actions">
                      {
                          // actions[key].map((action, index) => (<Select.Option key={actions[key][index]}>{actions[key][index]}</Select.Option>))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[name, 'permission']}
                    rules={[{ required: true, message: 'Missing resource name' }]}
                  >
                    <Switch checkedChildren="allow" unCheckedChildren="deny" defaultChecked />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    const ac = [...actions];
                    ac.push([]);
                    setActions(ac);
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add resource
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
                setRole({ name: item.name, resource: item.resource, actions: item.actions });
                const ac: string[][] = [];
                role.resource.forEach((value) => {
                  resources.forEach((element) => {
                    if (element.name === value.name) {
                      ac.push(element.actions);
                    }
                  });
                });
                setActions(ac);
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
