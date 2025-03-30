"use client";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";
export default function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex items-center justify-center">
      {currentTheme === "dark" ? (
        <MdLightMode
          onClick={() => setTheme("light")}
          className="text-xl cursor-pointer hover:text-secondary"
        />
      ) : (
        <MdDarkMode
          onClick={() => setTheme("dark")}
          className="text-xl cursor-pointer  hover:text-secondary"
        />
      )}
    </div>
  );
}
