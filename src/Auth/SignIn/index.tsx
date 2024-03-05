import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import logonav from "../../assets/logo.png";
// import google from "../../assets/google.png";
import "./sign-in.css";
import { toast } from "sonner";

// interface SignInProps {
//   setToken: (token: string) => void;
// }

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      console.log("🚀 ~ onFinish ~ data:", data);

      if (error) throw error;

      const token = data?.session?.access_token; // Lấy access token từ session
      if (token) {
        console.log("🚀 ~ onFinish ~ token:", token);
        localStorage.setItem("token", token);
        navigate("/dashboard");
        toast.success("Login successful!", {
          style: {
            top: 40,
            backgroundColor: "green",
            color: "white",
            border: "none",
          },
          position: "top-right",
        });
      } else {
        toast.error("Error: Unable to get access token", {
          style: {
            backgroundColor: "red",
            color: "white",
            border: "none",
          },
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error: " + (error as Error).message, {
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
          transition: "0.5s"
        },
        position: "top-right"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await supabase.auth.getSession();
          if ("data" in response && response.data.session) {
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="sign_in">
      <Link to="/" className="sign_in_logo">
        <img src={logonav} alt="" className="navlanding_imgs" />
        <p className="navlanding_title">Alvin AI</p>
      </Link>

      <div className="sign_in_box">
        <h1 className="sign_in_box_h1">Sign in</h1>
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

          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>

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

        <div className="sign_in_ques">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="sign_in_link decoration">
            Sign Up
          </Link>
        </div>

        {/* <div className="sign_in_or">
          <p className="or">OR</p>
        </div> */}

        {/* <div className="sign_in_google" onClick={signInWithGoogle}>
          <img src={google} alt="" className="sign_in_google_imgs" />
          <p className="sign_in_google_p">Continue with Google</p>
        </div> */}

        {/* <div className="sign_in_otp">
          <p>If you want to login by OTP</p>
          <Link to="/sign-in-otp">Click Here</Link>
        </div> */}
      </div>

      {/* <div className="cube-loader">
        <div className="cube-top"></div>
        <div className="cube-wrapper">
          <span style={{ "--i": 0 }} className="cube-span"></span>
          <span style={{ "--i": 1 }} className="cube-span"></span>
          <span style={{ "--i": 2 }} className="cube-span"></span>
          <span style={{ "--i": 3 }} className="cube-span"></span>
        </div>
      </div> */}

      {/* <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div> */}
    </div>
  );
};

export default SignIn;
