import { calculateTaskXP } from "@/lib/calculateTaskXP";
import { TaskT } from "@/types";
import { SlOptions } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAppContext } from "@/hooks/useAppContext";
import { Button } from "./ui/button";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import TaskForm from "./TaskForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface TaskListProps {
  tasks: TaskT[];
}

function TaskList({ tasks }: TaskListProps) {
  const { markAsDone, clearAllTasks, deleteTask, updateTask } = useAppContext();
  const [openConfirmClearAllTasks, setOpenConfirmClearAllTasks] =
    useState(false);
  const [updatedTask, setUpdatedTask] = useState<TaskT>();

  // done tasks should be at the bottom
  tasks.sort((a) => {
    if (a.status === "done") {
      return 1;
    }
    return -1;
  });

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update task</DialogTitle>
          </DialogHeader>

          <TaskForm
            defaultValues={updatedTask}
            onSubmit={(task) => {
              console.log("task", task);
              updateTask(task as TaskT);
              setUpdatedTask(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl mb-4">Current Tasks</h1>

          <Button onClick={() => setOpenConfirmClearAllTasks(true)}>
            End up
          </Button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center ${
                task.status === "done"
                  ? "bg-green-50 border-green-200"
                  : "bg-blue-50 border-blue-200"
              } mb-2 py-2 px-4 rounded-md border `}
            >
              <div className="flex flex-col">
                <p className="text-2xl">{task.name} </p>
                <p>
                  XP:{" "}
                  {calculateTaskXP(task.effort, task.impact, task.difficulty)}
                </p>
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
                  <DropdownMenuItem
                    onClick={() => {
                      markAsDone(task.id);
                    }}
                  >
                    Done
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setUpdatedTask(task);
                    }}
                  >
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmModal
        title="Are you sure?"
        openModal={openConfirmClearAllTasks}
        onOpenChange={setOpenConfirmClearAllTasks}
        onConfirm={() => {
          clearAllTasks();
          setOpenConfirmClearAllTasks(false);
        }}
        onCancel={() => {
          setOpenConfirmClearAllTasks(false);
        }}
      />
    </>
  );
}

export default TaskList;
