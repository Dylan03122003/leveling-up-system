import { AppContext, MySystemT } from "@/contexts/AppContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { calculateTaskXP } from "@/lib/calculateTaskXP";
import { TaskStatusT, TaskT } from "@/types";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [mySytem, setMySystem] = useLocalStorage<MySystemT>("my-system", {
    xp: 0,
    xpEarnedToday: 0,
    currentTasks: [],
  });

  const addTask = (task: TaskT) => {
    setMySystem({
      ...mySytem,
      currentTasks: [...mySytem.currentTasks, task],
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

  return (
    <AppContext.Provider
      value={{ mySytem, addTask, markAsDone, clearAllTasks, deleteTask }}
    >
      {children}
    </AppContext.Provider>
  );
};
