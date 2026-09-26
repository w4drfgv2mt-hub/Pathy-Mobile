import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { typography, spacing } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { currentSprint, userFirstName } from "../../data/mockHome";
import SprintCard from "../../components/SprintCard";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* 1. قسم الترحيب وعنوان السبرنت */}
      <View style={styles.headerBlock}>
        <Text style={styles.greeting}>
          صباح الخير، {userFirstName || "Lamar"} 👋
        </Text>
        <Text style={styles.sectionTitle}>سبرينتك الحالي</Text>
      </View>

      {/* 2. بطاقة السبرنت الحالي */}
      <SprintCard
        sprint={currentSprint}
        onPressView={() =>
          navigation.navigate("SprintDetails", { sprintId: "u-405" })
        }
      />
    </ScrollView>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.xl || 18,
      paddingTop: spacing.xl || 20,
      paddingBottom: spacing["3xl"] || 40,
      backgroundColor: colors.semantic.surfaceMuted,
      flexGrow: 1,
    },

    headerBlock: {
      alignItems: "flex-end",
      marginBottom: spacing.md || 14,
    },

    greeting: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 22,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 4,
    },

    sectionTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: "700" as any,
      fontSize: 15,
      color: colors.ink,
      textAlign: "right",
    },
  });
}