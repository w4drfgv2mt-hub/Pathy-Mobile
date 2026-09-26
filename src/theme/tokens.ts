// ملاحظة: الألوان انتقلت لـ ThemeContext (useTheme) لدعم الوضع الداكن/الفاتح.
// هذا الملف الآن فيه فقط القيم الثابتة اللي ما تتغيّر بين الوضعين.

export const typography = {
  fontFamily: "Baloo Bhaijaan 2",
  size: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    "2xl": 20,
    "3xl": 24,
  },
  weight: {
    regular: "400",
    medium: "500",
    bold: "700",
  } as const,
};

export const spacing = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 40,
};

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadows = {
  xs: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  md: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
};