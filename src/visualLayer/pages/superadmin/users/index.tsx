/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */

// TODO : Replace hardcoded data with API data

import {
  List, Avatar, Button, Skeleton, Checkbox, Form, Input, Select,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';
import CustomModal from '../../../components/CustomModal';

const list : Array<{name : string, picture : string, pending : boolean, roles : Array<string>}> = [];
const roles : Array<string> = ['role1', 'role2', 'role3'];

const Users = () : JSX.Element => {
  let loadingUsers = true;
  let pendingApproval = false;
  const [listToDisplay, setListToDisplay] = useState<Array<{name : string, picture : string, pending : boolean, roles : Array<string>}>>(list);
  const [user, setUser] = useState<{user : {name : string, picture : string, pending : boolean, roles : Array<string>}}>({
    user: {
      name: '', picture: '', pending: true, roles: [],
    },
  });
  const validateMessages = {
    required: '${label} is required!',
  };

  const loadUsers = () => {
    for (let i = 0; i < 15; i += 1) {
      list.push({
        name: 'John Doe',
        picture: 'https://joeschmoe.io/api/v1/random',
        pending: Math.random() < 0.5,
        roles,
      });
    }
    loadingUsers = false;
  };

  loadUsers();

  const pendingApprovalChange = (e : CheckboxChangeEvent) => {
    pendingApproval = e.target.checked;
  };

  const applyChanges = () => {
    loadingUsers = true;
    if (pendingApproval) {
      const tempList = list.filter((val) => {
        if (val.pending) {
          return val;
        } return null;
      });
      setListToDisplay(tempList);
    } else setListToDisplay(list);
    loadingUsers = false;
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
      <Form initialValues={user} onValuesChange={onValuesChange} validateMessages={validateMessages}>
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
                <Select.Option key={role}>{role}</Select.Option>
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
        loading={loadingUsers}
        itemLayout="horizontal"
        dataSource={listToDisplay}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => {
                  setUser({ user: item });
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
