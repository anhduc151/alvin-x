import React from "react";
import logonav from "../../assets/logo.png";
import "./footlanding.css";

const FootLanDing: React.FC = () => {
  return (
    <div className="foot">
      <div className="foot_rule">
        <div className="foot_left">
          <div className="footlanding_logo">
            <img src={logonav} alt="" className="navlanding_imgs" />
            <p className="navlanding_title">Alvin AI</p>
          </div>
        </div>

        <div className="foot_right">
          <div className="foot_right_box1">
            <p className="foot_right_box1_p">Company</p>
            <p className="foot_right_box1_p">Careers</p>
            <p className="foot_right_box1_p">Privacy Policy</p>
            <p className="foot_right_box1_p">Terms of Service</p>
          </div>

          <div className="foot_right_box1">
            <p className="foot_right_box1_p">Support</p>
            <p className="foot_right_box1_p">Documentation</p>
            <p className="foot_right_box1_p">Report a bug</p>
            <p className="foot_right_box1_p">Add your protocol</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootLanDing;
