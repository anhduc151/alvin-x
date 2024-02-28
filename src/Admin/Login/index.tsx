import React, { useEffect, useState } from "react";
import "../../Auth/SignIn/sign-in.css";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import { supabase } from "../../client";
import logonav from "../../assets/logo.png";

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // login có session token
  // const onFinish = async (values) => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: values.email,
  //       password: values.password,
  //     });

  //     if (error) throw error;
  //     console.log(data);
  //     navigate("/admin/dashboard");
  //     message.success("Login successful!");
  //   } catch (error) {
  //     message.error("Error: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);

      // Check if email and password match the admin credentials
      if (values.email === "admin@gmail.com" && values.password === "111111") {
        // If match, sign in
        navigate("/admin/dashboard");
        message.success("Login successful!");
      } else {
        // If not match, show error message
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      message.error("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login Admin  - Alvin AI";
  }, []);

  return (
    <div className="sign_in">
      <Link to="/" className="sign_in_logo">
        <img src={logonav} alt="" className="navlanding_imgs" />
        <p className="navlanding_title">Alvin AI</p>
      </Link>

      <div className="sign_in_box">
        <h1 className="sign_in_box_h1">Admin</h1>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          className="sign_in_form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" className="sign_in_box_input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="sign_in_box_input"
            />
          </Form.Item>

          <div className="sign_in_form_btn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="sign_in_btn"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginAdmin;
