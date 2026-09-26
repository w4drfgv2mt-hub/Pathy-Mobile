import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { typography, spacing } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import SprintListCard, { SprintItem } from "../../components/SprintListCard";
import CreateSprintModal from "../../components/CreateSprintModal";

const INITIAL_SPRINTS: SprintItem[] = [
  {
    id: "sprint-1",
    section: "soon",
    program: "برنامج Git & GitHub",
    groupName: "مجموعة 405-U",
    visibilityLabel: "مفتوح للجميع",
    badge: {
      label: "أنت منضم للسبرينت",
      variant: "joined",
    },
    lessons: [
      { label: "ليش أحتاج أتعلم Git؟", count: 2 },
      { label: "تحكم في جهازك", count: 1 },
      { label: "جهز بيئة العمل", count: 3 },
    ],
    moreCount: 5,
    timeLeftLabel: "متبقي 13 ساعة",
    members: [{ id: "m1", initial: "L", color: "#65a30d" }],
    ctaLabel: "عرض المجموعة",
  },
  {
    id: "sprint-2",
    section: "available",
    program: "برنامج Git & GitHub",
    groupName: "مجموعة 406-U",
    visibilityLabel: "سبرينت فردي",
    badge: {
      label: "عدد الأعضاء كامل",
      variant: "full",
    },
    lessons: [
      { label: "ليش أحتاج أتعلم Git؟", count: 2 },
      { label: "تحكم في جهازك", count: 1 },
      { label: "جهز بيئة العمل", count: 3 },
    ],
    moreCount: 5,
    timeLeftLabel: "متبقي يومين",
    members: [{ id: "m2", initial: "U", color: "#0f172a" }],
    ctaLabel: "عرض السبرينت",
  },
];

const SECTIONS = [
  { key: "soon", title: "يبدأ قريبًا" },
  { key: "available", title: "متاح لك" },
  { key: "ongoing", title: "جاري الآن" },
];

export default function LessonsListScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [sprintList, setSprintList] = useState<SprintItem[]>(INITIAL_SPRINTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "git">("all");

  const handleCreateSprint = (data: {
    mode: "solo" | "group";
    programName: string;
    lessons: { label: string; count: number }[];
    startDate: string;
  }) => {
    const randomCode = Math.floor(407 + Math.random() * 90);
    const newSprint: SprintItem = {
      id: `sprint-${Date.now()}`,
      section: "available",
      program: data.programName,
      groupName: `مجموعة ${randomCode}-U`,
      visibilityLabel: data.mode === "solo" ? "سبرينت فردي" : "مفتوح للجميع",
      badge: {
        label: "أنت منضم للسبرينت",
        variant: "joined",
      },
      lessons: data.lessons.length > 0 ? data.lessons : [{ label: "ليش أحتاج أتعلم Git؟", count: 1 }],
      timeLeftLabel: data.startDate || "متبقي يومين",
      members: [{ id: "me", initial: "L", color: colors.avatar?.bg || "#65a30d" }],
      ctaLabel: "عرض المجموعة",
    };

    setSprintList((prev) => [newSprint, ...prev]);
  };

  const filteredSprints =
    activeFilter === "all"
      ? sprintList
      : sprintList.filter((s) => s.program.includes("Git"));

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.headerRow}>
          <Pressable
            style={styles.addSprintBtn}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={14} color={colors.ink} />
            <Text style={styles.addSprintText}>أنشئ</Text>
          </Pressable>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>سبرينتات التعلم</Text>
            <Text style={styles.subtitle}>
              مجموعات صغيرة تتعلّم معها بجدول ثابت، وتلتزمون مع بعض للنهاية.
            </Text>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <Pressable
            style={[
              styles.filterTab,
              activeFilter === "all" && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === "all" && styles.filterTabTextActive,
              ]}
            >
              الكل
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterTab,
              activeFilter === "git" && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter("git")}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === "git" && styles.filterTabTextActive,
              ]}
            >
              برنامج Git & GitHub
            </Text>
          </Pressable>
        </View>

        {SECTIONS.map(({ key, title }) => {
          const items = filteredSprints.filter((s) => s.section === key);

          return (
            <View key={key} style={styles.sectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.counterBadge}>
                  <Text style={styles.counterText}>{items.length}</Text>
                </View>
                <Text style={styles.sectionTitle}>{title}</Text>
              </View>

              {items.map((sprint) => (
                <SprintListCard
                  key={sprint.id}
                  sprint={sprint}
                  onPress={() =>
                    navigation.navigate("Lesson", { lessonId: sprint.id })
                  }
                />
              ))}

              {key === "available" && (
                <Pressable
                  style={styles.dashedCard}
                  onPress={() => setModalVisible(true)}
                >
                  <View style={styles.plusCircle}>
                    <Ionicons name="add" size={18} color={colors.semantic.action} />
                  </View>
                  <Text style={styles.dashedTitle}>أنشئ مجموعتك</Text>
                  <Text style={styles.dashedSubtitle}>
                    اختر الدروس والموعد، وادعُ من تحب
                  </Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>

      <CreateSprintModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateSprint}
      />
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
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 48,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    titleContainer: {
      alignItems: "flex-end",
      flex: 1,
    },
    title: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 22,
      color: colors.ink,
      marginBottom: 4,
    },
    subtitle: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[500],
      textAlign: "right",
      lineHeight: 16,
    },
    addSprintBtn: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.semantic.surface,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    addSprintText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      fontWeight: "700" as any,
      color: colors.ink,
    },
    filtersContainer: {
      flexDirection: "row-reverse",
      gap: 10,
      marginBottom: 24,
    },
    filterTab: {
      flex: 1,
      backgroundColor: colors.semantic.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    filterTabActive: {
      borderColor: colors.primary.button,
    },
    filterTabText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      color: colors.neutral[500],
    },
    filterTabTextActive: {
      color: colors.ink,
      fontWeight: "700" as any,
    },
    sectionBlock: {
      marginBottom: 16,
    },
    sectionHeaderRow: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 6,
      marginBottom: 12,
    },
    sectionTitle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
      fontSize: 14,
      color: colors.ink,
    },
    counterBadge: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: colors.neutral[200],
      alignItems: "center",
      justifyContent: "center",
    },
    counterText: {
      fontSize: 10,
      color: colors.neutral[600],
      fontWeight: "700",
    },
    dashedCard: {
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: colors.semantic.borderDashed,
      borderRadius: 16,
      paddingVertical: 32,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.semantic.surface,
      marginBottom: 16,
    },
    plusCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.semantic.borderDashed,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    dashedTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "bold",
      color: colors.ink,
      marginBottom: 4,
    },
    dashedSubtitle: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[400],
    },
  });
}