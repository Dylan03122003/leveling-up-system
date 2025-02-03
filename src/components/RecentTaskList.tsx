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
import { SlOptions } from "react-icons/sl";
import { useAppContext } from "@/hooks/useAppContext";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Button } from "./ui/button";

interface RecentTaskListProps {
  tasks: RecentTaskT[];
}

function RecentTaskList({ tasks }: RecentTaskListProps) {
  const [selectedTasks, setSelectedTasks] = useState<RecentTaskT[]>([]);
  const { deleteRecentTask, addMultipleTasks } = useAppContext();
  if (tasks.length === 0) {
    return <div>No recent tasks</div>;
  }

  return (
    <ul className="max-h-[400px] overflow-y-auto">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex justify-between items-center mb-2 py-2 px-4 rounded-md border `}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              id={`task-${task.id}`}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedTasks([...selectedTasks, task]);
                } else {
                  setSelectedTasks(
                    selectedTasks.filter((t) => t.id !== task.id)
                  );
                }
              }}
            />
            <div className="flex flex-col">
              <label
                htmlFor={`task-${task.id}`}
                className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.name}
              </label>
              <p>
                XP: {calculateTaskXP(task.effort, task.impact, task.difficulty)}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div onClick={() => {}} className="cursor-pointer">
                <SlOptions />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Update</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteRecentTask(task.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}

      {selectedTasks.length > 0 && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              const tasks: TaskT[] = selectedTasks.map((task) => ({
                ...task,
                status: "todo",
                id: Date.now() + Math.random(),
              }));

              addMultipleTasks(tasks);
            }}
          >
            Add to current tasks
          </Button>
        </div>
      )}
    </ul>
  );
}

export default RecentTaskList;
