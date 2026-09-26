import React from "react";
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { typography, spacing, radius } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { currentUser } from "../../data/mockAccount";
import { useAuth } from "../../navigation/AuthContext";

function Row({
  icon,
  label,
  colors,
  onPress,
}: {
  icon: any;
  label: string;
  colors: ColorPalette;
  onPress?: () => void;
}) {
  const styles = getStyles(colors);

  return (
    <Pressable style={styles.row} onPress={onPress}>
      {/* السهم يسار */}
      <Ionicons
        name="chevron-back"
        size={16}
        color={colors.neutral[300] || "#cbd5e1"}
      />

      {/* اليمين: النص ثم الأيقونة */}
      <View style={styles.rightGroup}>
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.iconBox}>
          <Ionicons
            name={icon}
            size={18}
            color={colors.secondary?.[400] || "#0ea5e9"}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default function AccountScreen() {
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();
  const { colors, isDark, toggleMode } = useTheme();

  const styles = getStyles(colors);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* 1. عنوان الصفحة الرئيسي في المنتصف */}
      <Text style={styles.pageTitle}>حسابي</Text>

      {/* 2. بطاقة المستخدم */}
      <Pressable
        style={styles.profileCard}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name="chevron-back"
          size={16}
          color={colors.neutral[300] || "#cbd5e1"}
        />

        <View style={styles.rightGroup}>
          <Text style={styles.profileName}>
            {currentUser.name || "Lamar Alharbi"}
          </Text>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser.initial || "L"}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* 3. قسم: رحلتي */}
      <Text style={styles.sectionTitle}>رحلتي</Text>

      <View style={styles.groupCard}>
        <Row
          icon="ribbon-outline"
          label="شهاداتي"
          colors={colors}
          onPress={() => {}}
        />

        <View style={styles.divider} />

        <Row
          icon="paper-plane-outline"
          label="كيف يعمل باثي؟"
          colors={colors}
          onPress={() => {}}
        />
      </View>

      {/* 4. قسم: التفضيلات الشخصية */}
      <Text style={styles.sectionTitle}>التفضيلات الشخصية</Text>

      <View style={styles.singleCard}>
        <Switch
          value={isDark}
          onValueChange={toggleMode}
          trackColor={{
            false: colors.neutral[200] || "#e2e8f0",
            true: colors.primary?.[500] || "#2563eb",
          }}
          thumbColor={colors.white || "#ffffff"}
        />

        <View style={styles.rightGroup}>
          <Text style={styles.rowLabel}>المظهر الليلي</Text>
          <View style={styles.iconBox}>
            <Ionicons
              name="moon-outline"
              size={18}
              color={colors.secondary?.[400] || "#0ea5e9"}
            />
          </View>
        </View>
      </View>

      {/* 5. زر تسجيل الخروج */}
      <Pressable
        style={styles.logoutButton}
        onPress={signOut}
      >
        <Ionicons
          name="log-out-outline"
          size={18}
          color={colors.danger?.[500] || "#ef4444"}
        />
        <Text style={styles.logoutText}>تسجيل الخروج</Text>
      </Pressable>
    </ScrollView>
  );
}

const AVATAR_SIZE = 36;

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.xl || 20,
      paddingTop: spacing["3xl"] || 40,
      paddingBottom: spacing["3xl"] || 40,
      backgroundColor: colors.semantic.surfaceMuted,
      flexGrow: 1,
    },

    pageTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 22,
      color: colors.ink,
      textAlign: "center",
      marginBottom: spacing["2xl"] || 28,
    },

    sectionTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 14,
      color: colors.ink,
      textAlign: "right",
      marginTop: spacing.lg || 18,
      marginBottom: spacing.sm || 10,
    },

    profileCard: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      paddingHorizontal: spacing.xl || 18,
      paddingVertical: spacing.md || 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    singleCard: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      paddingHorizontal: spacing.xl || 18,
      paddingVertical: spacing.md || 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    groupCard: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      overflow: "hidden",
    },

    rightGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md || 12,
    },

    profileName: {
      fontFamily: typography.fontFamily,
      fontWeight: "600" as any,
      fontSize: typography.size.sm || 14,
      color: colors.ink,
      textAlign: "right",
    },

    avatar: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      borderRadius: AVATAR_SIZE / 2,
      backgroundColor: colors.avatar?.bg || "#65a30d",
      alignItems: "center",
      justifyContent: "center",
    },

    avatarText: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 15,
      color: colors.white || "#ffffff",
    },

    row: {
      minHeight: 56,
      paddingHorizontal: spacing.xl || 18,
      paddingVertical: spacing.md || 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    rowLabel: {
      fontFamily: typography.fontFamily,
      fontSize: typography.size.sm || 13,
      fontWeight: "500" as any,
      color: colors.ink,
      textAlign: "right",
    },

    iconBox: {
      width: 32,
      height: 32,
      borderRadius: radius.md || 8,
      backgroundColor: colors.semantic.actionSoft || "#f0f9ff",
      alignItems: "center",
      justifyContent: "center",
    },

    divider: {
      height: 1,
      backgroundColor: colors.semantic.border,
      marginHorizontal: spacing.lg || 16,
    },

    logoutButton: {
      backgroundColor: colors.semantic.surface,
      borderWidth: 1,
      borderColor: colors.danger?.[200] || "#fca5a5",
      borderRadius: radius.md || 12,
      paddingVertical: spacing.md || 12,
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm || 8,
      marginTop: spacing["2xl"] || 28,
    },

    logoutText: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: typography.size.sm || 13,
      color: colors.danger?.[500] || "#ef4444",
    },
  });
}