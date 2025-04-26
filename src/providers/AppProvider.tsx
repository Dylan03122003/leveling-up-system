import { AppContext, MySystemT } from "@/contexts/AppContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateTaskXP } from "@/lib/calculateTaskXP";
import { RecentTaskT, TaskStatusT, TaskT } from "@/types";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [mySytem, setMySystem] = useLocalStorage<MySystemT>("my-system", {
    xp: 0,
    xpEarnedToday: 0,
    currentTasks: [],
    recentTasks: [],
    dailyQuests: [],
  });

  const completeAllTasksOfDailyQuest = (questId: number) => {
    setMySystem((prev) => {
      const quest = prev.dailyQuests.find((q) => q.id === questId);
      if (!quest) {
        console.warn(`Daily quest ${questId} not found`);
        return prev;
      }

      const updatedDailyQuests = prev.dailyQuests.map((q) =>
        q.id === questId
          ? {
              ...q,
              tasks: q.tasks.map((t) => ({ ...t, status: "done" as const })),
            }
          : q
      );

      return {
        ...prev,
        dailyQuests: updatedDailyQuests,
      };
    });
  };

  const resetAllTasksOfAllDailyQuests = () => {
    const updatedQuests = mySytem.dailyQuests.map((quest) => {
      const updatedTasks = quest.tasks.map((task) => {
        return { ...task, status: "todo" as TaskStatusT };
      });
      return { ...quest, tasks: updatedTasks };
    });

    setMySystem({
      ...mySytem,
      dailyQuests: updatedQuests,
    });
  };

  const deleteTaskOfDailyQuest = (questId: number, taskId: number) => {
    const updatedQuests = mySytem.dailyQuests.map((quest) => {
      if (quest.id === questId) {
        const updatedTasks = quest.tasks.filter((task) => task.id !== taskId);
        return { ...quest, tasks: updatedTasks };
      }
      return quest;
    });

    setMySystem({
      ...mySytem,
      dailyQuests: updatedQuests,
    });
  };
  const markDailyQuestTaskAsDone = (questId: number, taskId: number) => {
    const updatedQuests = mySytem.dailyQuests.map((quest) => {
      if (quest.id === questId) {
        const updatedTasks = quest.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, status: "done" as TaskStatusT };
          }
          return task;
        });
        return { ...quest, tasks: updatedTasks };
      }
      return quest;
    });

    setMySystem({
      ...mySytem,
      dailyQuests: updatedQuests,
    });
  };

  const renameDailyQuest = (questId: number, newTitle: string) => {
    const updatedQuests = mySytem.dailyQuests.map((quest) => {
      if (quest.id === questId) {
        return { ...quest, title: newTitle };
      }
      return quest;
    });

    setMySystem({
      ...mySytem,
      dailyQuests: updatedQuests,
    });
  };

  const addTaskToDailyQuest = (questId: number, task: TaskT) => {
    const updatedQuests = mySytem.dailyQuests.map((quest) => {
      if (quest.id === questId) {
        return { ...quest, tasks: [...quest.tasks, task] };
      }
      return quest;
    });

    setMySystem({
      ...mySytem,
      dailyQuests: updatedQuests,
    });
  };

  const addDailyQuest = (title: string) => {
    const newQuest = {
      id: Date.now(),
      title,
      tasks: [],
    };

    setMySystem({
      ...mySytem,
      dailyQuests: [...mySytem.dailyQuests, newQuest],
    });
  };

  const addTask = (task: TaskT) => {
    setMySystem({
      ...mySytem,
      currentTasks: [...mySytem.currentTasks, task],
    });
  };

  const addMultipleTasks = (tasks: TaskT[]) => {
    setMySystem({
      ...mySytem,
      currentTasks: [...mySytem.currentTasks, ...tasks],
    });
  };

  const addRecentTask = (task: RecentTaskT) => {
    setMySystem({
      ...mySytem,
      recentTasks: [...mySytem.recentTasks, task],
    });
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = mySytem.currentTasks.filter(
      (task) => task.id !== taskId
    );

    setMySystem({
      ...mySytem,
      currentTasks: updatedTasks,
    });
  };

  const deleteRecentTask = (taskId: number) => {
    const updatedTasks = mySytem.recentTasks.filter(
      (task) => task.id !== taskId
    );

    setMySystem({
      ...mySytem,
      recentTasks: updatedTasks,
    });
  };

  const clearAllTasks = () => {
    setMySystem({
      ...mySytem,
      currentTasks: [],
      xpEarnedToday: 0,
    });
  };

  const markAsDone = (taskId: number) => {
    const task = mySytem.currentTasks.find((task) => task.id === taskId);

    if (!task) {
      alert("Task not found");
      return;
    }

    if (task.status === "done") {
      alert("Task already done");
      return;
    }

    const updatedTasks = mySytem.currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: "done" as TaskStatusT };
      }
      return task;
    });

    const taskXP = calculateTaskXP(task.effort, task.impact, task.difficulty);

    setMySystem({
      ...mySytem,
      xp: taskXP + mySytem.xp,
      xpEarnedToday: taskXP + mySytem.xpEarnedToday,
      currentTasks: updatedTasks,
    });
  };

  const updateTask = (task: TaskT) => {
    const updatedTasks = mySytem.currentTasks.map((t) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });

    setMySystem({
      ...mySytem,
      currentTasks: updatedTasks,
    });
  };

  return (
    <AppContext.Provider
      value={{
        completeAllTasksOfDailyQuest,
        resetAllTasksOfAllDailyQuests,
        deleteTaskOfDailyQuest,
        markDailyQuestTaskAsDone,
        renameDailyQuest,
        addTaskToDailyQuest,
        addDailyQuest,
        mySytem,
        addTask,
        addMultipleTasks,
        addRecentTask,
        markAsDone,
        clearAllTasks,
        deleteTask,
        deleteRecentTask,
        updateTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
