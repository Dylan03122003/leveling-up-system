import { useState } from "react";
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
import { Button } from "./ui/button";
import { NewTaskT, TaskT } from "@/types";
import {
  Pencil,
  Clock,
  Target,
  BarChart,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface TaskFormProps {
  onSubmit: (task: TaskT | NewTaskT) => void;
  defaultValues?: TaskT;
}

// Rating badges for visual display
const RatingBadge = ({ rating }: { rating: number }) => {
  const getBadgeColor = (rating: number) => {
    switch (rating) {
      case 1:
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 2:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case 3:
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case 4:
        return "bg-purple-100 text-purple-700 border-purple-200";
      case 5:
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return rating ? (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${getBadgeColor(
        rating
      )} border`}
    >
      {rating}
    </span>
  ) : null;
};

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

  const isUpdate = !!defaultValues;

  // Calculate XP based on task parameters (example function)
  const calculateXP = () => {
    if (!task.effort || !task.impact || !task.difficulty) return 0;
    return (
      (Number(task.effort) + Number(task.impact)) * Number(task.difficulty)
    );
  };

  const xpEstimate = calculateXP();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-indigo-900">
            {isUpdate ? "Update Quest Details" : "Create New Quest"}
          </h3>
          <p className="text-indigo-700 text-sm">
            Define your quest parameters
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-indigo-100 px-4 py-2">
          <div className="text-xs text-indigo-600 font-medium mb-1">
            Estimated XP
          </div>
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-xl font-bold text-indigo-900">
              {xpEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* Quest Title Field */}
      <div className="space-y-2">
        <div className="flex items-center mb-1">
          <Pencil className="h-4 w-4 text-indigo-500 mr-2" />
          <Label htmlFor="name" className="text-indigo-900 font-medium">
            Quest Title
          </Label>
        </div>
        <Input
          id="name"
          value={task.name}
          placeholder="Enter a descriptive title for your quest"
          className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 py-2 px-3 rounded-md"
          onChange={(e) => {
            setTask({ ...task, name: e.target.value });
          }}
        />
      </div>

      {/* Effort Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-blue-500 mr-2" />
            <Label htmlFor="effort" className="text-indigo-900 font-medium">
              Effort Required
            </Label>
          </div>
          <RatingBadge rating={task.effort} />
        </div>
        <Select
          value={task.effort ? task.effort.toString() : ""}
          onValueChange={(value) => setTask({ ...task, effort: Number(value) })}
        >
          <SelectTrigger className="w-full border-blue-200 focus:border-blue-400 focus:ring-blue-300">
            <SelectValue placeholder="How much time will this take?" />
          </SelectTrigger>
          <SelectContent className="border-blue-200">
            <SelectGroup>
              <SelectItem value="1" className="py-2 focus:bg-blue-50">
                <div className="flex items-center">
                  <span className="font-medium">1 - Quick Task</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-blue-400" />
                  <span className="text-sm text-blue-600">
                    less than 5 min (e.g., drinking water)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="2" className="py-2 focus:bg-blue-50">
                <div className="flex items-center">
                  <span className="font-medium">2 - Short Task</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-blue-400" />
                  <span className="text-sm text-blue-600">
                    ~30 min (e.g., workout, reading)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="3" className="py-2 focus:bg-blue-50">
                <div className="flex items-center">
                  <span className="font-medium">3 - Medium Task</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-blue-400" />
                  <span className="text-sm text-blue-600">
                    ~1 hour (e.g., deep work, networking)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="4" className="py-2 focus:bg-blue-50">
                <div className="flex items-center">
                  <span className="font-medium">4 - Large Task</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-blue-400" />
                  <span className="text-sm text-blue-600">
                    2+ hours (e.g., learning a skill, big project)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="5" className="py-2 focus:bg-blue-50">
                <div className="flex items-center">
                  <span className="font-medium">5 - Major Project</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-blue-400" />
                  <span className="text-sm text-blue-600">
                    A full day or longer (e.g., completing a course)
                  </span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Impact Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Target className="h-4 w-4 text-purple-500 mr-2" />
            <Label htmlFor="impact" className="text-indigo-900 font-medium">
              Impact Level
            </Label>
          </div>
          <RatingBadge rating={task.impact} />
        </div>
        <Select
          value={task.impact ? task.impact.toString() : ""}
          onValueChange={(value) => setTask({ ...task, impact: Number(value) })}
        >
          <SelectTrigger className="w-full border-purple-200 focus:border-purple-400 focus:ring-purple-300">
            <SelectValue placeholder="How meaningful is this quest?" />
          </SelectTrigger>
          <SelectContent className="border-purple-200">
            <SelectGroup>
              <SelectItem value="1" className="py-2 focus:bg-purple-50">
                <div className="flex items-center">
                  <span className="font-medium">1 - Minor Impact</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-purple-400" />
                  <span className="text-sm text-purple-600">
                    Small benefit (e.g., making the bed)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="2" className="py-2 focus:bg-purple-50">
                <div className="flex items-center">
                  <span className="font-medium">2 - Small Impact</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-purple-400" />
                  <span className="text-sm text-purple-600">
                    Slight improvement (e.g., eating healthy)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="3" className="py-2 focus:bg-purple-50">
                <div className="flex items-center">
                  <span className="font-medium">3 - Medium Impact</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-purple-400" />
                  <span className="text-sm text-purple-600">
                    Noticeable improvement (e.g., finishing a book)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="4" className="py-2 focus:bg-purple-50">
                <div className="flex items-center">
                  <span className="font-medium">4 - High Impact</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-purple-400" />
                  <span className="text-sm text-purple-600">
                    Big positive change (e.g., securing a job)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="5" className="py-2 focus:bg-purple-50">
                <div className="flex items-center">
                  <span className="font-medium">5 - Transformative</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-purple-400" />
                  <span className="text-sm text-purple-600">
                    Life-changing (e.g., running a marathon)
                  </span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <BarChart className="h-4 w-4 text-rose-500 mr-2" />
            <Label htmlFor="difficulty" className="text-indigo-900 font-medium">
              Difficulty Level
            </Label>
          </div>
          <RatingBadge rating={task.difficulty} />
        </div>
        <Select
          value={task.difficulty ? task.difficulty.toString() : ""}
          onValueChange={(value) =>
            setTask({ ...task, difficulty: Number(value) })
          }
        >
          <SelectTrigger className="w-full border-rose-200 focus:border-rose-400 focus:ring-rose-300">
            <SelectValue placeholder="How challenging is this quest?" />
          </SelectTrigger>
          <SelectContent className="border-rose-200">
            <SelectGroup>
              <SelectItem value="1" className="py-2 focus:bg-rose-50">
                <div className="flex items-center">
                  <span className="font-medium">1 - Very Easy</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-rose-400" />
                  <span className="text-sm text-rose-600">
                    Simple task (e.g., sending a text)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="2" className="py-2 focus:bg-rose-50">
                <div className="flex items-center">
                  <span className="font-medium">2 - Easy</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-rose-400" />
                  <span className="text-sm text-rose-600">
                    Mildly challenging (e.g., waking up early)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="3" className="py-2 focus:bg-rose-50">
                <div className="flex items-center">
                  <span className="font-medium">3 - Moderate</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-rose-400" />
                  <span className="text-sm text-rose-600">
                    Requires effort (e.g., deep work)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="4" className="py-2 focus:bg-rose-50">
                <div className="flex items-center">
                  <span className="font-medium">4 - Challenging</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-rose-400" />
                  <span className="text-sm text-rose-600">
                    Hard (e.g., speaking in public)
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="5" className="py-2 focus:bg-rose-50">
                <div className="flex items-center">
                  <span className="font-medium">5 - Very Hard</span>
                  <ChevronRight className="h-3 w-3 mx-1 text-rose-400" />
                  <span className="text-sm text-rose-600">
                    Extremely difficult (e.g., major fear)
                  </span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-200 mt-6 flex justify-end gap-4">
        <Button
          variant="outline"
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
          type="button"
        >
          Cancel
        </Button>
        <Button
          className={`px-6 ${
            task.difficulty && task.effort && task.impact
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              : "bg-slate-400"
          }`}
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
          <Sparkles className="h-4 w-4 mr-2" />
          {isUpdate ? "Update Quest" : "Create Quest"}
        </Button>
      </div>

      {/* XP Calculation Summary - Appears when all fields have values */}
      {task.difficulty && task.effort && task.impact ? (
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 mt-2">
          <h4 className="text-sm font-medium text-indigo-900 mb-2">
            XP Calculation
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Clock className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-slate-600">Effort: {task.effort}</span>
            </div>
            <div className="flex items-center">
              <Target className="h-3 w-3 text-purple-500 mr-1" />
              <span className="text-slate-600">Impact: {task.impact}</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-3 w-3 text-rose-500 mr-1" />
              <span className="text-slate-600">
                Difficulty: {task.difficulty}
              </span>
            </div>
            <div className="flex items-center">
              <Sparkles className="h-3 w-3 text-amber-500 mr-1" />
              <span className="text-slate-600">Formula: (E + I) × D</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-indigo-200">
            <span className="text-indigo-700 font-medium">Total XP Reward</span>
            <span className="text-lg font-bold text-indigo-900">
              {xpEstimate}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TaskForm;
