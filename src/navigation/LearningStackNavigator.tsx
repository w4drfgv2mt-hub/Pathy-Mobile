import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LearningStackParamList } from "./types";
import { getStackScreenOptions } from "./stackScreenOptions";
import { useTheme } from "../theme/ThemeContext";
import LessonsListScreen from "../screens/learning/LessonsListScreen";
import LessonScreen from "../screens/learning/LessonScreen";

const Stack = createNativeStackNavigator<LearningStackParamList>();

export default function LearningStackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={getStackScreenOptions(colors)}>
      <Stack.Screen name="LessonsList" component={LessonsListScreen} options={{ title: "رحلتي" }} />
      <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: "الدرس" }} />
    </Stack.Navigator>
  );
}
