import { useState } from "react";
import TaskForm from "./components/TaskForm";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { useAppContext } from "./hooks/useAppContext";
import { calculateLevel } from "./lib/calculateLevel";
import TaskList from "./components/TaskList";
import { getLevelProgress } from "./lib/getLevelProgress";
import { Progress } from "./components/ui/progress";
import { calculateXPneededForNextLevel } from "./lib/calculateXPneededForNextLevel";

function App() {
  const { mySytem, addTask } = useAppContext();
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const levelProgress = getLevelProgress(mySytem.xp);
  const xpNeededToLevelUp = calculateXPneededForNextLevel(mySytem.xp);

  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen p-10">
        <div className="flex w-[600px] justify-between">
          <div className="flex gap-4">
            <div className="bg-blue-100 p-2 rounded-md">
              <p className="text-center">XP Earned Today</p>
              <p className="text-center m-5 text-4xl">
                {mySytem.xpEarnedToday}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <p className="text-center">Current XP</p>
              <p className="text-center m-5 text-4xl">{mySytem.xp}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <p className="text-center">Current Level</p>
              <p className="text-center m-5 text-4xl">
                {calculateLevel(mySytem.xp)}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpenCreateTask(true);
            }}
          >
            Create task
          </Button>
        </div>

        <div className="mt-5 w-[600px]">
          <div className="flex justify-between items-center">
            <p>You need {xpNeededToLevelUp} XP to level up</p>
            <p>{levelProgress.toFixed(2)}%</p>
          </div>
          <Progress value={levelProgress} className="mt-1.5" />
        </div>

        <div className="mt-10">
          <TaskList tasks={mySytem.currentTasks} />
        </div>
      </div>

      <Dialog
        open={openCreateTask}
        onOpenChange={(isOpen) => {
          setOpenCreateTask(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              You're doing great! Keep it up!
            </DialogDescription>
          </DialogHeader>

          <TaskForm
            onSubmit={(task) => {
              addTask({
                id: Date.now(),
                ...task,
                status: "todo",
              });
              setOpenCreateTask(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
