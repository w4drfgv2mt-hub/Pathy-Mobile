// بيانات وهمية مطابقة لسكرين شوت الموقع الفعلي — تُستبدل لاحقاً بربط API حقيقي.

export type Member = {
  id: string;
  initial: string;
  color: string; // خلفية الأفاتار
};

export type CurrentSprint = {
  isJoined: boolean;
  startsInLabel: string; // "يبدأ بعد 13 ساعة"
  groupName: string; // "مجموعة U-405"
  programName: string; // "برنامج Git & GitHub"
  opensAtLabel: string; // "تفتح الدروس السبت، 26 سبتمبر"
  maxMembers: number;
  members: Member[]; // الأعضاء المنضمين فعلياً فقط
};

export const userFirstName = "Lamar";

export const currentSprint: CurrentSprint = {
  isJoined: true,
  startsInLabel: "يبدأ بعد 13 ساعة",
  groupName: "مجموعة U-405",
  programName: "برنامج Git & GitHub",
  opensAtLabel: "تفتح الدروس السبت، 26 سبتمبر",
  maxMembers: 4,
  members: [{ id: "me", initial: "L", color: "#7ba05b" }],
};
