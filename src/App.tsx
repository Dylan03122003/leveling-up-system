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
import { calculateXPneededForNextLevel } from "./lib/calculateXPneededForNextLevel";
import RecentTaskList from "./components/RecentTaskList";
import DailyQuestList from "./components/DailyQuestList";

function App() {
  const { mySytem, addTask, addRecentTask } = useAppContext();
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openRecentTasks, setOpenRecentTasks] = useState(false);
  const [openDailyQuests, setOpenDailyQuests] = useState(false);
  const levelProgress = getLevelProgress(mySytem.xp);
  const xpNeededToLevelUp = calculateXPneededForNextLevel(mySytem.xp);

  return (
    <>
      <div className="min-h-[150vh] bg-gradient-to-b from-indigo-50 to-blue-50 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">
              Adventure Journal
            </h1>
            <p className="text-indigo-700 opacity-75">
              Complete quests, earn XP, level up your skills
            </p>
          </header>

          {/* Main Stats & Actions */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 flex-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all hover:shadow-lg">
                <div className="bg-indigo-600 p-2">
                  <p className="text-center text-xs font-medium uppercase tracking-wide text-indigo-100">
                    XP Today
                  </p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-indigo-700">
                    {mySytem.xpEarnedToday}
                  </p>
                  <p className="text-xs text-indigo-500 mt-1">Points earned</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all hover:shadow-lg">
                <div className="bg-purple-600 p-2">
                  <p className="text-center text-xs font-medium uppercase tracking-wide text-purple-100">
                    Total XP
                  </p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-purple-700">
                    {mySytem.xp}
                  </p>
                  <p className="text-xs text-purple-500 mt-1">
                    Points accumulated
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all hover:shadow-lg">
                <div className="bg-blue-600 p-2">
                  <p className="text-center text-xs font-medium uppercase tracking-wide text-blue-100">
                    Level
                  </p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-blue-700">
                    {calculateLevel(mySytem.xp)}
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Current rank</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex md:flex-col justify-between gap-4 md:w-48">
              <Button
                onClick={() => {
                  setOpenCreateTask(true);
                }}
                className="flex-1 md:flex-none md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                New Quest
              </Button>

              <Button
                onClick={() => {
                  setOpenRecentTasks(true);
                }}
                className="flex-1 md:flex-none md:h-16 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-medium shadow-sm hover:shadow transition-all"
                variant="outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Past Quests
              </Button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-indigo-100">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-lg font-semibold text-indigo-900">
                  Level Progress
                </h2>
                <p className="text-indigo-600 text-sm">
                  You need{" "}
                  <span className="font-medium">{xpNeededToLevelUp} XP</span> to
                  reach level {calculateLevel(mySytem.xp) + 1}
                </p>
              </div>
              <div className="bg-indigo-100 px-4 py-2 rounded-full">
                <p className="text-indigo-700 font-bold">
                  {levelProgress.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="h-4 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-indigo-400">
              <p>Level {calculateLevel(mySytem.xp)}</p>
              <p>Level {calculateLevel(mySytem.xp) + 1}</p>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-indigo-100">
            <TaskList tasks={mySytem.currentTasks} />
          </div>

          <div className="mt-4 bg-white rounded-xl shadow-md p-6 border border-indigo-100">
            <DailyQuestList />
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center text-indigo-400 text-sm">
            <p>Continue your journey and level up your skills!</p>
          </footer>
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

      <Dialog
        open={openRecentTasks}
        onOpenChange={(isOpen) => {
          setOpenRecentTasks(isOpen);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Recent tasks</DialogTitle>
            <DialogDescription>
              You're doing great! Keep it up!
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-4">
            <RecentTaskList tasks={mySytem.recentTasks} />
            <div className="w-[50%] border-t mt-4 pt-4 border-gray-400">
              <TaskForm
                onSubmit={(task) => {
                  addRecentTask({
                    id: Date.now(),
                    name: task.name,
                    difficulty: task.difficulty,
                    effort: task.effort,
                    impact: task.impact,
                  });
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDailyQuests}
        onOpenChange={(isOpen) => {
          setOpenDailyQuests(isOpen);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Daily Quests</DialogTitle>
            <DialogDescription>
              You're doing great! Keep it up!
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-4"></div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
