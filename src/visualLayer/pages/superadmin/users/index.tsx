import {
  List, Avatar, Button, Skeleton,
} from 'antd';

const list : Array<{name : string, picture : string}> = [];

const Users = () : JSX.Element => {
  let loadingUsers = true;

  const loadUsers = () => {
    for (let i = 0; i < 15; i += 1) {
      list.push({
        name: 'John Doe',
        picture: 'https://joeschmoe.io/api/v1/random',
      });
    }
    loadingUsers = false;
  };

  loadUsers();

  return (
    <>
      <List
        loading={loadingUsers}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<Button>view</Button>, <Button>edit</Button>]}
          >
            <Skeleton avatar title={false} loading={loadingUsers} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture} />}
                title={<a href="https://ant.design">{item.name}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Users;
