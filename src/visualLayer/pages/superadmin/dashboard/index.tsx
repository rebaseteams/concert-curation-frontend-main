/* eslint-disable max-len */
import {
  Tabs,
} from 'antd';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import createResources from '../resource';
import { UsersInterface } from '../../../../model/interfaces/users';
import { RolesInterface } from '../../../../model/interfaces/roles';
import Roles from '../role';
import Users from '../users';
import checkResourceAction from '../../../../utils/checkResourceAction';

const { TabPane } = Tabs;

type SuperAdminDashboardProps = {
  resourcesService: ResourcesInterface;
  usersService: UsersInterface;
  rolesService: RolesInterface;
}

const SuperAdminDashboard = ({ resourcesService, usersService, rolesService }: SuperAdminDashboardProps) : JSX.Element => {
  const Resources = createResources(resourcesService);
  return (
    <>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="user"
        tabPosition="top"
        centered
        style={{
          height: '88vh',
          overflow: 'auto',
        }}
      >
        {
          checkResourceAction(
            'users',
            'view',
            <TabPane tab="Users" key="user">
              <Users userService={usersService} roleService={rolesService} />
            </TabPane>,
          )
        }

        <TabPane tab="Resources" key="resource">
          <Resources />
        </TabPane>
        <TabPane tab="Roles" key="role">
          <Roles rolesService={rolesService} resourcesService={resourcesService} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SuperAdminDashboard;
