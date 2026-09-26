import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { typography, spacing, radius, shadows } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { currentUser } from "../../data/mockAccount";

function Row({
  icon,
  label,
  value,
  colors,
  danger = false,
}: {
  icon: any;
  label: string;
  value?: string;
  colors: ColorPalette;
  danger?: boolean;
}) {
  const styles = getStyles(colors);

  return (
    <Pressable style={styles.row}>
      {/* 1. أقصى اليمين: الأيقونة والنصوص */}
      <View style={styles.rightGroup}>
        <View
          style={[
            styles.iconBox,
            danger && {
              backgroundColor: colors.danger[50],
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={19}
            color={
              danger
                ? colors.danger[600]
                : colors.semantic.action
            }
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.rowLabel,
              danger && { color: colors.danger[600] },
            ]}
          >
            {label}
          </Text>

          {value && (
            <Text style={styles.rowValue}>
              {value}
            </Text>
          )}
        </View>
      </View>

      {/* 2. أقصى اليسار: السهم */}
      <Ionicons
        name="chevron-back"
        size={18}
        color={colors.neutral[400]}
      />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>الإعدادات</Text>
        <Text style={styles.subtitle}>
          تحكم في معلومات حسابك وتفضيلاتك
        </Text>
      </View>

      {/* معلومات الحساب */}
      <Text style={styles.sectionTitle}>
        معلومات الحساب
      </Text>

      <View style={styles.card}>
        <Row
          icon="person-outline"
          label="الاسم"
          value={currentUser.name}
          colors={colors}
        />

        <View style={styles.divider} />

        <Row
          icon="mail-outline"
          label="البريد الإلكتروني"
          value={currentUser.email}
          colors={colors}
        />

        <View style={styles.divider} />

        <Row
          icon="lock-closed-outline"
          label="تغيير كلمة المرور"
          colors={colors}
        />
      </View>

      {/* الإشعارات */}
      <Text style={styles.sectionTitle}>
        الإشعارات
      </Text>

      <View style={styles.card}>
        <Row
          icon="notifications-outline"
          label="إشعارات الدروس والسبرينت"
          colors={colors}
        />
      </View>

      {/* إدارة الحساب */}
      <Text style={styles.sectionTitle}>
        إدارة الحساب
      </Text>

      <View style={styles.card}>
        <Row
          icon="trash-outline"
          label="حذف الحساب"
          colors={colors}
          danger
        />
      </View>
    </ScrollView>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      direction: "rtl", // إجبار الشاشة على نمط اليمين لليسار
      paddingHorizontal: spacing["2xl"],
      paddingTop: spacing["2xl"],
      paddingBottom: spacing["3xl"],
      backgroundColor: colors.semantic.surfaceMuted,
      flexGrow: 1,
    },

    header: {
      alignItems: "flex-start", // يبدأ من اليمين
      marginBottom: spacing["2xl"],
    },

    title: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 26,
      color: colors.ink,
      textAlign: "right",
    },

    subtitle: {
      fontFamily: typography.fontFamily,
      fontSize: typography.size.sm,
      color: colors.neutral[500],
      textAlign: "right",
      marginTop: spacing.xs,
    },

    sectionTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 15,
      color: colors.ink,
      textAlign: "right",
      marginBottom: spacing.md,
    },

    card: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg,
      ...shadows.xs,
      overflow: "hidden",
      marginBottom: spacing["2xl"],
    },

    row: {
      direction: "rtl",
      minHeight: 64,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    rightGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.lg,
    },

    textContainer: {
      alignItems: "flex-start",
    },

    rowLabel: {
      fontFamily: typography.fontFamily,
      fontSize: typography.size.md,
      color: colors.ink,
      textAlign: "right",
    },

    rowValue: {
      fontFamily: typography.fontFamily,
      fontSize: typography.size.xs,
      color: colors.neutral[500],
      marginTop: 2,
      textAlign: "right",
    },

    iconBox: {
      width: 38,
      height: 38,
      borderRadius: radius.md,
      backgroundColor: colors.semantic.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
    },

    divider: {
      height: 1,
      backgroundColor: colors.semantic.border,
      marginHorizontal: spacing.xl,
    },
  });
}