export type TaskT = {
  id: number;
  name: string;
  effort: number;
  impact: number;
  difficulty: number;
  status: TaskStatusT;
};

export type TaskStatusT = "todo" | "done";

export type NewTaskT = Omit<TaskT, "id">;
