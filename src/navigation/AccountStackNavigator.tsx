import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountStackParamList } from "./types";
import { getStackScreenOptions } from "./stackScreenOptions";
import { useTheme } from "../theme/ThemeContext";
import AccountScreen from "../screens/account/AccountScreen";
import SettingsScreen from "../screens/account/SettingsScreen";

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountStackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(colors)}>
      <Stack.Screen name="Account" component={AccountScreen} options={{ title: "حسابي" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "الإعدادات" }} />
      
    </Stack.Navigator>
    
  );
}
