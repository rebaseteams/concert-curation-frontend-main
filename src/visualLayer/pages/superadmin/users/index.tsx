/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-template-curly-in-string */

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  List, Avatar, Button, Skeleton, Checkbox, Form, Input, Select, Modal, notification, Tag,
} from 'antd';
import { useEffect, useState } from 'react';
import { RolesInterface } from '../../../../model/interfaces/roles';
import { UsersInterface } from '../../../../model/interfaces/users';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

type UserType = {
  id : string,
  name : string,
  picture : string,
  pending : boolean,
  roles : Array<{ id: string, name: string }>};

const Users = ({ userService, roleService } : {
  userService : UsersInterface,
  roleService : RolesInterface}) : JSX.Element => {
  // #region constants

  const [pendingApproval, setPendingApproval] = useState<boolean>(false);
  const [form] = Form.useForm();
  const pageSize = 8;
  const [totalSize, setTotalSize] = useState<number>(8);
  const [pageNo, setPageNo] = useState<number>(1);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [listToDisplay, setListToDisplay] = useState<Array<UserType>>([]);
  const [roles, setRoles] = useState<Array<{name : string, id : string}>>([]);
  const validateMessages = {
    required: '${label} is required!',
  };

  // #endregion constants

  // #region functions

  const loadRoles = async () => {
    const resp = await roleService.getRoles(0, 10);
    if (resp.success) {
      setRoles(resp.data.roles.map((element) => ({ name: element.name, id: element.id })));
    }
  };

  const loadUsers = async (_pageNo : number, _pageSize : number) => {
    const resp = await userService.getUsers((_pageNo - 1) * _pageSize, _pageSize);
    if (resp.success) {
      const { users } = resp.data;
      setListToDisplay(users.map((us) => ({
        id: us.id,
        name: us.name,
        picture: 'https://joeschmoe.io/api/v1/random',
        pending: us.approved,
        roles: us.roles,
      })));
    }
    await loadRoles();
    await getUsersCount();
    setLoadingUsers(false);
  };

  const getUsersCount = async () => {
    const resp = await userService.getUsersCount({
      getPending: pendingApproval === true ? true : undefined,
    });
    if (resp.success) {
      setTotalSize(resp.data.count);
    }
  };

  const applyChanges = async () => {
    setLoadingUsers(true);
    if (pendingApproval) {
      const resp = await userService.getPendingUsers((pageNo - 1) * pageSize, pageSize);
      setListToDisplay(resp.data.users.map((user) => ({
        id: user.id, name: user.name, picture: 'https://joeschmoe.io/api/v1/random', pending: user.approved, roles: user.roles,
      })));
      getUsersCount();
    } else loadUsers(pageNo, pageSize);
    setLoadingUsers(false);
  };

  const onEdit = async () => {
    const { user } = form.getFieldsValue();
    const resp = await userService.updateUsersRole({
      id: user.id,
      roles: user.roles,
    });
    if (resp.success) {
      notification.success({ message: 'User successfully updated' });
    }
    editRoleModal.hideModal();
  };

  // #endregion functions

  // #region modals

  const editRoleModal = CustomModal(
    'Update Role',
    'Save',
    'Cancel',
    () => form.submit(),
    <>
      <Form form={form} onFinish={onEdit} validateMessages={validateMessages}>
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
                <Select.Option name={role.id} value={role.id} key={role.id}>
                  {role.name}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'id']} rules={[{ required: true }]} />
      </Form>
    </>,
  );

  // #endregion modals

  useEffect(() => {
    loadRoles();
    loadUsers(pageNo, pageSize);
  }, []);

  return (
    <>
      {editRoleModal.modal}
      <div>
        <div>Search Criteria : </div>
        <Checkbox
          checked={pendingApproval}
          onChange={() => setPendingApproval(!pendingApproval)}
        >
          Pending Approval
        </Checkbox>
        <div>
          <Button onClick={applyChanges}>
            {IconRenderer('refresh')}
          </Button>
        </div>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={listToDisplay}
        loading={loadingUsers}
        bordered
        pagination={{
          current: pageNo,
          pageSize,
          total: totalSize,
          showSizeChanger: false,
          onChange: (page, pageS) => {
            setPageNo(page);
            loadUsers(page, pageS);
          },
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={async () => {
                  const user = await userService.getUserById(item.id);
                  const formData = {
                    ...user.data,
                    roles: user.data.roles.map((r) => (r.id)),
                  };
                  form.setFieldsValue({ user: formData });
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
                        if (resp.success) {
                          const list = listToDisplay.map((val) => {
                            if (val.id === item.id) return { ...item, pending: true };
                            return val;
                          });
                          setListToDisplay(list);
                          notification.success({ message: 'User Approved' });
                        }
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
                          const resp = await userService.approveUser({
                            id: item.id,
                            approval: false,
                          });
                          if (resp.success) {
                            const list = listToDisplay.map((val) => {
                              if (val.id === item.id) return { ...item, pending: false };
                              return val;
                            });
                            setListToDisplay(list);
                            notification.success({ message: 'User Rejected' });
                          }
                        },
                      });
                    }}
                  >
                    Reject
                  </Button>
                </div>
              ) : ((item.pending === false) ? (
                <Tag color="red" key="rejected">
                  Rejected
                </Tag>
              ) : (
                <Tag color="green" key="approved">
                  Approved
                </Tag>
              ))}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Users;
