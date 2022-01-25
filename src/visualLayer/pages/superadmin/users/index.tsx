/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */

// TODO : Replace hardcoded data with API data

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  List, Avatar, Button, Skeleton, Checkbox, Form, Input, Select, Modal, message,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { RolesInterface } from '../../../../model/interfaces/roles';
import { UsersInterface } from '../../../../model/interfaces/users';
import CustomModal from '../../../components/CustomModal';

const list : Array<{id : string, name : string, picture : string, pending : boolean, roles : Array<string>}> = [];

const Users = ({ userService, roleService } : {userService : UsersInterface, roleService : RolesInterface}) : JSX.Element => {
  let pendingApproval = false;
  const [form] = Form.useForm();
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [listToDisplay, setListToDisplay] = useState<Array<{id : string, name : string, picture : string, pending : boolean, roles : Array<string>}>>(list);
  const [roles, setRoles] = useState<Array<{name : string, id : string}>>([{ name: 'role1', id: '' }, { name: 'role2', id: '' }, { name: 'role3', id: '' }]);
  const validateMessages = {
    required: '${label} is required!',
  };

  const loadRoles = async () => {
    const resp = await roleService.getRoles(0, 1);
    if (resp.success) {
      setRoles(resp.data.roles.map((element) => ({ name: element.name, id: element.id })));
      console.log(resp.data);
    }
  };

  const loadUsers = async () => {
    const resp = await userService.getUsers(0, 10);
    if (resp.success) {
      const { users } = resp.data;
      users.forEach((us) => {
        list.push({
          id: us.id,
          name: us.name,
          picture: 'https://joeschmoe.io/api/v1/random',
          pending: us.approved,
          roles: us.roles,
        });
      });
    }
    console.log(list);
    await loadRoles();
    setLoadingUsers(false);
  };

  useEffect(() => {
    loadRoles();
    loadUsers();
  }, []);

  const pendingApprovalChange = (e : CheckboxChangeEvent) => {
    pendingApproval = e.target.checked;
  };

  const applyChanges = async () => {
    setLoadingUsers(true);
    if (pendingApproval) {
      const resp = await userService.getPendingUsers(0, 10);
      setListToDisplay(resp.data.users.map((user) => ({
        id: user.id, name: user.name, picture: 'https://joeschmoe.io/api/v1/random', pending: user.approved, roles: user.roles,
      })));
    } else setListToDisplay(list);
    setLoadingUsers(false);
  };

  const onFinish = async () => {
    const { user } = form.getFieldsValue();
    const resp = await userService.updateUsersRole({ id: user.id, roles: user.roles });
    if (resp.success) {
      Modal.success({ content: 'User successfully updated' });
    }
  };
  const editRoleModal = CustomModal(
    'Update Role',
    'Save',
    'Cancel',
    onFinish,
    <>
      <Form form={form} validateMessages={validateMessages}>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'roles']} label="Roles" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="Select Roles"
          >
            {
              roles.map((role) => (
                <Select.Option value={role.name} key={role.id}>{role.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'id']} rules={[{ required: true }]} />
      </Form>
    </>,
  );

  return (
    <>
      {editRoleModal.modal}
      <div>
        <div>Search : </div>
        <Checkbox onChange={pendingApprovalChange}>Pending Approval</Checkbox>
        <div><Button onClick={applyChanges}>Apply</Button></div>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={listToDisplay}
        loading={loadingUsers}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={async () => {
                  const user = await userService.getUserById(item.id);
                  console.log(user);
                  form.setFieldsValue({ user: user.data });
                  editRoleModal.showModal();
                }}
              >
                edit
              </Button>]}
          >
            <Skeleton avatar title={false} loading={loadingUsers} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture} />}
                title={<a href="https://ant.design">{item.name}</a>}
              />
              {(item.pending === null) ? (
                <div>
                  <Button onClick={async () => {
                    Modal.confirm({
                      title: `Do you want to approve user ${item.name}?`,
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Yes',
                      okType: 'danger',
                      cancelText: 'No',
                      onOk: async () => {
                        const resp = await userService.approveUser({ id: item.id, approval: true });
                        if (resp.success) message.success('User Approved');
                      },
                    });
                  }}
                  >
                    Approve
                  </Button>
                  {' '}
                  <Button
                    onClick={async () => {
                      Modal.confirm({
                        title: `Do you want to reject user ${item.name}?`,
                        icon: <ExclamationCircleOutlined />,
                        okText: 'Yes',
                        okType: 'danger',
                        cancelText: 'No',
                        onOk: async () => {
                          const resp = await userService.approveUser({ id: item.id, approval: false });
                          if (resp.success) message.success('User Rejected');
                        },
                      });
                    }}
                  >
                    Reject
                  </Button>
                </div>
              ) : <div />}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Users;
