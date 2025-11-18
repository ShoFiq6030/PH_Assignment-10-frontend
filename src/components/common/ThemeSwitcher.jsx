import React, { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  // Load saved theme on mount only
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    // document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Update HTML + localStorage when theme changes
  useEffect(() => {
    if (!theme) return;
    // document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
      {theme === "light" ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg" />
      )}
    </button>
  );
}
