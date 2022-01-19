import {
  Tabs,
} from 'antd';
import Resources from '../resource';
import Roles from '../role';
import Users from '../users';

const { TabPane } = Tabs;

const SuperAdminDashboard = () : JSX.Element => (
  <>
    <Tabs defaultActiveKey="user" tabPosition="top">
      <TabPane tab="Users" key="user">
        <Users />
      </TabPane>
      <TabPane tab="Resources" key="resource">
        <Resources />
      </TabPane>
      <TabPane tab="Roles" key="role">
        <Roles />
      </TabPane>
    </Tabs>
  </>
);

export default SuperAdminDashboard;
