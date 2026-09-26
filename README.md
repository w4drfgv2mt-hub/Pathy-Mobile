# Pathy — هيكل التنقل (Navigation Scaffold)

هذا أول جزء من تحويل موقع pathy.live لتطبيق React Native، حسب الخطة المعتمدة:
Expo + React Navigation، تسجيل دخول بإيميل/باسورد فقط، وتاب بار سفلي بـ 4 تبويبات.

## التشغيل

```bash
npm install
npx expo start
```
يفتح QR code تقدر تفتحه بتطبيق Expo Go على جوالك، أو تشغّل simulator.

## البنية

```
App.tsx                          نقطة الدخول + فرض RTL
src/
  theme/tokens.ts                ألوان وخطوط ومسافات — مسحوبة من متغيّرات فيجما فعلياً
  navigation/
    AuthContext.tsx              حالة الدخول المؤقتة (تُستبدل بمنطق API لاحقاً)
    RootNavigator.tsx             يبدّل بين Auth ↔ Main
    AuthNavigator.tsx              ستاك تسجيل الدخول
    MainTabNavigator.tsx           التاب بار السفلي (4 تبويبات)
    HomeStackNavigator.tsx         الرئيسية → تفاصيل السبرينت
    ProgramsStackNavigator.tsx     البرامج → تفاصيل برنامج
    LearningStackNavigator.tsx     تعلمي → الدرس
    AccountStackNavigator.tsx      حسابي (مجمّع) → الإعدادات
  screens/                        شاشات Placeholder لكل مسار أعلاه
  components/ScreenPlaceholder.tsx  قالب موحّد للشاشات الفارغة
```

## جاهز الآن
- التنقل الكامل يشتغل: تسجيل دخول (وهمي — أي إيميل/باسورد يدخّلك) ← تاب بار 4 تبويبات ← كل تبويب فيه ستاك داخلي.
- الألوان والمسافات والزوايا مأخوذة فعلياً من متغيّرات Figma (`src/theme/tokens.ts`).

## ناقص / يحتاج قرار لاحقاً
1. **الخط:** لازم نضيف ملفات `Baloo Bhaijaan 2` (.ttf) الفعلية في `assets/fonts/` — حالياً يستخدم خط النظام مؤقتاً.
2. **أيقونات التاب بار:** حالياً من مكتبة Ionicons عامة — تُستبدل بأيقونات فيجما الفعلية (نصدّرها كـ SVG/PNG من قسم "01 · التنقّل").
3. **تسجيل الدخول الحقيقي:** ربط `AuthContext` بـ API فعلي بدل التفعيل المباشر.
4. **محتوى الشاشات:** كل الشاشات حالياً Placeholder فقط — التالي هو تعبئتها بالمكونات الفعلية من الديزاين سستم (بطاقات، عملة النقاط، حالات الشاشة...).
5. **شاشة حسابي:** لسا مجمّعة (بروفايل + أعضاء + إعدادات) — بننقاش فصلها بعدين.
