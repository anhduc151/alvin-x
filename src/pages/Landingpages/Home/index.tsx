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
import code from "../../../assets/code_home.png";
import preview1 from "../../../assets/preview_ai1.png";
import preview2 from "../../../assets/preview_ai2.png";
import Global from "../../../components/Global";
import { Link } from "react-router-dom";
// import map from "../../../assets/map.png";

const Home: React.FC = () => {
  // useEffect(() => {
  //   const script1 = document.createElement("script");
  //   script1.src = "/src/main.tsx";
  //   script1.type = "module";
  //   document.body.appendChild(script1);

  //   const script2 = document.createElement("script");
  //   script2.src = "https://crypto-beat--alvin.modal.run/copilot/index.js";
  //   document.body.appendChild(script2);

  //   const script3 = document.createElement("script");
  //   script3.innerHTML = `
  //     window.mountChainlitWidget({
  //       chainlitServer: "https:/crypto-beat--alvin.modal.run",
  //     });
  //   `;
  //   document.body.appendChild(script3);

  //   // Clean up
  //   return () => {
  //     document.body.removeChild(script1);
  //     document.body.removeChild(script2);
  //     document.body.removeChild(script3);
  //   };
  // }, []);

  useEffect(() => {
    document.title = " Alvin AI";
  }, []);

  return (
    <div className="home">
      {/* <iframe
        src="https://crypto-beat--alvin.modal.run/"
        width={300}
        height={500}
        style={{ position: "absolute", bottom: "2%", right: "2%", }}
      ></iframe> */}
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

      <main className="home_main">
        <h1 className="home_main_h1">
          <span>Train Crypto</span>
          <span>Chat AI</span>
          <span>Posts</span>
        </h1>

        <Link to="/sign-in" className="home_developer_btn">
          <button className="home_developer_btn_get">
            <i className="bx bxs-chevrons-right"></i> Get started
          </button>
        </Link>

        <p className="home_main_p">
          Vercel combines the best developer experience with an obsessive focus
          on end-user performance. Their platform enables frontend teams to do
          their best work.
        </p>
      </main>

      {/* <div className="home_questions">
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
      </div> */}

      {/* <div className="home_devices">
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
      </div> */}

      <section id="develop">
        <h6>explore the vercel way</h6>
        <span className="path-line"></span>
        <span className="circled-number">1</span>
        <span className="gradient-word">Train Crypto</span>
      </section>

      <h2 className="home_title_names">Start With The Developer</h2>

      <div className="home_develop">
        <div className="home_develop_left">
          <p className="home_develop_left_p">
            Developers love Next.js, the open source React framework Vercel
            built together with Google and Facebook. Next.js powers the biggest
            websites like Airbnb and Twilio, for use cases in e-commerce,
            travel, news, and marketing.
          </p>

          <div className="home_develop_left_image">
            <img src={code} alt="" className="home_develop_left_imgs" />
          </div>
        </div>

        <div className="home_develop_right">
          <p className="home_develop_left_p">
            Developers love Next.js, the open source React framework Vercel
            built together with Google and Facebook. Next.js powers the biggest
            websites like Airbnb and Twilio, for use cases in e-commerce,
            travel, news, and marketing.
          </p>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>
        </div>
      </div>

      <section id="preview">
        <h6>Works With 30+ Jamstack Frameworks</h6>
        <span className="path-line"></span>
        <span className="circled-number">2</span>
        <span className="gradient-word">Chat AI</span>
      </section>

      <h2 className="home_title_names">Accelerate With Your Team</h2>

      <div className="home_preview">
        <p className="home_preview_p">
          Frontend development is not meant to be a solo activity. The Vercel
          platform makes it a collaborative experience with deploy previews for
          every code change, by seamlessly integrating with GitHub, GitLab, and
          Bitbucket.
        </p>

        <div className="home_preview_box">
          <div className="home_preview_box_left">
            <img src={preview1} alt="" className="home_preview_box_left_imgs" />
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>
        </div>

        <div className="home_preview_box">
          <div className="home_preview_box_left">
            <img src={preview2} alt="" className="home_preview_box_left_imgs" />
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>
        </div>
      </div>

      <section id="ship">
        <h6>And Finally</h6>
        <span className="path-line"></span>
        <span className="circled-number">3</span>
        <span className="gradient-word">Posts</span>
      </section>

      <h2 className="home_title_names">Delight Every Visitor</h2>

      <div className="home_ship">
        <div className="home_ship_box">
          <p className="home_develop_left_p">
            Developers love Next.js, the open source React framework Vercel
            built together with Google and Facebook. Next.js powers the biggest
            websites like Airbnb and Twilio, for use cases in e-commerce,
            travel, news, and marketing.
          </p>

          <p className="home_develop_left_p">
            Vercel is the best place to deploy any frontend app. Start by
            deploying with zero configuration to our global edge network. Scale
            dynamically to millions of pages without breaking a sweat.
          </p>
        </div>

        {/* <img src={map} alt="" className="home_ship_imgs" /> */}

        <Global />
      </div>

      <FootLanDing />
    </div>
  );
};

export default Home;
