import { Document, Types, PopulatedDoc } from "mongoose";

export interface Project extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks?: PopulatedDoc<Task & Document>[];
}

export const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

export type TaskStatusType = (typeof taskStatus)[keyof typeof taskStatus];

export interface Task extends Document {
  title: string;
  description?: string;
  status: TaskStatusType;
  project: Types.ObjectId;
}
