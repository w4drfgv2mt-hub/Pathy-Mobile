
export type Program = {
  id: string;
  title: string;
  description: string;
  category: string;
  totalLessons: number;
  lessonsCount: number;
  completedLessons: number;
  provider: string;
  hoursLabel: string;
  level: string;
  inSprint: boolean;
};

export const programs: Program[] = [
  

  {
    id: "program-1",
    title: "Git و GitHub",
    description: "تعلّم إدارة الأكواد والعمل على المشاريع باستخدام Git و GitHub.",
    category: "Tools",
    totalLessons: 8,
    lessonsCount: 8,
    completedLessons: 2,
    provider: "باثي",
    hoursLabel: "6 ساعات",
    level: "مبتدئ",
    inSprint: true,
  },
];