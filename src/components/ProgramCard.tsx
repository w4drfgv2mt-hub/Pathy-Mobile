import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../theme/tokens";
import { useTheme } from "../theme/ThemeContext";
import { ColorPalette } from "../theme/palettes";
import { Program } from "../data/mockPrograms";

export default function ProgramCard({
  program,
  onPressDetails,
  onPressTelegram,
}: {
  program: Program;
  onPressDetails: () => void;
  onPressTelegram: () => void;
}) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <Ionicons name="folder-outline" size={20} color={colors.cardIcons.folderIcon} />
        </View>

        <View style={styles.providerContainer}>
          <Text style={styles.providerSub}>مقدم من</Text>
          <View style={styles.pathyLogoCircle}>
            <Text style={styles.pathyText}>باثي</Text>
            <View style={styles.blueDot} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>{program.title}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {program.description}
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statText}>{program.hoursLabel}</Text>
          <Ionicons name="time-outline" size={13} color={colors.neutral[500]} />
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>{program.lessonsCount} دروس</Text>
          <Ionicons name="code-slash-outline" size={13} color={colors.neutral[500]} />
        </View>
      </View>

      {program.inSprint && (
        <View style={styles.sprintStatusRow}>
          <Text style={styles.sprintStatusText}>• أنت في سبرينت حالي</Text>
        </View>
      )}

      <View style={styles.progressRow}>
        <Text style={styles.progressCount}>
          {program.completedLessons ?? 5} من {program.totalLessons ?? 8} دروس
        </Text>
        <Text style={styles.progressLabel}>مكتمل</Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.detailsBtn} onPress={onPressDetails}>
          <Text style={styles.detailsBtnText}>عرض التفاصيل</Text>
        </Pressable>

        <Pressable style={styles.telegramBtn} onPress={onPressTelegram}>
          <Text style={styles.telegramBtnText}>مجتمع تيليجرام</Text>
          <Ionicons name="paper-plane-outline" size={14} color={colors.semantic.action} />
        </Pressable>
      </View>
    </View>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.semantic.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      padding: 20,
      marginBottom: 16,
      width: "100%",
    },
    headerRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: colors.cardIcons.folderBg,
      alignItems: "center",
      justifyContent: "center",
    },
    providerContainer: {
      alignItems: "center",
    },
    providerSub: {
      fontFamily: typography.fontFamily,
      fontSize: 10,
      color: colors.neutral[400],
      marginBottom: 2,
    },
    pathyLogoCircle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      backgroundColor: colors.semantic.surface,
      gap: 2,
    },
    pathyText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      fontWeight: "bold",
      color: colors.ink,
    },
    blueDot: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: colors.primary.button,
    },
    title: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 17,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 6,
    },
    description: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      color: colors.neutral[500],
      textAlign: "right",
      lineHeight: 19,
      marginBottom: 12,
    },
    statsRow: {
      flexDirection: "row-reverse",
      gap: 16,
      marginBottom: 8,
    },
    statItem: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 4,
    },
    statText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    sprintStatusRow: {
      alignItems: "flex-end",
      marginBottom: 10,
    },
    sprintStatusText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.semantic.action,
      fontWeight: "700",
    },
    progressRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.semantic.border,
      paddingTop: 10,
      marginBottom: 16,
    },
    progressLabel: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    progressCount: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    actionsRow: {
      flexDirection: "row-reverse",
      gap: 10,
    },
    detailsBtn: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: colors.primary.button,
      borderRadius: 8,
      paddingVertical: 9,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.semantic.surface,
    },
    detailsBtnText: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "700",
      color: colors.primary.button,
    },
    telegramBtn: {
      flex: 1,
      backgroundColor: colors.semantic.actionSoft,
      borderRadius: 8,
      paddingVertical: 9,
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    telegramBtnText: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "700",
      color: colors.semantic.action,
    },
  });
}