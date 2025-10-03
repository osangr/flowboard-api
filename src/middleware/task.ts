import type { Request, Response, NextFunction } from "express";
import Task from "../models/Task.model";
import { TaskModel } from "../models/types";

declare global {
  namespace Express {
    interface Request {
      task?: TaskModel;
    }
  }
}

export const taskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      return res.status(404).json({ error: error.message });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const taskBelongsToProject = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.task.project.id.toString() !== req.project.id.toString()) {
    return res.status(400).send({ error: "Task does not belong to project" });
  }
  next();
};
