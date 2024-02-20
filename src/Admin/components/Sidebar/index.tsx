import React, { useEffect, useRef, useState } from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logonav from "../../../assets/logo.png";
import { message } from "antd";

const Sidebar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const [activePage, setActivePage] = useState<string>("");
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [previousScroll, setPreviousScroll] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleScroll = () => {
    const currentScrollPos: number = window.scrollY;
    const isScrolledDown: boolean = currentScrollPos > previousScroll;

    if (isScrolledDown && currentScrollPos > 200) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    setPreviousScroll(currentScrollPos);
  };

  const handleLogout = () => {
    navigate("/admin");
    message.success("Logout Successfully!");
  };

  useEffect(() => {
    setPreviousScroll(window.scrollY);
  }, []);

  useEffect(() => {
    const pathname: string = location.pathname;
    setActivePage(pathname);
  }, [location, isNavVisible, previousScroll]);

  return (
    <div className="sidebar" ref={navRef}>
      <div className="sidebar_logo">
        <Link to="/admin/dashboard" className="sidebar_logo_links">
          <img src={logonav} alt="" className="sidebar_logo_imgs" />
          <p className="sidebar_logo_name">Alvin AI</p>
        </Link>
      </div>

      <ul className={`sidebar_ul ${isNavOpen ? "navlanding_open" : ""}`}>
        <Link to="/admin/dashboard" className="decoration">
          <li
            className={`sidebar_li ${
              activePage === "/admin/dashboard" ? "sidebaractive" : ""
            }`}
          >
            <i
              className={`bx bxs-dashboard sidebar_icons ${
                activePage === "/admin/dashboard" ? "iconActive" : ""
              }`}
            ></i>
            Dashboard
          </li>
        </Link>

        <Link to="/admin/create-blog" className="decoration">
          <li
            className={`sidebar_li ${
              activePage === "/admin/create-blog" ? "sidebaractive" : ""
            }`}
          >
            <i
              className={`bx bx-map-alt sidebar_icons ${
                activePage === "/admin/create-blog" ? "iconActive" : ""
              }`}
            ></i>
            Blogs
          </li>
        </Link>

        <Link to="/create-topics" className="decoration">
          <li
            className={`sidebar_li ${
              activePage === "/create-topics" ? "sidebaractive" : ""
            }`}
          >
            <i
              className={`bx bx-line-chart-down sidebar_icons ${
                activePage === "/create-topics" ? "iconActive" : ""
              }`}
            ></i>
            Topics
          </li>
        </Link>

        <Link to="/create-posts" className="decoration">
          <li
            className={`sidebar_li ${
              activePage === "/create-posts" ? "sidebaractive" : ""
            }`}
          >
            <i
              className={`bx bx-trending-up sidebar_icons ${
                activePage === "/create-posts" ? "iconActive" : ""
              }`}
            ></i>
            Posts
          </li>
        </Link>
      </ul>

      <div className="decoration sidebar_logout" onClick={handleLogout}>
        <i className="bx bx-log-out-circle sidebar_logout_icons"></i> Logout
      </div>
    </div>
  );
};

export default Sidebar;
