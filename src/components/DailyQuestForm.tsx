import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface DailyQuestFormProps {
  onSubmit: (questTitle: string) => void;
  defaultQuestTitle?: string;
}

function DailyQuestForm({ onSubmit, defaultQuestTitle }: DailyQuestFormProps) {
  const [questTitle, setQuestTitle] = useState<string>(defaultQuestTitle || "");
  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center mb-1">
          <Label htmlFor="name" className="text-indigo-900 font-medium">
            Quest Title
          </Label>
        </div>
        <Input
          id="name"
          value={questTitle}
          placeholder="Enter a descriptive title for your quest"
          className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 py-2 px-3 rounded-md"
          onChange={(e) => {
            setQuestTitle(e.target.value);
          }}
        />
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
          className={`px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
        }`}
          onClick={() => {
            if (questTitle.trim() === "") {
              alert("Please enter a quest title");
              return;
            }

            onSubmit(questTitle);
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {defaultQuestTitle ? "Update Quest" : "Create Quest"}
        </Button>
      </div>
    </div>
  );
}

export default DailyQuestForm;
