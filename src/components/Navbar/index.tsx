import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import logo1 from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import { message } from "antd";
import navdropdown from "../../assets/dropdown.png";

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const [activePage, setActivePage] = useState<string>("");
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [previousScroll, setPreviousScroll] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  // handle logout
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        // sessionStorage.removeItem("token");
        message.success("Logout successfully");
        navigate("/");
      } else {
        console.error("Error when logging out:", error.message);
      }
    } catch (error: any) {
      message.error("");
      console.error("Error when logging out:", error.message);
    }
  };

  useEffect(() => {
    const handleBodyClick = (event: MouseEvent) => {
      // Kiểm tra xem click không phải là trong dropdown và không phải là nút mở dropdown
      if (event.target && event.target instanceof HTMLElement) {
        if (
          !event.target.closest(".nav_dropdown") &&
          !event.target.closest(".dropdown_list")
        ) {
          setIsDropdownOpen(false);
        }
      }
    };

    // Thêm lắng nghe sự kiện click cho body
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      // Loại bỏ lắng nghe sự kiện khi component unmount
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <nav className={`nav ${isNavVisible ? "nav_visible" : "nav_hidden"}`}>
      <div className="nav_icons">
        <Link to="/dashboard" className="nav_logo">
          <img src={logo1} alt="" className="nav_logo_imgs" />
          <p className="nav_logo_p">Alvin AI</p>
        </Link>

        <div className="nav_icon">
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

      <ul className={`nav_links ${isNavOpen ? "nav_links_open" : ""}`}>
        <Link to="/dashboard" className="decoration">
          <li
            className={`nav_links_li ${
              activePage === "/dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </li>
        </Link>

        <Link to="/topics" className="decoration">
          <li
            className={`nav_links_li ${
              activePage === "/topics" ? "active" : ""
            }`}
          >
            Discover
          </li>
        </Link>

        <Link to="/blog" className="decoration">
          <li
            className={`nav_links_li ${activePage === "/blog" ? "active" : ""}`}
          >
            Blog
          </li>
        </Link>

        <div className="nav_dropdown" onClick={toggleDropdown}>
          {/* <i className="bx bx-user-circle icons_user"></i> */}
          <div className="nav_dropdown_clicks">
            <img src={navdropdown} alt="" className="icons_user" />
            <i
              className={`bx bx-chevron-up icon_arr ${
                !isDropdownOpen ? "openarr" : "closearr"
              }`}
            ></i>
          </div>
          {isDropdownOpen && (
            <div className="dropdown_list">
              <p className="dropdown_list_p">
                <i className="bx bxs-user icons_dropdown"></i> Profile
              </p>
              <p className="dropdown_list_p">
                <i className="bx bx-cog icons_dropdown"></i> Settings
              </p>
              <p className="dropdown_list_p" onClick={handleLogout}>
                <i className="bx bx-log-out icons_dropdown"></i> Logout
              </p>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
