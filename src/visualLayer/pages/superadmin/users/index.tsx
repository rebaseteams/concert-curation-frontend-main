/* eslint-disable max-len */
import {
  List, Avatar, Button, Skeleton, Checkbox,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';

const list : Array<{name : string, picture : string, pending : boolean}> = [];

const Users = () : JSX.Element => {
  let loadingUsers = true;
  let pendingApproval = false;
  const [listToDisplay, setListToDisplay] = useState<Array<{name : string, picture : string, pending : boolean}>>(list);

  const loadUsers = () => {
    for (let i = 0; i < 15; i += 1) {
      list.push({
        name: 'John Doe',
        picture: 'https://joeschmoe.io/api/v1/random',
        pending: Math.random() < 0.5,
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

  return (
    <>
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
            actions={[<Button>edit</Button>]}
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
