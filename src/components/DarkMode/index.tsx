import { ReactSVG } from "react-svg";
import Sun from "../../components/DarkMode/Sun.svg";
import Moon from "../../components/DarkMode/Moon.svg";
import React, { useState, useEffect } from "react";
import "./dark_mode.css";

const DarkMode: React.FC = () => {
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
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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
  );
};

export default DarkMode;
