import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MainTabParamList } from "./types";
import { typography } from "../theme/tokens";
import { useTheme } from "../theme/ThemeContext";
import HomeStackNavigator from "./HomeStackNavigator";
import ProgramsStackNavigator from "./ProgramsStackNavigator";
import LearningStackNavigator from "./LearningStackNavigator";
import AccountStackNavigator from "./AccountStackNavigator";

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_CONFIG: {
  name: keyof MainTabParamList;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  component: React.ComponentType<any>;
}[] = [
  { name: "HomeTab", label: "الرئيسية", icon: "home-outline", component: HomeStackNavigator },
  { name: "ProgramsTab", label: "البرامج", icon: "grid-outline", component: ProgramsStackNavigator },
  { name: "LearningTab", label: "تعلمي", icon: "book-outline", component: LearningStackNavigator },
  { name: "AccountTab", label: "حسابي", icon: "person-outline", component: AccountStackNavigator },
];

export default function MainTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.semantic.action,
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarStyle: { backgroundColor: colors.semantic.surface, borderTopColor: colors.semantic.border },
        tabBarLabelStyle: { fontFamily: typography.fontFamily, fontSize: typography.size.xs },
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ color, size }) => <Ionicons name={tab.icon} size={size} color={color} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
