import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { NewTaskT, TaskT } from "@/types";

interface TaskFormProps {
  onSubmit: (task: TaskT | NewTaskT) => void;
  defaultValues?: TaskT;
}

function TaskForm({ onSubmit, defaultValues }: TaskFormProps) {
  const [task, setTask] = useState<TaskT | NewTaskT>(
    defaultValues || {
      status: "todo",
      name: "",
      difficulty: 0,
      effort: 0,
      impact: 0,
    }
  );

  return (
    <div>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        value={task.name}
        className="mt-1"
        onChange={(e) => {
          setTask({ ...task, name: e.target.value });
        }}
      />

      <Label htmlFor="effort">Effort</Label>
      <Select
        value={task.effort + ""} // convert to string
        onValueChange={(value) => setTask({ ...task, effort: Number(value) })}
      >
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select your effort type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">
              1 = less than 5 min (e.g., drinking water)
            </SelectItem>
            <SelectItem value="2">
              2 = ~30 min (e.g., workout, reading)
            </SelectItem>
            <SelectItem value="3">
              3 = ~1 hour (e.g., deep work, networking)
            </SelectItem>
            <SelectItem value="4">
              4 = 2+ hours (e.g., learning a skill, big project)
            </SelectItem>
            <SelectItem value="5">
              5 = A full day or longer (e.g., completing a course, launching a
              project)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label htmlFor="impact">Impact</Label>
      <Select
        value={task.impact + ""}
        onValueChange={(value) => setTask({ ...task, impact: Number(value) })}
      >
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select your impact type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">
              1 = Small benefit (e.g., making the bed)
            </SelectItem>
            <SelectItem value="2">
              2 = Slight improvement (e.g., eating healthy for a meal)
            </SelectItem>
            <SelectItem value="3">
              3 = Noticeable improvement (e.g., finishing a book)
            </SelectItem>
            <SelectItem value="4">
              4 = Big positive change (e.g., securing a new job)
            </SelectItem>
            <SelectItem value="5">
              5 = Life-changing (e.g., running a marathon, getting a degree)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label htmlFor="difficulty">Difficulty</Label>
      <Select
        value={task.difficulty + ""}
        onValueChange={(value) =>
          setTask({ ...task, difficulty: Number(value) })
        }
      >
        <SelectTrigger className="w-full mt-1">
          <SelectValue placeholder="Select your difficulty type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">
              1 = Very easy (e.g., sending a text)
            </SelectItem>
            <SelectItem value="2">
              2 = Mildly challenging (e.g., waking up early)
            </SelectItem>
            <SelectItem value="3">
              3 = Requires effort (e.g., deep work)
            </SelectItem>
            <SelectItem value="4">
              4 = Hard (e.g., speaking in public)
            </SelectItem>
            <SelectItem value="5">
              5 = Extremely difficult (e.g., overcoming a major fear)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex justify-end">
        <Button
          className="mt-4"
          onClick={() => {
            if (
              !task.name ||
              !task.effort ||
              !task.impact ||
              !task.difficulty
            ) {
              alert("Please fill in all fields");
              return;
            }

            if (defaultValues) {
              onSubmit({
                id: defaultValues.id,
                name: task.name,
                difficulty: Number(task.difficulty),
                effort: Number(task.effort),
                impact: Number(task.impact),
                status: "todo",
              });
              return;
            }
            onSubmit({
              name: task.name,
              difficulty: Number(task.difficulty),
              effort: Number(task.effort),
              impact: Number(task.impact),
              status: "todo",
            });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default TaskForm;
