import { DailyQuestT } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import TaskForm from "./TaskForm";
import { useAppContext } from "@/hooks/useAppContext";
import {
  CheckCircle,
  Edit2,
  MoreHorizontal,
  Trash2,
  PlusCircle,
  Award,
  Sparkles,
  GanttChart,
  CalendarCheck,
} from "lucide-react";
import DailyQuestForm from "./DailyQuestForm";
import { motion } from "framer-motion";

interface DailyQuestDetailsProps {
  quest: DailyQuestT;
}

function DailyQuestDetails({ quest }: DailyQuestDetailsProps) {
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const {
    addTaskToDailyQuest,
    renameDailyQuest,
    markDailyQuestTaskAsDone,
    deleteTaskOfDailyQuest,
  } = useAppContext();

  // Calculate completion percentage
  const totalTasks = quest.tasks.length;
  const completedTasks = quest.tasks.filter(
    (task) => task.status === "done"
  ).length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Animation variants
  const taskVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl border border-indigo-100 shadow-sm overflow-hidden"
      >
        {/* Quest Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-indigo-100 group relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <GanttChart className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-lg text-indigo-900">
                {quest.title}
              </h3>
              <Badge
                variant="outline"
                className="bg-indigo-100 text-indigo-800 border-indigo-200"
              >
                Daily
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full p-2 hover:bg-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <MoreHorizontal className="h-5 w-5 text-indigo-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                  Quest Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setOpenCreateTask(true);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-green-600" />
                  Add task
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setOpenRename(true);
                  }}
                >
                  <Edit2 className="mr-2 h-4 w-4 text-blue-600" />
                  Rename
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-indigo-900 font-medium">
                {completedTasks}/{totalTasks} completed
              </span>
              <span className="text-indigo-900 font-medium">
                {completionPercentage}%
              </span>
            </div>
            <Progress
              value={completionPercentage}
              className={`h-2 ${
                completionPercentage === 100
                  ? "bg-emerald-500"
                  : "bg-indigo-600"
              }`}
            />
          </div>
        </div>

        {/* Tasks List */}
        <div className="p-4">
          {quest.tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-gray-500 mb-3">No tasks yet</p>
              <Button
                onClick={() => setOpenCreateTask(true)}
                variant="outline"
                size="sm"
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add your first task
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {quest.tasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  variants={taskVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-lg group relative ${
                    task.status === "done"
                      ? "bg-emerald-50 border border-emerald-100"
                      : "bg-gray-50 border border-gray-100 hover:border-indigo-200"
                  }`}
                >
                  <div className="flex items-center">
                    {task.status === "done" ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <p
                      className={`${
                        task.status === "done"
                          ? "text-emerald-700 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {task.name}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>Task Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {task.status !== "done" && (
                        <DropdownMenuItem
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            markDailyQuestTaskAsDone(quest.id, task.id);
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                          Mark as Complete
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="flex items-center cursor-pointer"
                        onClick={() => {}}
                      >
                        <Edit2 className="mr-2 h-4 w-4 text-blue-600" />
                        Edit task
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center cursor-pointer text-red-600"
                        onClick={() => {
                          deleteTaskOfDailyQuest(quest.id, task.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.li>
              ))}
            </ul>
          )}

          {/* {quest.tasks.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setOpenCreateTask(true)}
                variant="outline"
                size="sm"
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add task
              </Button>
            </div>
          )} */}
        </div>

        {/* Quest Footer - Only shown if there are completed tasks */}
        {completedTasks > 0 && (
          <div className="bg-gray-50 border-t border-gray-100 p-3 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarCheck className="h-4 w-4 mr-2 text-indigo-500" />
              <span>Last updated today</span>
            </div>
            {completionPercentage === 100 && (
              <div className="flex items-center">
                <Award className="h-5 w-5 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-amber-700">
                  Quest Complete!
                </span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Create Task Dialog */}
      <Dialog
        open={openCreateTask}
        onOpenChange={(isOpen) => {
          setOpenCreateTask(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <PlusCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <DialogTitle>Add New Task</DialogTitle>
            </div>
            <DialogDescription>
              Add a new task to "{quest.title}" quest
            </DialogDescription>
          </DialogHeader>

          <TaskForm
            onSubmit={(task) => {
              addTaskToDailyQuest(quest.id, {
                id: Date.now(),
                ...task,
              });
              setOpenCreateTask(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Rename Quest Dialog */}
      <Dialog
        open={openRename}
        onOpenChange={(isOpen) => {
          setOpenRename(isOpen);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Edit2 className="h-5 w-5 text-indigo-600" />
              </div>
              <DialogTitle>Rename Quest</DialogTitle>
            </div>
            <DialogDescription>
              Change the title of your daily quest
            </DialogDescription>
          </DialogHeader>

          <DailyQuestForm
            defaultQuestTitle={quest.title}
            onSubmit={(questTitle) => {
              renameDailyQuest(quest.id, questTitle);
              setOpenRename(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DailyQuestDetails;
