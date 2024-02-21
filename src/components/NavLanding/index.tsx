import React, { useEffect, useState } from "react";
import "./navlanding.css";
import logonav from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const NavLanDing: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [previousScroll, setPreviousScroll] = useState(0);
  // const navRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isScrolledDown = currentScrollPos > previousScroll;

    if (isScrolledDown && currentScrollPos > 200) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    setPreviousScroll(currentScrollPos);
  };

  useEffect(() => {
    setPreviousScroll(window.scrollY);
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    setActivePage(pathname);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, isNavVisible, previousScroll]);

  return (
    <div
      className={`navlanding ${isNavVisible ? "nav_visible" : "nav_hidden"}`}
    >
      <div className="navlanding_icons">
        <Link to="/" className="navlanding_logo decoration">
          <img src={logonav} alt="" className="navlanding_imgs" />
          <p className="navlanding_title">Alvin AI</p>
        </Link>

        <div className="navlanding_icon">
          <input
            type="checkbox"
            id="checkbox"
            checked={isNavOpen}
            onChange={toggleNav}
          />
          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </div>
      </div>

      <ul className={`navlanding_ul ${isNavOpen ? "navlanding_open" : ""}`}>
        <Link to="/" className="decoration">
          <li
            className={`navlanding_li ${
              activePage === "/" ? "landingactive" : ""
            }`}
          >
            Home
          </li>
        </Link>

        <Link to="/post-crypto" className="decoration">
          <li
            className={`navlanding_li ${
              activePage === "/post-crypto" ? "landingactive" : ""
            }`}
          >
            Hot Posts Crypto
          </li>
        </Link>

        <Link to="/blogs" className="decoration">
          <li
            className={`navlanding_li ${
              activePage === "/blogs" ? "landingactive" : ""
            }`}
          >
            Blogs
          </li>
        </Link>
      </ul>

      <div className="navlanding_apps">
        <Link to="/sign-in" className="decoration">
          <button className="navlanding_apps_btn">
            Login <i className="bx bx-chevron-right arr_icons"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavLanDing;
