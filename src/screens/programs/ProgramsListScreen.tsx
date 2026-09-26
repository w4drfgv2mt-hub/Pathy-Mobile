import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { typography } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { programs } from "../../data/mockPrograms";
import ProgramCard from "../../components/ProgramCard";

export default function ProgramsListScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>البرامج التعليمية</Text>
          <Text style={styles.subtitle}>
            استكشف البرامج المتاحة، وتعرف على تفاصيل كل برنامج قبل ما تبدأ
          </Text>
        </View>

        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onPressDetails={() =>
              navigation.navigate("ProgramDetails", { programId: program.id })
            }
            onPressTelegram={() => {}}
          />
        ))}

        <View style={styles.dashedCard}>
          <View style={styles.plusCircle}>
            <Ionicons name="add" size={18} color={colors.neutral[400]} />
          </View>
          <Text style={styles.dashedTitle}>برامج قادمة قريبًا</Text>
          <Text style={styles.dashedSubtitle}>
            نشتغل على برامج جديدة من جهات تعليمية مختلفة لأجلك!
          </Text>
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
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 48,
    },
    header: {
      alignItems: "flex-end",
      marginBottom: 20,
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
    dashedCard: {
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: colors.semantic.borderDashed,
      borderRadius: 16,
      paddingVertical: 36,
      paddingHorizontal: 20,
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
      textAlign: "center",
    },
  });
}