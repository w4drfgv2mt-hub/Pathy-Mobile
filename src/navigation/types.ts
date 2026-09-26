// أنواع التنقل — كل ستاك مفصول عشان يسهل نضيف شاشات لاحقاً بدون ما نلخبط الباقي

export type AuthStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  SprintDetails: { sprintId: string };
};

export type ProgramsStackParamList = {
  ProgramsList: undefined;
  ProgramDetails: { programId: string };
};

export type LearningStackParamList = {
  LessonsList: undefined;
  Lesson: { lessonId: string };
};

export type AccountStackParamList = {
  Account: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ProgramsTab: undefined;
  LearningTab: undefined;
  AccountTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
