import { calculateTaskXP } from "@/lib/calculateTaskXP";
import { TaskT } from "@/types";
import { useAppContext } from "@/hooks/useAppContext";
import { useState } from "react";
import {
  CheckCircle,
  Edit2,
  Trash2,
  MoreHorizontal,
  Award,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import ConfirmModal from "./ConfirmModal";
import TaskForm from "./TaskForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface TaskListProps {
  tasks: TaskT[];
}

// Define difficulty color schemes
const difficultyColors = {
  1: "bg-emerald-50 border-emerald-200 text-emerald-700",
  2: "bg-amber-50 border-amber-200 text-amber-700",
  3: "bg-rose-50 border-rose-200 text-rose-700",
};

// Define difficulty badge colors
const difficultyBadges = {
  1: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  2: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  3: "bg-rose-100 text-rose-800 hover:bg-rose-100",
};

// Animation variants for list items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function TaskList({ tasks }: TaskListProps) {
  const { markAsDone, clearAllTasks, deleteTask, updateTask } = useAppContext();
  const [openConfirmClearAllTasks, setOpenConfirmClearAllTasks] =
    useState(false);
  const [updatedTask, setUpdatedTask] = useState<TaskT | undefined>();

  // Sort tasks: in-progress first, done at the bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === "done" && b.status !== "done") return 1;
    if (a.status !== "done" && b.status === "done") return -1;
    return 0;
  });

  // Group tasks by status
  const activeTasks = sortedTasks.filter((task) => task.status !== "done");
  const completedTasks = sortedTasks.filter((task) => task.status === "done");

  return (
    <>
      <Dialog
        open={!!updatedTask}
        onOpenChange={(open) => {
          if (!open) {
            setUpdatedTask(undefined);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Update Quest
            </DialogTitle>
          </DialogHeader>

          <TaskForm
            defaultValues={updatedTask}
            onSubmit={(task) => {
              updateTask(task as TaskT);
              setUpdatedTask(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Your Quests</h1>
            <p className="text-slate-500 text-sm mt-1">
              Complete quests to earn XP and level up
            </p>
          </div>

          {
            <Button
              onClick={() => setOpenConfirmClearAllTasks(true)}
              variant="outline"
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4"
            >
              <Clock className="mr-2 h-4 w-4" /> End Day
            </Button>
          }
        </div>

        {activeTasks.length > 0 ? (
          <div className="space-y-3 mb-8">
            <h2 className="font-medium text-slate-600 flex items-center text-sm pl-2">
              <Award className="mr-2 h-4 w-4 text-indigo-500" /> Active Quests (
              {activeTasks.length})
            </h2>
            <ul className="space-y-3">
              {activeTasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className={`flex justify-between items-center p-4 rounded-lg shadow-sm border ${
                    difficultyColors[
                      task.difficulty as keyof typeof difficultyColors
                    ] || "bg-blue-50 border-blue-200"
                  } transition-all hover:shadow-md`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium">{task.name}</h3>
                      <Badge
                        className={`${
                          difficultyBadges[
                            task.difficulty as keyof typeof difficultyColors
                          ]
                        } text-xs`}
                      >
                        {task.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <span className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-indigo-500" />
                        {calculateTaskXP(
                          task.effort,
                          task.impact,
                          task.difficulty
                        )}{" "}
                        XP
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>Effort: {task.effort}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>Impact: {task.impact}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 hover:bg-green-100 hover:text-green-700 rounded-full"
                      onClick={() => markAsDone(task.id)}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full p-2 hover:bg-slate-100"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48" align="end">
                        <DropdownMenuLabel>Quest Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center cursor-pointer"
                          onClick={() => markAsDone(task.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Mark as Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center cursor-pointer"
                          onClick={() => setUpdatedTask(task)}
                        >
                          <Edit2 className="mr-2 h-4 w-4 text-blue-600" />
                          Edit Quest
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center cursor-pointer text-red-600"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Quest
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 mb-8 rounded-lg border border-dashed border-slate-200 bg-slate-50">
            <div className="rounded-full bg-indigo-100 p-3 mb-3">
              <Award className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">
              No Active Quests
            </h3>
            <p className="text-slate-500 text-center mt-1 max-w-md">
              Create new quests to start earning XP and level up your character!
            </p>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-medium text-slate-600 flex items-center text-sm pl-2">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Completed
              Quests ({completedTasks.length})
            </h2>
            <ul className="space-y-2">
              {completedTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-100 text-green-800 opacity-80"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-md">{task.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="h-4 w-4 mr-1 text-green-600" />
                    <span>
                      {calculateTaskXP(
                        task.effort,
                        task.impact,
                        task.difficulty
                      )}{" "}
                      XP
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ConfirmModal
        title="End Your Day"
        description="This will finalize your quests for the day and calculate your total XP. Are you sure you want to continue?"
        openModal={openConfirmClearAllTasks}
        onOpenChange={setOpenConfirmClearAllTasks}
        onConfirm={() => {
          clearAllTasks();
          setOpenConfirmClearAllTasks(false);
        }}
        onCancel={() => {
          setOpenConfirmClearAllTasks(false);
        }}
        // confirmText="End Day"
        // cancelText="Continue Questing"
        // icon={<AlertCircle className="h-6 w-6 text-amber-500" />}
      />
    </>
  );
}

export default TaskList;
