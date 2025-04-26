import { calculateTaskXP } from "@/lib/calculateTaskXP";
import { RecentTaskT, TaskT } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAppContext } from "@/hooks/useAppContext";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MoreHorizontal, Plus, Trash2, Edit, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

interface RecentTaskListProps {
  tasks: RecentTaskT[];
}

function RecentTaskList({ tasks }: RecentTaskListProps) {
  const [selectedTasks, setSelectedTasks] = useState<RecentTaskT[]>([]);
  const { deleteRecentTask, addMultipleTasks } = useAppContext();

  // const getPriorityColor = (priority: string) => {
  //   switch (priority?.toLowerCase()) {
  //     case "high":
  //       return "bg-red-100 text-red-800 border-red-200";
  //     case "medium":
  //       return "bg-amber-100 text-amber-800 border-amber-200";
  //     case "low":
  //       return "bg-green-100 text-green-800 border-green-200";
  //     default:
  //       return "bg-blue-100 text-blue-800 border-blue-200";
  //   }
  // };

  const getXPBadgeColor = (xp: number) => {
    if (xp >= 30) return "bg-purple-600 hover:bg-purple-700";
    if (xp >= 20) return "bg-indigo-600 hover:bg-indigo-700";
    if (xp >= 10) return "bg-blue-600 hover:bg-blue-700";
    return "bg-teal-600 hover:bg-teal-700";
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-gray-50 border-gray-100">
        <div className="p-3 mb-4 rounded-full bg-gray-100">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No recent tasks
        </h3>
        <p className="text-gray-500">Your completed tasks will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-[50%]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
        {selectedTasks.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              {selectedTasks.length} selected
            </span>
            <Button
              onClick={() => {
                const tasks: TaskT[] = selectedTasks.map((task) => ({
                  ...task,
                  status: "todo",
                  id: Date.now() + Math.random(),
                }));
                addMultipleTasks(tasks);
                setSelectedTasks([]);
              }}
              className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Add to current tasks
            </Button>
          </div>
        )}
      </div>

      <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {tasks.map((task) => {
          const xp = calculateTaskXP(task.effort, task.impact, task.difficulty);
          const isSelected = selectedTasks.some((t) => t.id === task.id);

          return (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex justify-between items-center p-4 rounded-lg border transition duration-200 ${
                isSelected
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTasks([...selectedTasks, task]);
                    } else {
                      setSelectedTasks(
                        selectedTasks.filter((t) => t.id !== task.id)
                      );
                    }
                  }}
                  className="h-5 w-5 border-2"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor={`task-${task.id}`}
                      className="text-lg font-medium text-gray-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.name}
                    </label>
                    {/* {task.priority && (
                      <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs px-2 py-0.5 capitalize`}>
                        {task.priority}
                      </Badge>
                    )} */}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Badge
                        className={`flex items-center gap-1 ${getXPBadgeColor(
                          xp
                        )}`}
                      >
                        <Award className="w-3 h-3" />
                        <span>{xp} XP</span>
                      </Badge>
                    </div>
                    {/* {task.description && (
                      <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
                    )} */}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Task Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Edit className="w-4 h-4" />
                    <span>Edit Task</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => {
                      deleteRecentTask(task.id);
                      setSelectedTasks(
                        selectedTasks.filter((t) => t.id !== task.id)
                      );
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Task</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentTaskList;
