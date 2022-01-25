import {
  Tabs,
} from 'antd';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import createResources from '../resource';
import Roles from '../role';
import Users from '../users';

const { TabPane } = Tabs;

type SuperAdminDashboardProps = {
  resourcesService: ResourcesInterface;
}

const SuperAdminDashboard = ({ resourcesService }: SuperAdminDashboardProps) : JSX.Element => {
  const Resources = createResources(resourcesService);
  return (
    <>
      <Tabs
        defaultActiveKey="user"
        tabPosition="top"
        centered
        style={{
          height: '88vh',
          overflow: 'auto',
        }}
      >
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
};

export default SuperAdminDashboard;
