/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */

// TODO : Replace hardcoded data with API data

import { ExclamationCircleOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal, Space, Switch, notification,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import { RolesInterface } from '../../../../model/interfaces/roles';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

type roleList = Array<{id: string, name : string, resource : Array<{id: string, permission : boolean, name : string, actions : string}>}>;

type RolesProps = {
  rolesService: RolesInterface;
  resourcesService: ResourcesInterface;
}
const Roles = ({ rolesService, resourcesService }: RolesProps) : JSX.Element => {
  // #region constants

  const [loadingRoles, setLoadingRoles] = useState(true);
  const [listToDisplay, setListToDisplay] = useState<roleList>([]);
  const [actions, setActions] = useState<Array<Array<string>>>([]);
  const [resources, setResources] = useState<Array<{id: string, name: string, actions: Array<string>}>>([]);
  const [roleId, setRoleId] = useState<string>('');
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const pageSize = 8;
  const [totalSize, setTotalSize] = useState<number>(8);
  const [pageNo, setPageNo] = useState<number>(1);

  // #endregion constants

  // #region funcitions

  const loadRoles = async (_pageNo : number, _pageSize : number) => {
    setLoadingRoles(true);
    const rdata = await loadResources();
    await getRolesCount();
    const roles = await rolesService.getRoles((_pageNo - 1) * _pageSize, _pageSize);
    if (roles.success) {
      const list = roles.data.roles.map((item) => {
        const resArr = item.resource_actions.map((o) => o.actions.map((a) => ({
          id: o.resourceId,
          name: rdata?.find((r) => r.id === o.resourceId)?.name || 'res-name',
          permission: a.permission,
          actions: a.name,
        })));
        const oneD = _.flatten(resArr);
        return {
          id: item.id,
          name: item.name,
          resource: oneD,
        };
      });
      setListToDisplay(list);
    }
    setLoadingRoles(false);
  };

  // eslint-disable-next-line consistent-return
  const loadResources = async () => {
    const resp = await resourcesService.getResources(0, 10);
    if (resp.success) {
      setResources(resp.data.resources);
      return resp.data.resources;
    }
    // loadRoles(fetchedresources.data.resources);
  };

  const getRolesCount = async () => {
    const resp = await rolesService.getRolesCount();
    if (resp.success) {
      setTotalSize(resp.data.count);
    }
  };

  useEffect(() => {
    loadRoles(pageNo, pageSize);
  }, []);

  const validateMessages = {
    required: '${label} is required!',
  };

  type formType = {name : string, resource : Array<{permission : boolean, name : string, actions : string}>}

  const parseData = (value: formType) => {
    const array = resources.slice().filter((i) => value.resource.some(({ name }) => i.name === name));
    return array.map((res) => {
      const resArray = value.resource.filter((i) => i.name === res.name);
      return {
        resourceId: res.id,
        actions: resArray.map((i) => ({
          name: i.actions,
          permission: i.permission,
        })),
      };
    });
  };

  const onSave = async (value: formType) => {
    const parsedData = parseData(value);
    const resp = await rolesService.createRole({
      name: value.name,
      resourceActions: parsedData,
    });
    if (resp.success) {
      notification.success({ message: 'Role successfully created' });
    }
    modal.hideModal();
  };

  const onEdit = async (value: formType) => {
    const parsedData = parseData(value);
    const resp = await rolesService.editRole({
      id: roleId,
      name: value.name,
      resourceActions: parsedData,
    });
    if (resp.success) {
      notification.success({ message: 'Role successfully updated' });
    }
    editRoleModal.hideModal();
  };

  const deleteRole = async (id: string) => {
    const resp = await rolesService.deleteRole(id);
    if (resp.success) {
      notification.success({ message: 'Role deleted successfully' });
    }
  };

  // #endregion funcitions

  // #region modals
  const modal = CustomModal(
    'Create Role',
    'Save',
    'Cancel',
    createForm.submit,
    <>
      <Form form={createForm} onFinish={onSave} validateMessages={validateMessages}>
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
                    rules={[{ required: true, message: 'Missing permission' }]}
                    initialValue
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
    editForm.submit,
    <>
      <Form form={editForm} onFinish={onEdit} validateMessages={validateMessages}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.List name="resource">
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
                          actions[key].map((action, index) => (<Select.Option key={actions[key][index]}>{actions[key][index]}</Select.Option>))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[name, 'permission']}
                    rules={[{ required: true, message: 'Missing permission' }]}
                    initialValue
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

  // #endregion modals

  return (
    <>
      {modal.modal}
      {editRoleModal.modal}
      <div>
        <Button onClick={modal.showModal}>
          {IconRenderer('add')}
        </Button>
        {' '}
        <Button onClick={() => loadRoles(pageNo, pageSize)}>
          {IconRenderer('refresh')}
        </Button>
      </div>
      <List
        loading={loadingRoles}
        itemLayout="horizontal"
        dataSource={listToDisplay}
        pagination={{
          current: pageNo,
          pageSize,
          total: totalSize,
          showSizeChanger: false,
          onChange: (page, pageS) => {
            setPageNo(page);
            loadRoles(page, pageS);
          },
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => {
                editForm.setFieldsValue({ name: item.name, resource: item.resource });
                // setRole({ name: item.name, resource: item.resource, actions: item.actions });
                setRoleId(item.id);
                const ac: Array<Array<string>> = [];
                item.resource.forEach((value) => {
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
                onOk: () => deleteRole(item.id),
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
