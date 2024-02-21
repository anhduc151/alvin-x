import React from "react";
// import bal from "../../assets/BAL.png";
import cdt from "../../assets/CDT.png";
import meetone from "../../assets/MEETONE.png";
import rsr from "../../assets/RSR.png";
import smart from "../../assets/SMART.png";
import tch from "../../assets/TCH.png";
import tnc from "../../assets/TNC.png";
import xbc from "../../assets/XBC.png";

import ncl2 from "../../assets/ncl2.png";
import neu from "../../assets/neu.png";
import nexo from "../../assets/nexo.png";
import ngc from "../../assets/ngc.png";
import nmc from "../../assets/nmc.png";
import san from "../../assets/san.png";
import ubq from "../../assets/ubq.png";
import usdc from "../../assets/usdc.png";
import usdt from "../../assets/usdt.png";
import ven from "../../assets/ven.png";
import vib from "../../assets/vib.png";
import bitcoin from "../../assets/bitcoin.png";

import "./global.css";

const Global: React.FC = () => {
  return (
    <>
      <div className="orbit">
        <ul className="orbit-wrap">
          <li className="orbit-center">
            <img src={bitcoin} alt="" className="orbit_imgs" />
          </li>
          <li>
            <ul className="ring-0">
              <li>
                <img src={cdt} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={meetone} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={rsr} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={smart} alt="" className="orbit_imgs" />
              </li>
            </ul>
          </li>
          <li>
            <ul className="ring-1">
              <li>
                <img src={tch} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={tnc} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={xbc} alt="" className="orbit_imgs" />
              </li>
            </ul>
          </li>
          <li>
            <ul className="ring-2">
              <li>
                <img src={ncl2} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={neu} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={nexo} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={ngc} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={nmc} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={san} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={ubq} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={usdc} alt="" className="orbit_imgs" />
              </li>
            </ul>
          </li>
          <li>
            <ul className="ring-3">
              <li>
                <img src={usdt} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={ven} alt="" className="orbit_imgs" />
              </li>
              <li>
                <img src={vib} alt="" className="orbit_imgs" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Global;
