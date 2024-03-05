import React, { useEffect } from "react";
// import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./notfound.css";
import astronaut from "../../assets/astronaut.png";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    document.title = "404 Not Found - Alvin AI";
  }, []);

  return (
    <div className="notfound">
      {/* <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Button type="primary" onClick={handleGoBack}>
            Go back
          </Button>
        }
      /> */}
      <img src={astronaut} alt="" className="noutfound_imgs" />
      <h2 className="notfound_h2">OOPS!</h2>
      <p className="notfound_p">Page not found</p>
      <button onClick={handleGoBack} className="notfound_btn bn">
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
