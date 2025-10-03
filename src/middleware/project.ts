import type { Request, Response, NextFunction } from "express";
import Project from "../models/Project.model";
import { ProjectModel as ProjectModel } from "../models/types";

declare global {
  namespace Express {
    interface Request {
      project?: ProjectModel;
    }
  }
}

export const validateProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      const error = new Error("Project not found");
      return res.status(404).json({ error: error.message });
    }
    req.project = project;
    next();
  } catch (error) {
    res.status(500).send("Server error");
  }
};
