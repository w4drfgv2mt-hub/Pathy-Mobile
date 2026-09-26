import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import { useAuth } from "./AuthContext";
import { useTheme } from "../theme/ThemeContext";

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const { colors, isDark } = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.semantic.surfaceMuted,
      card: colors.semantic.surface,
      text: colors.ink,
      border: colors.semantic.border,
      primary: colors.semantic.action,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
