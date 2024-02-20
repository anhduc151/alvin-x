import React, { useEffect } from "react";
import "./home.css";
import bal from "../../../assets/BAL.png";
import cdt from "../../../assets/CDT.png";
import meetone from "../../../assets/MEETONE.png";
import rsr from "../../../assets/RSR.png";
import smart from "../../../assets/SMART.png";
import tch from "../../../assets/TCH.png";
import tnc from "../../../assets/TNC.png";
import xbc from "../../../assets/XBC.png";
import FootLanDing from "../../../components/FootLanDing";
import NavLanDing from "../../../components/NavLanding";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = " Alvin AI";
  }, []);

  return (
    <div className="home">
      <NavLanDing />
      <div className="home_circle">
        <div className="home_title">
          <h1 className="home_title_h1">
            Earn tokens by using crypto applications
          </h1>

          <p className="home_title_p">
            Alvin AI makes it easy to earn crypto by participating in the best
            cryptonetworks Get Started
          </p>
        </div>

        <div className="home_logo_icons">
          <img src={bal} alt="" className="home_logo_icons_imgs" />
          <img src={cdt} alt="" className="home_logo_icons_imgs" />
          <img src={meetone} alt="" className="home_logo_icons_imgs" />
          <img src={rsr} alt="" className="home_logo_icons_imgs" />
          <img src={smart} alt="" className="home_logo_icons_imgs" />
          <img src={tch} alt="" className="home_logo_icons_imgs" />
          <img src={tnc} alt="" className="home_logo_icons_imgs" />
          <img src={xbc} alt="" className="home_logo_icons_imgs" />
        </div>
        <div className="circle"></div>
      </div>

      <div className="home_questions">
        <div className="home_title">
          <h1 className="home_questions_h1">
            Quests give you ownership of crypto projects as you transact
          </h1>
        </div>

        <div className="bg-black py-5 d-flex justify-content-center align-items-center">
          <div className="obj">
            <div className="objchild">
              <span className="inn6">Questions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="home_devices">
        <div className="home_devices_box">
          <h1 className="home_questions_h1">Optimized size for all devices</h1>
        </div>

        <div className="home_devices_res">
          <div className="home_devices_res_container">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </div>
        </div>
      </div>
      <FootLanDing />
    </div>
  );
};

export default Home;
