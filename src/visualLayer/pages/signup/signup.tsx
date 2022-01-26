/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-template-curly-in-string */
import {
  Button, Form, Input, notification, Row, Select,
} from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './signup.scss';
import { SignUp } from '../../../model/types/signup';
import AuthInterface from '../../../model/interfaces/auth';

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
}

const Signup = ({ AuthService }: SignUpProps) : JSX.Element => {
  const {
    loginWithRedirect,
  } = useAuth0();

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
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="branduser">Brand User</Select.Option>
            <Select.Option value="artist">Artist</Select.Option>
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

export default Signup;
