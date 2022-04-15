import "antd/dist/antd.css";
import "./style.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/Auth.Context";
import { useHttp } from "../../../../hooks/http.hooks";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [forms, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: { target: { name: any; value: any } }) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "https://rsclone-server.herokuapp.com/login",
        "POST",
        { ...forms }
      );
      auth.login(data.token, data.userId);
      document.location.reload();
    } catch (err: any) {
      console.log("crch", err.message);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your E-mail!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-mail"
          name="email"
          onChange={changeHandler}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeHandler}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={loginHandler}
          disabled={loading}
        >
          Log in
        </Button>
        Or{" "}
        <Link className="login-form-register" to="/registration">
          register now!
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
