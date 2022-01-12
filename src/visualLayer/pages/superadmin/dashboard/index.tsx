import {
  Tabs,
} from 'antd';
import Resources from '../resource';
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
        Role Tab
      </TabPane>
    </Tabs>
  </>
);

export default SuperAdminDashboard;
