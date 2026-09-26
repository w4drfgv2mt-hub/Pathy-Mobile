export type Sprint = {
  id: string;
  section: "soon" | "available" | "ongoing";
  program: string;
  groupName: string;
  visibilityLabel: string;
  lessons: {
    count: number;
    label: string;
  }[];
  moreCount?: number;
  timeLeftLabel: string;
  members: {
    id: string;
    initial: string;
    color: string;
  }[];
  badge?: {
    label: string;
    variant: string;
  };
  ctaLabel: string;
};

export const sprints: Sprint[] = [
  {
    id: "u-405",
    section: "ongoing",
    program: "Git & GitHub",
    groupName: "مجموعة GitHub",
    visibilityLabel: "مجموعة خاصة",
    lessons: [
      { count: 4, label: "دروس" },
      { count: 2, label: "تمارين" },
    ],
    moreCount: 3,
    timeLeftLabel: "متبقي 5 أيام",
    members: [
      { id: "1", initial: "ل", color: "#7BAE7F" },
      { id: "2", initial: "م", color: "#8FA7C4" },
      { id: "3", initial: "س", color: "#C49A6C" },
    ],
    ctaLabel: "عرض السبرينت",
  },
  {
    id: "u-406",
    section: "available",
    program: "Frontend",
    groupName: "أساسيات تطوير الواجهات",
    visibilityLabel: "متاح لك",
    lessons: [
      { count: 6, label: "دروس" },
      { count: 3, label: "تمارين" },
    ],
    timeLeftLabel: "يبدأ خلال يومين",
    members: [
      { id: "4", initial: "ن", color: "#9B8FC4" },
      { id: "5", initial: "ر", color: "#7FA9A3" },
    ],
    badge: {
      label: "متاح",
      variant: "available",
    },
    ctaLabel: "انضمام",
  },
  {
    id: "u-407",
    section: "soon",
    program: "React Native",
    groupName: "تطوير تطبيقات الجوال",
    visibilityLabel: "يبدأ قريبًا",
    lessons: [
      { count: 5, label: "دروس" },
      { count: 2, label: "مشاريع" },
    ],
    timeLeftLabel: "يبدأ خلال أسبوع",
    members: [
      { id: "6", initial: "ع", color: "#B38B8B" },
      { id: "7", initial: "ج", color: "#7E9EBC" },
    ],
    badge: {
      label: "قريبًا",
      variant: "soon",
    },
    ctaLabel: "التفاصيل",
  },
];