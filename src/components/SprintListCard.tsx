import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { typography, spacing, radius } from "../theme/tokens";
import { useTheme } from "../theme/ThemeContext";
import { ColorPalette } from "../theme/palettes";

interface LessonStep {
  id: string;
  order: number;
  title: string;
  duration: string;
  completed: boolean;
}

const MOCK_LESSONS: LessonStep[] = [
  { id: "1", order: 1, title: "ليش أحتاج أتعلم Git؟", duration: "10 دقائق", completed: true },
  { id: "2", order: 2, title: "تحكم في جهازك", duration: "15 دقيقة", completed: true },
  { id: "3", order: 3, title: "جهّز بيئة العمل", duration: "20 دقيقة", completed: false },
  { id: "4", order: 4, title: "أول مستودع لك (git init)", duration: "15 دقيقة", completed: false },
  { id: "5", order: 5, title: "حفظ التغييرات (commit)", duration: "25 دقيقة", completed: false },
];

export default function SprintDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [lessons, setLessons] = useState<LessonStep[]>(MOCK_LESSONS);

  const toggleLesson = (id: string) => {
    setLessons((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = lessons.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* الترويسة مع زر الرجوع */}
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-forward" size={20} color={colors.ink} />
          </Pressable>
          <Text style={styles.topBarTitle}>تفاصيل السبرينت</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* بطاقة ملخص السبرينت */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>أنت منضم للسبرينت</Text>
            </View>
            <View style={styles.programTag}>
              <Text style={styles.programTagText}>برنامج Git & GitHub</Text>
              <Ionicons name="newspaper-outline" size={13} color={colors.neutral[400]} />
            </View>
          </View>

          <Text style={styles.groupName}>مجموعة 405-U</Text>
          <Text style={styles.visibilityLabel}>مفتوح للجميع • ينتهي خلال 13 ساعة</Text>

          {/* شريط الإنجاز */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressPercentText}>{progressPercent}%</Text>
              <Text style={styles.progressCountText}>
                {completedCount} من {lessons.length} دروس مكتملة
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          {/* معلومات الأعضاء */}
          <View style={styles.membersRow}>
            <View style={styles.avatarsGroup}>
              <View style={[styles.avatarCircle, { backgroundColor: colors.avatar?.bg || "#65a30d" }]}>
                <Text style={styles.avatarText}>L</Text>
              </View>
              <View style={[styles.avatarCircle, { backgroundColor: colors.primary.button, marginEnd: -8 }]}>
                <Text style={styles.avatarText}>U</Text>
              </View>
            </View>
            <Text style={styles.membersCountText}>أنت و 3 أعضاء آخرين</Text>
          </View>
        </View>

        {/* قائمة الدروس */}
        <Text style={styles.sectionTitle}>محتوى السبرينت</Text>
        <View style={styles.lessonsCard}>
          {lessons.map((lesson, index) => (
            <Pressable
              key={lesson.id}
              style={[
                styles.lessonItemRow,
                index > 0 && styles.lessonDivider,
              ]}
              onPress={() => toggleLesson(lesson.id)}
            >
              <Ionicons
                name={lesson.completed ? "checkmark-circle" : "ellipse-outline"}
                size={22}
                color={lesson.completed ? colors.success[500] : colors.neutral[300]}
              />

              <View style={styles.lessonInfoRight}>
                <View style={styles.lessonTextColumn}>
                  <Text
                    style={[
                      styles.lessonTitle,
                      lesson.completed && styles.lessonTitleDone,
                    ]}
                  >
                    {lesson.title}
                  </Text>
                  <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                </View>

                <View
                  style={[
                    styles.orderBadge,
                    lesson.completed && styles.orderBadgeDone,
                  ]}
                >
                  <Text
                    style={[
                      styles.orderBadgeText,
                      lesson.completed && styles.orderBadgeTextDone,
                    ]}
                  >
                    {lesson.order}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* زر التفاعل السفلي */}
        <Pressable
          style={styles.actionBtn}
          onPress={() => navigation.navigate("Learning")}
        >
          <Text style={styles.actionBtnText}>بدء الدرس التالي</Text>
          <Ionicons name="play" size={16} color={colors.white} />
        </Pressable>
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
    summaryCard: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      padding: spacing.xl || 18,
      marginBottom: spacing.xl || 20,
    },
    cardHeaderRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    programTag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    programTagText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[400],
    },
    badge: {
      backgroundColor: colors.success[50],
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    badgeText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      fontWeight: "700" as any,
      color: colors.success[600],
    },
    groupName: {
      fontFamily: typography.fontFamily,
      fontSize: 18,
      fontWeight: typography.weight.bold as any,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 3,
    },
    visibilityLabel: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.primary.button,
      textAlign: "right",
      marginBottom: 16,
      fontWeight: "600" as any,
    },
    progressContainer: {
      marginBottom: 16,
    },
    progressTextRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    progressCountText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    progressPercentText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      fontWeight: "700" as any,
      color: colors.primary.button,
    },
    progressBarTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.semantic.surfaceMuted,
      overflow: "hidden",
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: colors.primary.button,
      borderRadius: 3,
    },
    membersRow: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: colors.semantic.border,
      paddingTop: 12,
    },
    avatarsGroup: {
      flexDirection: "row-reverse",
      alignItems: "center",
    },
    avatarCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: colors.semantic.surface,
    },
    avatarText: {
      fontSize: 10,
      fontWeight: "bold",
      color: colors.white,
    },
    membersCountText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    sectionTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 15,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 10,
    },
    lessonsCard: {
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.lg || 16,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      paddingHorizontal: spacing.lg || 16,
      marginBottom: spacing.xl || 20,
    },
    lessonItemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
    },
    lessonDivider: {
      borderTopWidth: 1,
      borderTopColor: colors.semantic.border,
    },
    lessonInfoRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flex: 1,
      justifyContent: "flex-end",
    },
    lessonTextColumn: {
      alignItems: "flex-end",
    },
    lessonTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "600" as any,
      color: colors.ink,
      textAlign: "right",
      marginBottom: 2,
    },
    lessonTitleDone: {
      color: colors.neutral[400],
      textDecorationLine: "line-through",
    },
    lessonDuration: {
      fontFamily: typography.fontFamily,
      fontSize: 10,
      color: colors.neutral[400],
    },
    orderBadge: {
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: colors.neutral[200],
      alignItems: "center",
      justifyContent: "center",
    },
    orderBadgeDone: {
      backgroundColor: colors.success[50],
    },
    orderBadgeText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      fontWeight: "700" as any,
      color: colors.neutral[600],
    },
    orderBadgeTextDone: {
      color: colors.success[600],
    },
    actionBtn: {
      backgroundColor: colors.primary.button,
      borderRadius: radius.md || 10,
      paddingVertical: 12,
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    actionBtnText: {
      fontFamily: typography.fontFamily,
      color: colors.white,
      fontWeight: "700" as any,
      fontSize: 14,
    },
  });
}