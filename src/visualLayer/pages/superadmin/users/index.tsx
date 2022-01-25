/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */

// TODO : Replace hardcoded data with API data

import {
  List, Avatar, Button, Skeleton, Checkbox, Form, Input, Select,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { UsersInterface } from '../../../../model/interfaces/users';
import CustomModal from '../../../components/CustomModal';

const list : Array<{id : string, name : string, picture : string, pending : boolean, roles : Array<string>}> = [];
const roles : Array<string> = ['role1', 'role2', 'role3'];

const Users = ({ userService } : {userService : UsersInterface}) : JSX.Element => {
  let pendingApproval = false;
  const [form] = Form.useForm();
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [listToDisplay, setListToDisplay] = useState<Array<{id : string, name : string, picture : string, pending : boolean, roles : Array<string>}>>(list);

  const validateMessages = {
    required: '${label} is required!',
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
    setLoadingUsers(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const pendingApprovalChange = (e : CheckboxChangeEvent) => {
    pendingApproval = e.target.checked;
  };

  const applyChanges = () => {
    setLoadingUsers(true);
    if (pendingApproval) {
      const tempList = list.filter((val) => {
        if (val.pending) {
          return val;
        } return null;
      });
      setListToDisplay(tempList);
    } else setListToDisplay(list);
    setLoadingUsers(false);
  };

  const onValuesChange = async (changedValues: {name: string, roles: Array<string>}, values: {name: string, actions: Array<string>}) => {
    console.log(values);
  };

  const editRoleModal = CustomModal(
    'Update Role',
    'Save',
    'Cancel',
    () => { console.log('save'); },
    <>
      <Form form={form} onValuesChange={onValuesChange} validateMessages={validateMessages}>
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
                <Select.Option value={role} key={role}>{role}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
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
              {item.pending ? (
                <div>
                  <Button>Approve</Button>
                  <Button>Reject</Button>
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
