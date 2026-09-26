import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { typography, spacing, radius, shadows } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { sprints } from "../../data/mockLearning";
import { gitGithubLessons } from "../../data/mockLessonsDetail";

export default function SprintDetailsScreen() {
  const route = useRoute<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const sprintId = route.params?.sprintId ?? "u-405";
  const sprint = sprints.find((s) => s.id === sprintId) ?? sprints[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.groupName}>{sprint.groupName}</Text>
        <Text style={styles.programName}>{sprint.program}</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color={colors.neutral[500]} />
          <Text style={styles.timeText}>{sprint.timeLeftLabel}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>الأعضاء</Text>
      <View style={styles.card}>
        {sprint.members.map((m) => (
          <View key={m.id} style={styles.memberRow}>
            <View style={[styles.avatar, { backgroundColor: m.color }]}>
              <Text style={styles.avatarText}>{m.initial}</Text>
            </View>
            <Text style={styles.memberLabel}>عضو</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>الدروس</Text>
      <View style={styles.card}>
        {gitGithubLessons.map((lesson, i) => (
          <View key={lesson.id} style={[styles.lessonRow, i > 0 && styles.lessonDivider]}>
            <Ionicons
              name={lesson.done ? "checkmark-circle" : "ellipse-outline"}
              size={20}
              color={lesson.done ? colors.secondary[400] : colors.neutral[400]}
            />
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const AVATAR_SIZE = 32;

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { padding: spacing["2xl"], backgroundColor: colors.semantic.surfaceMuted, flexGrow: 1 },
    headerCard: { backgroundColor: colors.semantic.surface, borderRadius: radius.md, padding: spacing["2xl"], ...shadows.md },
    groupName: { fontFamily: typography.fontFamily, fontWeight: typography.weight.bold as any, fontSize: 22, color: colors.ink, textAlign: "right" },
    programName: { fontFamily: typography.fontFamily, fontSize: typography.size.md, color: colors.neutral[500], textAlign: "right", marginTop: spacing.sm },
    timeRow: { flexDirection: "row-reverse", alignItems: "center", gap: spacing.sm, marginTop: spacing.lg },
    timeText: { fontFamily: typography.fontFamily, fontSize: typography.size.sm, color: colors.neutral[500] },
    sectionTitle: { fontFamily: typography.fontFamily, fontWeight: typography.weight.bold as any, fontSize: 16, color: colors.ink, textAlign: "right", marginTop: spacing["2xl"], marginBottom: spacing.lg },
    card: { backgroundColor: colors.semantic.surface, borderRadius: radius.md, ...shadows.xs, padding: spacing.xl },
    memberRow: { flexDirection: "row-reverse", alignItems: "center", gap: spacing.lg, paddingVertical: spacing.sm },
    avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2, alignItems: "center", justifyContent: "center" },
    avatarText: { fontFamily: typography.fontFamily, fontWeight: typography.weight.bold as any, color: colors.white },
    memberLabel: { fontFamily: typography.fontFamily, fontSize: typography.size.sm, color: colors.ink },
    lessonRow: { flexDirection: "row-reverse", alignItems: "center", gap: spacing.lg, paddingVertical: spacing.lg },
    lessonDivider: { borderTopWidth: 1, borderTopColor: colors.semantic.border },
    lessonTitle: { fontFamily: typography.fontFamily, fontSize: typography.size.md, color: colors.ink, textAlign: "right", flex: 1 },
  });
}
