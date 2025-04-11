"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectTheme, setTheme } from "@/redux/features/themeSlice";
import { useTheme } from "next-themes";

export default function NextThemeProvider({ children }) {
  const dispatch = useAppDispatch();
  const reduxTheme = useAppSelector(selectTheme);
  const { theme, setTheme: setNextTheme } = useTheme();

  // Sync Redux theme state with next-themes
  useEffect(() => {
    if (theme && theme !== reduxTheme) {
      dispatch(setTheme(theme));
    }
  }, [theme, reduxTheme, dispatch]);

  // Update next-themes when Redux theme changes
  useEffect(() => {
    if (reduxTheme && reduxTheme !== theme) {
      setNextTheme(reduxTheme);
    }
  }, [reduxTheme, theme, setNextTheme]);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <div className="transition-colors duration-300">{children}</div>
    </ThemeProvider>
  );
}
