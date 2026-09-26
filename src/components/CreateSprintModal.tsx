import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { typography, radius, spacing } from "../theme/tokens";
import { useTheme } from "../theme/ThemeContext";
import { ColorPalette } from "../theme/palettes";

const AVAILABLE_LESSONS = [
  { id: "1", title: "ليش أحتاج أتعلم Git؟", count: 2 },
  { id: "2", title: "تحكم في جهازك", count: 1 },
  { id: "3", title: "جهّز بيئة العمل", count: 3 },
  { id: "4", title: "أول مستودع لك", count: 2 },
];

interface CreateSprintModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate?: (sprintData: {
    mode: "solo" | "group";
    programName: string;
    lessons: { label: string; count: number }[];
    startDate: string;
  }) => void;
}

export function CreateSprintModal({
  visible,
  onClose,
  onCreate,
}: CreateSprintModalProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<"solo" | "group">("solo");
  const [selectedLessons, setSelectedLessons] = useState<string[]>(["1", "2"]);
  const [startDate, setStartDate] = useState("السبت القادم");

  const toggleLesson = (id: string) => {
    setSelectedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else {
      // إتمام الإنشاء
      if (onCreate) {
        const chosen = AVAILABLE_LESSONS.filter((l) =>
          selectedLessons.includes(l.id)
        ).map((l) => ({ label: l.title, count: l.count }));

        onCreate({
          mode,
          programName: "برنامج Git & GitHub",
          lessons: chosen.length > 0 ? chosen : [{ label: "مقدمة عامة", count: 1 }],
          startDate,
        });
      }
      resetAndClose();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    } else {
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  const progressPercent = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={resetAndClose}>
      <View style={styles.backdrop}>
        <View style={styles.bottomSheet}>
          <View style={styles.dragHandle} />

          {/* الترويسة والخطوة */}
          <View style={styles.header}>
            <Pressable onPress={resetAndClose} hitSlop={10}>
              <Ionicons name="close" size={22} color={colors.neutral[500]} />
            </Pressable>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.stepCounter}>{step} من 3</Text>
              <Text style={styles.title}>
                {step === 1 && "ماذا ستتعلم؟"}
                {step === 2 && "اختر الدروس"}
                {step === 3 && "موعد الانطلاق"}
              </Text>
            </View>
          </View>

          {/* شريط التقدم الديناميكي */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: progressPercent }]} />
          </View>

          {/* الخطوة 1: البرنامج والنمط */}
          {step === 1 && (
            <View>
              <Text style={styles.sectionLabel}>البرنامج</Text>
              <View style={styles.selectedBox}>
                <Text style={styles.programName}>برنامج Git & GitHub</Text>
                <Text style={styles.lessonsCount}>8 دروس</Text>
              </View>

              <Text style={styles.sectionLabel}>بمفردك أم مع مجموعة؟</Text>
              <View style={styles.optionsRow}>
                <Pressable
                  style={[styles.optionBox, mode === "solo" && styles.optionBoxActive]}
                  onPress={() => setMode("solo")}
                >
                  <Text style={styles.optTitle}>بمفردي</Text>
                  <Text style={styles.optSub}>تبدأ متى شئت.</Text>
                </Pressable>

                <Pressable
                  style={[styles.optionBox, mode === "group" && styles.optionBoxActive]}
                  onPress={() => setMode("group")}
                >
                  <Text style={styles.optTitle}>مع مجموعة</Text>
                  <Text style={styles.optSub}>ادعُ غيرك.</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* الخطوة 2: تحديد الدروس */}
          {step === 2 && (
            <View>
              <Text style={styles.sectionLabel}>حدد الدروس المطلوبة ({selectedLessons.length})</Text>
              <ScrollView style={{ maxHeight: 220 }}>
                {AVAILABLE_LESSONS.map((item) => {
                  const isChecked = selectedLessons.includes(item.id);
                  return (
                    <Pressable
                      key={item.id}
                      style={[styles.lessonSelectRow, isChecked && styles.lessonSelectRowActive]}
                      onPress={() => toggleLesson(item.id)}
                    >
                      <Ionicons
                        name={isChecked ? "checkmark-circle" : "ellipse-outline"}
                        size={20}
                        color={isChecked ? colors.primary[500] : colors.neutral[300]}
                      />
                      <Text style={styles.lessonSelectText}>{item.title}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* الخطوة 3: تحديد الموعد */}
          {step === 3 && (
            <View>
              <Text style={styles.sectionLabel}>اختر وقت بدء السبرينت</Text>
              {["السبت القادم", "غداً صباحاً", "البدء فوراً"].map((dateOpt) => (
                <Pressable
                  key={dateOpt}
                  style={[styles.dateChoiceBox, startDate === dateOpt && styles.dateChoiceBoxActive]}
                  onPress={() => setStartDate(dateOpt)}
                >
                  <Ionicons
                    name={startDate === dateOpt ? "radio-button-on" : "radio-button-off"}
                    size={18}
                    color={startDate === dateOpt ? colors.primary[500] : colors.neutral[400]}
                  />
                  <Text style={styles.dateChoiceText}>{dateOpt}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* الأزرار */}
          <View style={styles.actionsRow}>
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>{step === 3 ? "تأكيد وإنشاء" : "التالي"}</Text>
            </Pressable>
            <Pressable style={styles.prevBtn} onPress={handlePrev}>
              <Text style={styles.prevBtnText}>{step === 1 ? "إلغاء" : "السابق"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CreateSprintModal;

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(15, 23, 42, 0.45)",
      justifyContent: "flex-end",
    },
    bottomSheet: {
      backgroundColor: colors.semantic.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: spacing.xl || 20,
      paddingTop: 12,
      paddingBottom: spacing["3xl"] || 36,
    },
    dragHandle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.neutral[200] || "#e2e8f0",
      alignSelf: "center",
      marginBottom: 14,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    stepCounter: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[400] || "#94a3b8",
      marginBottom: 2,
    },
    title: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 20,
      color: colors.ink,
    },
    progressBarBg: {
      height: 3,
      backgroundColor: colors.neutral[100] || "#f1f5f9",
      borderRadius: 2,
      marginBottom: spacing.xl || 20,
      alignItems: "flex-start",
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: colors.primary?.[500] || "#2563eb",
      borderRadius: 2,
    },
    sectionLabel: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "700" as any,
      color: colors.ink,
      textAlign: "right",
      marginBottom: spacing.sm || 8,
    },
    selectedBox: {
      borderWidth: 1.5,
      borderColor: colors.primary?.[500] || "#2563eb",
      borderRadius: radius.md || 12,
      padding: spacing.md || 14,
      alignItems: "flex-end",
      marginBottom: spacing.lg || 16,
    },
    programName: {
      fontFamily: typography.fontFamily,
      fontSize: 14,
      fontWeight: "bold",
      color: colors.ink,
      marginBottom: 2,
    },
    lessonsCount: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    optionsRow: {
      flexDirection: "row-reverse",
      gap: 10,
      marginBottom: spacing.lg || 16,
    },
    optionBox: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.neutral[200] || "#e2e8f0",
      borderRadius: radius.md || 12,
      padding: spacing.md || 14,
      alignItems: "center",
      backgroundColor: colors.semantic.surface,
    },
    optionBoxActive: {
      borderColor: colors.primary?.[500] || "#2563eb",
      backgroundColor: colors.primary?.[50] || "#eff6ff",
    },
    optTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "bold",
      color: colors.ink,
      marginBottom: 3,
    },
    optSub: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
    },
    lessonSelectRow: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.neutral[200] || "#e2e8f0",
      marginBottom: 8,
    },
    lessonSelectRowActive: {
      borderColor: colors.primary?.[500] || "#2563eb",
      backgroundColor: colors.primary?.[50] || "#eff6ff",
    },
    lessonSelectText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      color: colors.ink,
    },
    dateChoiceBox: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.neutral[200] || "#e2e8f0",
      marginBottom: 8,
    },
    dateChoiceBoxActive: {
      borderColor: colors.primary?.[500] || "#2563eb",
      backgroundColor: colors.primary?.[50] || "#eff6ff",
    },
    dateChoiceText: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      color: colors.ink,
      fontWeight: "600" as any,
    },
    actionsRow: {
      flexDirection: "row-reverse",
      gap: 10,
      marginTop: spacing.lg || 16,
    },
    nextBtn: {
      flex: 1,
      backgroundColor: colors.primary?.[500] || "#2563eb",
      borderRadius: radius.md || 10,
      paddingVertical: spacing.md || 12,
      alignItems: "center",
      justifyContent: "center",
    },
    nextBtnText: {
      fontFamily: typography.fontFamily,
      color: colors.white || "#ffffff",
      fontWeight: "700" as any,
      fontSize: 13,
    },
    prevBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.primary?.[500] || "#2563eb",
      backgroundColor: colors.semantic.surface,
      borderRadius: radius.md || 10,
      paddingVertical: spacing.md || 12,
      alignItems: "center",
      justifyContent: "center",
    },
    prevBtnText: {
      fontFamily: typography.fontFamily,
      color: colors.primary?.[500] || "#2563eb",
      fontWeight: "600" as any,
      fontSize: 13,
    },
  });
}