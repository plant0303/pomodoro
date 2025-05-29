import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme === "light" ? "🌞 라이트" : "🌙 다크"}
    </button>
  );
};

export default ThemeToggleButton;
