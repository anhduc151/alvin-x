import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../client";
import { message } from "antd";

const VerifyEmail: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      verifyOTP(token);
    }
  }, [location.search]);

  const verifyOTP = async (token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "email",
      });

      console.log("Verify OTP Data:", data);
      console.log("Verify OTP Error:", error);

      if (error) {
        throw error;
      }

      navigate("/dashboard");
      console.log("OTP verified successfully");
    } catch (error) {
      console.error("Error verifying OTP:", (error as Error).message);
    }
  };

  useEffect(() => {
    document.title = "Verify - Alvin AI";
  }, []);

  return (
    <div>
      <p>Verifying email...</p>
    </div>
  );
};

export default VerifyEmail;
