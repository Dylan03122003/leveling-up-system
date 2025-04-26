import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  MoreHorizontal,
  Sparkles,
  Plus,
  ScrollText,
  Trophy,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import DailyQuestForm from "./DailyQuestForm";
import { useAppContext } from "@/hooks/useAppContext";
import DailyQuestDetails from "./DailyQuestDetails";

function DailyQuestList() {
  const {
    addDailyQuest,
    resetAllTasksOfAllDailyQuests,
    mySytem: { dailyQuests },
  } = useAppContext();
  const [openDailyQuests, setOpenDailyQuests] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <ScrollText className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-indigo-900">
              Daily Quests
            </h2>
            <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-indigo-600 text-white">
              {dailyQuests.length} active
            </div>
          </div>

          <div className="flex items-center gap-2 group">
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
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>Quest Options</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center cursor-pointer gap-2 text-indigo-600 focus:text-indigo-600 focus:bg-indigo-50"
                  onClick={() => {
                    setOpenDailyQuests(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add Daily Quest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    resetAllTasksOfAllDailyQuests();
                  }}
                  className="flex items-center cursor-pointer gap-2"
                >
                  <Clock className="h-4 w-4" />
                  End Quests
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="p-6">
          {dailyQuests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Daily Quests Yet
              </h3>
              <p className="text-gray-500 max-w-sm mb-6">
                Create your first daily quest to start building productive
                habits!
              </p>
              <Button
                onClick={() => setOpenDailyQuests(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Create First Quest
              </Button>
            </div>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {dailyQuests.map((quest, index) => (
                <motion.div key={quest.id || index} variants={itemVariants}>
                  <DailyQuestDetails quest={quest} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Dialog
        open={openDailyQuests}
        onOpenChange={(isOpen) => {
          setOpenDailyQuests(isOpen);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <DialogTitle className="text-xl">Create Daily Quest</DialogTitle>
            </div>
            <DialogDescription className="text-indigo-600 font-medium">
              Daily quests help build consistent habits and reward regular
              progress!
            </DialogDescription>
          </DialogHeader>

          <DailyQuestForm
            onSubmit={(questTitle) => {
              addDailyQuest(questTitle);
              setOpenDailyQuests(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DailyQuestList;
