import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import logonav from "../../assets/logo.png";
import { toast } from "sonner";

const ChangePass: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onFinish = async () => {
    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      toast.success("Password updated successfully!", {
        style: {
          backgroundColor: "#16a9de",
          color: "white",
          border: "none",
        },
        position: "top-right",
      });
      navigate("/sign-in");
    } catch (error) {
      // message.error("Error: " + error.message);
      toast.error("Please confirm your email and return change password!", {
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
        },
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    document.title = "Change password - Alvin AI";
  }, []);

  return (
    <div className="sign_in">
      <Link to="/" className="sign_in_logo">
        <img src={logonav} alt="" className="navlanding_imgs" />
        <p className="navlanding_title">Alvin AI</p>
      </Link>
      <div className="sign_in_box">
        <h1 className="sign_in_box_h1">Change Password</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className="sign_in_form_btn">
              <Button type="primary" htmlType="submit" className="sign_in_btn">
                Update Password
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePass;
