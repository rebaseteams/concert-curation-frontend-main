import {
  Tabs,
} from 'antd';
import Users from '../users';

const { TabPane } = Tabs;

const SuperAdminDashboard = () : JSX.Element => (
  <>
    <Tabs defaultActiveKey="1" tabPosition="top">
      <TabPane tab="Users" key="user">
        <Users />
      </TabPane>
      <TabPane tab="Resources" key="resource">
        Resource Tab
      </TabPane>
      <TabPane tab="Roles" key="role">
        Role Tab
      </TabPane>
    </Tabs>
  </>
);

export default SuperAdminDashboard;
