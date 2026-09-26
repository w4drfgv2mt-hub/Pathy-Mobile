import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { typography, spacing, radius } from "../theme/tokens";
import { useTheme } from "../theme/ThemeContext";
import { ColorPalette } from "../theme/palettes";
import { CurrentSprint } from "../data/mockHome";

interface SprintCardProps {
  sprint: CurrentSprint;
  onPressView?: () => void;
}

export default function SprintCard({
  sprint,
  onPressView,
}: SprintCardProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const firstMember = sprint.members[0];

  return (
    <View style={styles.card}>
      {/* البادجات العلوية */}
      <View style={styles.badgeRow}>
        <View style={styles.timeBadge}>
          <Text style={styles.timeBadgeText}>
            {sprint.startsInLabel}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>
            {sprint.isJoined
              ? "أنت منضم للسبرينت"
              : "غير منضم للسبرينت"}
          </Text>
        </View>
      </View>

      {/* عناوين المجموعة والبرنامج */}
      <Text style={styles.title}>
        {sprint.groupName}
      </Text>

      <Text style={styles.programTitle}>
        {sprint.programName}
      </Text>

      <Text style={styles.dateText}>
        {sprint.opensAtLabel}
      </Text>

      {/* أعضاء السبرنت */}
      <View style={styles.membersRow}>
        <Text style={styles.membersCount}>
          {sprint.members.length}/{sprint.maxMembers}
        </Text>

        <View style={styles.avatarsGroup}>
          {Array.from({ length: sprint.maxMembers }).map((_, index) => {
            const member = sprint.members[index];

            if (member) {
              return (
                <View
                  key={member.id}
                  style={[
                    styles.userAvatar,
                    { backgroundColor: member.color },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {member.initial}
                  </Text>
                </View>
              );
            }

            return (
              <View
                key={`empty-${index}`}
                style={styles.emptyAvatar}
              />
            );
          })}
        </View>
      </View>

      {/* الزر */}
      <Pressable
        style={styles.actionBtn}
        onPress={onPressView}
      >
        <Text style={styles.actionBtnText}>
          عرض المجموعة
        </Text>
      </Pressable>
    </View>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      padding: spacing.xl || 18,
      width: "100%",
    },

    badgeRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.md || 12,
    },

    statusBadge: {
      backgroundColor: colors.success?.[50] || "#f0fdf4",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },

    statusBadgeText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      fontWeight: "700" as any,
      color: colors.success?.[600] || "#16a34a",
    },

    timeBadge: {
      backgroundColor: colors.neutral[50] || "#f8fafc",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },

    timeBadgeText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },

    title: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 17,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 4,
    },

    programTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      color: colors.neutral[500],
      textAlign: "right",
      marginBottom: 4,
    },

    dateText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[400] || "#94a3b8",
      textAlign: "right",
      marginBottom: spacing.lg || 16,
    },

    membersRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg || 16,
    },

    membersCount: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },

    avatarsGroup: {
      flexDirection: "row",
      gap: 4,
    },

    userAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },

    avatarText: {
      color: colors.white || "#ffffff",
      fontSize: 10,
      fontWeight: "bold",
    },

    emptyAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.neutral[300] || "#cbd5e1",
    },

    actionBtn: {
      backgroundColor: colors.primary?.[500] || "#2563eb",
      borderRadius: radius.md || 10,
      paddingVertical: spacing.md || 11,
      alignItems: "center",
      justifyContent: "center",
    },

    actionBtnText: {
      fontFamily: typography.fontFamily,
      color: colors.white || "#ffffff",
      fontWeight: "700" as any,
      fontSize: 13,
    },
  });
}