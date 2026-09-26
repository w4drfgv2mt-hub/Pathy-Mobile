import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { typography, spacing, radius } from "../../theme/tokens";
import { useTheme } from "../../theme/ThemeContext";
import { ColorPalette } from "../../theme/palettes";
import { useAuth } from "../../navigation/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>باثي</Text>
      <Text style={styles.subtitle}>لا تبدأ فقط.. استمر</Text>

      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        placeholderTextColor={colors.neutral[400]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        placeholderTextColor={colors.neutral[400]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textAlign="right"
      />

      <Pressable style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>تسجيل الدخول</Text>
      </Pressable>
    </View>
  );
}

function getStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: spacing["2xl"], backgroundColor: colors.semantic.surface },
    logo: { fontFamily: typography.fontFamily, fontWeight: typography.weight.bold as any, fontSize: 36, color: colors.semantic.action, textAlign: "center" },
    subtitle: { fontFamily: typography.fontFamily, fontSize: typography.size.md, color: colors.neutral[500], textAlign: "center", marginBottom: spacing["2xl"] * 2 },
    input: { fontFamily: typography.fontFamily, borderWidth: 1, borderColor: colors.semantic.border, borderRadius: radius.md, padding: spacing.xl, marginBottom: spacing.lg, color: colors.ink },
    button: { backgroundColor: colors.semantic.action, borderRadius: radius.md, padding: spacing.xl, alignItems: "center", marginTop: spacing.md },
    buttonText: { fontFamily: typography.fontFamily, fontWeight: typography.weight.bold as any, color: colors.white, fontSize: typography.size.md },
  });
}
