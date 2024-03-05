import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import "./forgot.css";
import logonav from "../../assets/logo.png";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: { email: string }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(values.email);

      if (error) {
        throw error;
      }

      toast.success("Password reset email sent successfully!", {
        style: {
          backgroundColor: "#16a9de",
          color: "white",
          border: "none",
        },
        position: "top-right",
      });
      // Chuyển hướng đến trang đổi mật khẩu
      navigate("/changepass");
    } catch (error) {
      toast.error("Error: " + (error as Error).message, {
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
        },
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Forgot password - Alvin AI";
  }, []);

  return (
    <div className="sign_in">
      <Link to="/" className="sign_in_logo">
        <img src={logonav} alt="" className="navlanding_imgs" />
        <p className="navlanding_title">Alvin AI</p>
      </Link>
      <div className="sign_in_box">
        <h1>Forgot Password</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div className="sign_in_form_btn">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="sign_in_btn"
              >
                Reset Password
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
