/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-template-curly-in-string */
import {
  Button, Form, Input, notification, Row, Select,
} from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './signup.scss';
import { useEffect } from 'react';
import { SignUp } from '../../../model/types/signup';
import AuthInterface from '../../../model/interfaces/auth';
import { RolesInterface } from '../../../model/interfaces/roles';
import { useGetRoles } from '../../../hooks/useGetRoles';
import { RoleResponseData } from '../../../model/types/roles';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

type SignUpProps = {
  AuthService: AuthInterface;
  rolesService: RolesInterface;
}

const Signup = ({ AuthService, rolesService }: SignUpProps) : JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  const { roles, getRoles } = useGetRoles(rolesService);

  useEffect(() => {
    getRoles();
  }, []);

  const onFinish = async (values: {user : SignUp}) => {
    const { user } = values;
    const resp = await AuthService.signUp(user);
    if (resp.success) notification.success({ message: 'Account successfully created. Verify your email.' });
  };

  return (
    <div className="center">
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'userName']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'role']} label="Role">
          <Select
            placeholder="Select a role"
          >
            {renderRoles(roles)}
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Row>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
            <Button
              type="link"
              onClick={() => {
                loginWithRedirect();
              }}
              style={{ fontSize: 16 }}
            >
              Login?
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

function renderRoles(roles: Array<RoleResponseData>) {
  return roles.map((role) => (
    <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
  ));
}

export default Signup;
