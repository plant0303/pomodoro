import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  const style = {
    width: "100%"
  }

  return (
    <div onClick={toggleTheme} style={style}>
      현재 테마: {theme === "light" ? "🌞 라이트" : "🌙 다크"}
    </div>
  );
};

export default ThemeToggleButton;
