import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { typography, spacing, radius } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { sprints as initialSprints, Sprint } from "../../data/mockLearning";
import SprintListCard from "../../components/SprintListCard";
import CreateSprintModal from "../../components/CreateSprintModal";

const SECTIONS: { key: "soon" | "available" | "ongoing"; title: string }[] = [
  { key: "soon", title: "يبدأ قريبًا" },
  { key: "available", title: "متاح لك" },
  { key: "ongoing", title: "جاري الآن" },
];

export default function LessonsListScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [sprintList, setSprintList] = useState<Sprint[]>(initialSprints);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "git">("all");

  const handleCreateSprint = (data: {
    mode: "solo" | "group";
    programName: string;
    lessons: { label: string; count: number }[];
    startDate: string;
  }) => {
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newSprint: Sprint = {
      id: `sprint-${Date.now()}`,
      section: "available",
      program: data.programName,
      groupName: `مجموعة ${randomCode}-U`,
      visibilityLabel: data.mode === "solo" ? "سبرينت فردي" : "مفتوح للجميع",
      ctaLabel: "عرض السبرينت",
      timeLeftLabel: `يبدأ ${data.startDate}`,
      badge: {
        label: "جديد",
        variant: "new",
      },
      lessons: data.lessons,
      moreCount: 0,
      members: [
        {
          id: "me",
          initial: "L",
          color: colors.avatar?.bg || "#65a30d",
        },
      ],
    };

    setSprintList((prev) => [newSprint, ...prev]);
  };

  const filteredSprints =
    activeFilter === "all"
      ? sprintList
      : sprintList.filter((s) => s.program.toLowerCase().includes("git"));

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* الترويسة وزر أنشئ */}
        <View style={styles.headerRow}>
          <Pressable
            style={styles.addSprintBtn}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={16} color={colors.primary.button} />
            <Text style={styles.addSprintText}>أنشئ</Text>
          </Pressable>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>سبرينتات التعلم</Text>
            <Text style={styles.subtitle}>
              مجموعات صغيرة تتعلّم معها بجدول ثابت، وتلتزمون مع بعض للنهاية.
            </Text>
          </View>
        </View>

        {/* فلاتر التبويب */}
        <View style={styles.filtersRow}>
          <Pressable
            style={[
              styles.filterPill,
              activeFilter === "all" && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "all" && styles.filterTextActive,
              ]}
            >
              الكل
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterPill,
              activeFilter === "git" && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter("git")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "git" && styles.filterTextActive,
              ]}
            >
              برنامج Git & GitHub
            </Text>
          </Pressable>
        </View>

        {/* أقسام السبرينتات */}
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

              {key === "available" && (
                <Pressable
                  style={styles.createCard}
                  onPress={() => setModalVisible(true)}
                >
                  <View style={styles.plusIconCircle}>
                    <Ionicons
                      name="add"
                      size={20}
                      color={colors.primary.button}
                    />
                  </View>
                  <Text style={styles.createTitle}>أنشئ مجموعتك</Text>
                  <Text style={styles.createText}>
                    اختر الدروس والموعد، وادعُ من تحب.
                  </Text>
                </Pressable>
              )}

              {items.map((sprint) => (
                <SprintListCard
                  key={sprint.id}
                  sprint={sprint}
                  onPress={() =>
                    navigation.navigate("Lesson", { lessonId: sprint.id })
                  }
                />
              ))}
            </View>
          );
        })}
      </ScrollView>

      {/* المودال */}
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
      paddingHorizontal: spacing.xl || 18,
      paddingTop: spacing.xl || 20,
      paddingBottom: spacing["3xl"] || 40,
      backgroundColor: colors.semantic.surfaceMuted,
      flexGrow: 1,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: spacing.lg || 16,
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
      lineHeight: 17,
    },
    addSprintBtn: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 4,
      borderWidth: 1,
      borderColor: colors.semantic.border,
      backgroundColor: colors.semantic.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radius.full || 9999,
      marginTop: 2,
    },
    addSprintText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      fontWeight: "700" as any,
      color: colors.primary.button,
    },
    filtersRow: {
      flexDirection: "row-reverse",
      gap: spacing.sm || 8,
      marginBottom: spacing.lg || 16,
    },
    filterPill: {
      borderWidth: 1,
      borderColor: colors.semantic.border,
      borderRadius: radius.md || 10,
      paddingHorizontal: 14,
      paddingVertical: 8,
      backgroundColor: colors.semantic.surface,
    },
    filterPillActive: {
      borderColor: colors.primary.button,
      backgroundColor: colors.semantic.surface,
    },
    filterText: {
      fontFamily: typography.fontFamily,
      fontSize: 12,
      color: colors.neutral[500],
    },
    filterTextActive: {
      color: colors.ink,
      fontWeight: "700" as any,
    },
    sectionBlock: {
      marginTop: spacing.md || 12,
    },
    sectionHeaderRow: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 6,
      marginBottom: spacing.sm || 10,
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
      fontFamily: typography.fontFamily,
      fontSize: 10,
      color: colors.neutral[600],
      fontWeight: "700" as any,
    },
    createCard: {
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: colors.semantic.borderDashed,
      borderRadius: radius.lg || 16,
      paddingVertical: spacing.xl || 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.semantic.surface,
      marginBottom: spacing.md || 14,
    },
    plusIconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.semantic.borderDashed,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 6,
    },
    createTitle: {
      fontFamily: typography.fontFamily,
      fontSize: 13,
      fontWeight: "bold",
      color: colors.ink,
    },
    createText: {
      fontFamily: typography.fontFamily,
      fontSize: 11,
      color: colors.neutral[400],
      marginTop: 2,
    },
  });
}