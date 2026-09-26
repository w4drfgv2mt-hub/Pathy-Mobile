import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProgramsStackParamList } from "./types";
import { getStackScreenOptions } from "./stackScreenOptions";
import { useTheme } from "../theme/ThemeContext";
import ProgramsListScreen from "../screens/programs/ProgramsListScreen";
import ProgramDetailsScreen from "../screens/programs/ProgramDetailsScreen";

const Stack = createNativeStackNavigator<ProgramsStackParamList>();

export default function ProgramsStackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(colors)}>
      <Stack.Screen name="ProgramsList" component={ProgramsListScreen} options={{ title: "البرامج" }} />
      <Stack.Screen name="ProgramDetails" component={ProgramDetailsScreen} options={{ title: "تفاصيل البرنامج" }} />
    </Stack.Navigator>
  );
}
