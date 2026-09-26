import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { typography, spacing, radius } from "../theme/tokens";
import { useTheme } from "../theme/ThemeContext";
import { ColorPalette } from "../theme/palettes";

export default function ScreenPlaceholder({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {children}
    </View>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, padding: spacing["2xl"], backgroundColor: colors.semantic.surfaceMuted },
    card: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      padding: spacing["2xl"],
    },
    title: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 20,
      color: colors.ink,
      textAlign: "right",
      marginBottom: spacing.md,
    },
    description: {
      fontFamily: typography.fontFamily,
      fontSize: typography.size.md,
      color: colors.neutral[500],
      textAlign: "right",
      lineHeight: 22,
    },
  });
}
