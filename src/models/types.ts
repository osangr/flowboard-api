import { Document } from "mongoose";

export type Project = Document & {
  projectName: string;
  clientName: string;
  description: string;
};
