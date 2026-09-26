import { ColorPalette } from "../theme/palettes";
import { typography } from "../theme/tokens";

// دالة بدل كائن ثابت — عشان تاخذ ألوان الوضع الحالي (فاتح/داكن) كل مرة.
export function getStackScreenOptions(colors: ColorPalette) {
  return {
    headerStyle: { backgroundColor: colors.semantic.surface },
    headerTintColor: colors.ink,
    headerTitleStyle: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.bold as any,
    },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.semantic.surfaceMuted },
  };
}
