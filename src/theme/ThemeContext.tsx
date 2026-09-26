import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors, ColorPalette } from "./palettes";

// أضفنا "system" ليدعم ثيم الجهاز
type ThemePreference = "system" | "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference; // الوضع المختار (نظام / فاتح / داكن)
  setPreference: (pref: ThemePreference) => void;
  colors: ColorPalette;
  isDark: boolean;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme(); // يستمع لثيم الجهاز لحظياً
  const [preference, setPreference] = useState<ThemePreference>("system");

  // تحديد هل الوضع داكن بناءً على النظام أو الاختيار اليدوي
  const isDark = useMemo(() => {
    if (preference === "system") {
      return systemScheme === "dark";
    }
    return preference === "dark";
  }, [preference, systemScheme]);

  const value = useMemo<ThemeContextValue>(() => {
    const colors = isDark ? darkColors : lightColors;

    return {
      preference,
      setPreference,
      colors,
      isDark,
      // عند التبديل بالزر: ينتقل بين الفاتح والداكن يدوياً
      toggleMode: () => {
        setPreference(isDark ? "light" : "dark");
      },
    };
  }, [preference, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}