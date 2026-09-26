import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { typography, spacing, radius } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { programs } from "../../data/mockPrograms";
import { gitGithubLessons as initialLessons } from "../../data/mockLessonsDetail";

export default function ProgramDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const programId = route.params?.programId ?? "git-github";
  const program = programs.find((p) => p.id === programId) ?? programs[0];

  const [lessons, setLessons] = useState(initialLessons);

  const toggleLesson = (id: string) => {
    setLessons((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const completedCount = lessons.filter((l) => l.done).length;

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* شريط علوي مع زر الرجوع */}
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-forward" size={20} color={colors.ink} />
          </Pressable>
          <Text style={styles.topBarTitle}>تفاصيل البرنامج</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* بطاقة معلومات البرنامج الرئيسية */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons
                name="folder-outline"
                size={20}
                color={colors.cardIcons.folderIcon}
              />
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
          <Text style={styles.description}>{program.description}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statText}>{program.hoursLabel}</Text>
              <Ionicons name="time-outline" size={13} color={colors.neutral[500]} />
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statText}>{lessons.length} دروس</Text>
              <Ionicons name="code-slash-outline" size={13} color={colors.neutral[500]} />
            </View>
          </View>

          {/* شريط تقدم الإنجاز */}
          <View style={styles.progressRow}>
            <Text style={styles.progressCount}>
              {completedCount} من {lessons.length} دروس مكتملة
            </Text>
            <Text style={styles.progressLabel}>الإنجاز</Text>
          </View>

          {/* زر مجتمع التيليجرام */}
          <Pressable style={styles.telegramButton}>
            <Text style={styles.telegramText}>مجتمع تيليجرام</Text>
            <Ionicons name="paper-plane-outline" size={16} color={colors.semantic.action} />
          </Pressable>
        </View>

        {/* قائمة الدروس */}
        <Text style={styles.sectionTitle}>محتوى البرنامج</Text>
        <View style={styles.card}>
          {lessons.map((lesson, i) => (
            <Pressable
              key={lesson.id}
              style={[styles.lessonRow, i > 0 && styles.lessonDivider]}
              onPress={() => toggleLesson(lesson.id)}
            >
              {/* مؤشر الإنجاز يسار */}
              <Ionicons
                name={lesson.done ? "checkmark-circle" : "ellipse-outline"}
                size={22}
                color={lesson.done ? colors.success[500] : colors.neutral[300]}
              />

              {/* اليمين: عنوان الدرس مع رقمه */}
              <View style={styles.lessonRightGroup}>
                <Text
                  style={[
                    styles.lessonTitle,
                    lesson.done && styles.lessonTitleDone,
                  ]}
                >
                  {lesson.title}
                </Text>
                <View
                  style={[
                    styles.lessonIndexBox,
                    lesson.done && styles.lessonIndexBoxDone,
                  ]}
                >
                  <Text
                    style={[
                      styles.lessonIndexText,
                      lesson.done && styles.lessonIndexTextDone,
                    ]}
                  >
                    {i + 1}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: colors.semantic.surfaceMuted,
    },
    container: {
      paddingHorizontal: spacing.xl || 18,
      paddingTop: spacing.xl || 20,
      paddingBottom: spacing["3xl"] || 40,
    },
    topBar: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.lg || 16,
    },
    backButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.semantic.surface,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      alignItems: "center",
      justifyContent: "center",
    },
    topBarTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 16,
      fontWeight: typography.weight.bold as any,
      color: colors.ink,
    },
    card: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      padding: spacing.xl || 18,
      marginBottom: spacing.lg || 16,
    },
    cardHeader: {
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
      fontSize: 9,
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
      lineHeight: 18,
      marginBottom: 14,
    },
    statsRow: {
      flexDirection: "row-reverse",
      gap: 16,
      marginBottom: 14,
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
    telegramButton: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.semantic.actionSoft,
      borderRadius: radius.md || 8,
      paddingVertical: 10,
    },
    telegramText: {
      fontFamily: typography.fontFamily,
      color: colors.semantic.action,
      fontWeight: "700" as any,
      fontSize: 13,
    },
    sectionTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 14,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 10,
      marginTop: 4,
    },
    lessonRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
    },
    lessonDivider: {
      borderTopWidth: 1,
      borderTopColor: colors.semantic.border,
    },
    lessonRightGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flex: 1,
      justifyContent: "flex-end",
    },
    lessonTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      color: colors.ink,
      textAlign: "right",
    },
    lessonTitleDone: {
      color: colors.neutral[400],
      textDecorationLine: "line-through",
    },
    lessonIndexBox: {
      width: 22,
      height: 22,
      borderRadius: 5,
      backgroundColor: colors.neutral[200],
      alignItems: "center",
      justifyContent: "center",
    },
    lessonIndexBoxDone: {
      backgroundColor: colors.success[50],
    },
    lessonIndexText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      fontWeight: "700" as any,
      color: colors.neutral[600],
    },
    lessonIndexTextDone: {
      color: colors.success[600],
    },
  });
}