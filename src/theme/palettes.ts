// لوحتا الألوان: متطابقة 100% مع واجهات تطبيق باثي (فاتح وداكن) مع التخصيصات الجديدة

export const lightColors = {
  primary: {
    50: "#eff6ff",
    100: "#ebf2fd", // خلفية مربعات الأيقونات الفاتحة جداً المشتقة
    400: "#60a5fa", // لون الأيقونات والنقاط الفاتحة
    500: "#397ced", // 397CED لون الأزرار الأساسي
    600: "#0f3e8a", // 0F3E8A الأزرق الداكن الأساسي
    mainDark: "#0f3e8a",
    button: "#397ced",
  },
  secondary: {
    400: "#38bdf8",
    600: "#0284c7",
  },
  navigation: {
    sidebarBg: "#0f3e8a",
    activeIcon: "#ffffff",  // FFFFFF الأيقونة النشطة
    inactiveIcon: "#94a3b8",
    activeText: "#ffffff",
  },
  cardIcons: {
    folderBg: "#ebf2fd",    // لون الباك قراوند في أيقونة الملفات بكارد البرامج
    folderIcon: "#397ced",  // لون أيقونة الملفات
  },
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1", // إطار البطاقات المنقطة (أنشئ مجموعتك)
    400: "#94a3b8", // النصوص الباهتة والأسهم الخفيفة
    500: "#64748b", // النصوص الفرعية والوصف
    600: "#0f3e8a", // العناوين الرئيسية بالأزرق الداكن
  },
  // ألوان الحالات (أنت منضم للسبرينت / مقدم من باثي)
  success: {
    50: "#f0fdf4",
    500: "#16a34a",
    600: "#15803d",
  },
  danger: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fca5a5", // إطار زر تسجيل الخروج الوردي الخفيف
    500: "#ef4444", // نص وأيقونة تسجيل الخروج
    600: "#dc2626",
    700: "#b91c1c",
  },
  semantic: {
    surface: "#ffffff",         // خلفية الكروت البيضاء النقية
    surfaceMuted: "#f0f4f9",    // الخلفية العامة الثلجية للشاشة
    border: "#edf2f7",          // حدود البطاقات الناعمة جداً
    borderDashed: "#cbd5e1",    // حدود البطاقات المنقطة
    brandText: "#0f3e8a",
    action: "#397ced",          // لون التفاعل والأزرار 397CED
    actionButton: "#397ced",    // لون أزرار العمليات
    actionDeep: "#0f3e8a",
    actionSoft: "#ebf2fd",      // خلفية أيقونة الملفات والبطاقات الناعمة
  },
  avatar: {
    bg: "#65a30d",              // أخضر الأفاتار الخاص بحساب Lamar
    text: "#ffffff",
  },
  white: "#ffffff",
  ink: "#0f3e8a",               // لون النصوص الأساسي الداكن
};

export const darkColors = {
  primary: {
    50: "#172554",
    100: "#1e3a8a",
    400: "#60a5fa",
    500: "#397ced",
    600: "#0f3e8a",
    mainDark: "#0f3e8a",
    button: "#397ced",
  },
  secondary: {
    400: "#38bdf8",
    600: "#0284c7",
  },
  navigation: {
    sidebarBg: "#0b1930",
    activeIcon: "#ffffff",
    inactiveIcon: "#64748b",
    activeText: "#ffffff",
  },
  cardIcons: {
    folderBg: "#172554",
    folderIcon: "#60a5fa",
  },
  neutral: {
    50: "#0b0f17",
    100: "#111827",
    200: "#1f2937",
    300: "#374151",
    400: "#6b7280",
    500: "#9ca3af",
    600: "#f9fafb",
  },
  success: {
    50: "#052e16",
    500: "#22c55e",
    600: "#16a34a",
  },
  danger: {
    50: "#450a0a",
    100: "#7f1d1d",
    200: "#991b1b",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
  },
  semantic: {
    surface: "#111827",
    surfaceMuted: "#030712",
    border: "#1f2937",
    borderDashed: "#374151",
    brandText: "#60a5fa",
    action: "#397ced",
    actionButton: "#397ced",
    actionDeep: "#60a5fa",
    actionSoft: "#172554",
  },
  avatar: {
    bg: "#65a30d",
    text: "#ffffff",
  },
  white: "#ffffff",
  ink: "#f9fafb",
};

export type ColorPalette = typeof lightColors;