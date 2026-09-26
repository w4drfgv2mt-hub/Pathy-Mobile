import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import { getStackScreenOptions } from "./stackScreenOptions";
import { useTheme } from "../theme/ThemeContext";
import HomeScreen from "../screens/home/HomeScreen";
import SprintDetailsScreen from "../screens/home/SprintDetailsScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(colors)}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "الرئيسية" }} />
      <Stack.Screen name="SprintDetails" component={SprintDetailsScreen} options={{ title: "تفاصيل السبرينت" }} />
    </Stack.Navigator>
  );
}
