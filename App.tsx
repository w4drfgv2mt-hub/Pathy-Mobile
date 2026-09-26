import React, { useEffect, useState } from "react";
import { I18nManager } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { AuthProvider } from "./src/navigation/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";

if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

function AppShell() {
  const { isDark } = useTheme();
  return (
    <AuthProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <RootNavigator />
    </AuthProvider>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // TODO: حط خط "Baloo Bhaijaan 2" الفعلي في assets/fonts وفعّل expo-font هنا.
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
