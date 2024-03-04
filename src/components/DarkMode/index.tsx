import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import Sun from "../../components/DarkMode/Sun.svg";
import Moon from "../../components/DarkMode/Moon.svg";
import "./dark_mode.css";

interface DarkModeProps {
  layout?: React.ComponentType<any> | null;
}

const DarkMode: React.FC<DarkModeProps> = ({ layout }) => {
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  const setDarkMode = (): void => {
    document.querySelector("body")!.setAttribute("data-theme", "dark");
  };

  const setLightMode = (): void => {
    document.querySelector("body")!.setAttribute("data-theme", "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [theme]);

  const toggleTheme = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!layout) {
    return null; // Return nothing if layout is null
  }

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <ReactSVG src={Sun} />
        <ReactSVG src={Moon} />
      </label>
    </div>

    // <div className="dark_mode">
    //   <label className="container">
    //     <input
    //       className="dark_mode_input"
    //       type="checkbox"
    //       id="darkmode-toggle"
    //       checked={theme === "dark"}
    //       onChange={toggleTheme}
    //     />
    //     <ReactSVG src={Moon} className="moon" />
    //     <ReactSVG src={Sun} className="sun" />
    //   </label>
    // </div>
  );
};

export default DarkMode;
