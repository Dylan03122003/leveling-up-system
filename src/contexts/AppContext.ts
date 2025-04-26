import { DailyQuestT, RecentTaskT, TaskT } from "@/types";
import { createContext } from "react";

export type MySystemT = {
  xp: number;
  xpEarnedToday: number;
  currentTasks: TaskT[];
  recentTasks: RecentTaskT[];
  dailyQuests: DailyQuestT[];
};

export type AppContextType = {
  mySytem: MySystemT;
  addTask: (task: TaskT) => void;
  addMultipleTasks: (tasks: TaskT[]) => void;
  addRecentTask: (task: RecentTaskT) => void;
  updateTask: (task: TaskT) => void;
  markAsDone: (taskId: number) => void;
  clearAllTasks: () => void;
  deleteTask: (taskId: number) => void;
  deleteRecentTask: (taskId: number) => void;
  addDailyQuest: (questTitle: string) => void;
  addTaskToDailyQuest: (questId: number, task: TaskT) => void;
  renameDailyQuest: (questId: number, questTitle: string) => void;
  markDailyQuestTaskAsDone: (questId: number, taskId: number) => void;
  deleteTaskOfDailyQuest: (questId: number, taskId: number) => void;
  resetAllTasksOfAllDailyQuests: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);
