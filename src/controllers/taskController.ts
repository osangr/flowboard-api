import type { Request, Response } from "express";
import TaskModel from "../models/Task.model";

export class TaskController {
  static getAllTasks = async (req: Request, res: Response) => {
    const tasks = await TaskModel.find({});
    if (!tasks) {
      return res.status(404).send("No tasks found");
    }
    res.status(200).json(tasks);
  };

  static createTask = async (req: Request, res: Response) => {
    const { project } = req;
    try {
      const task = new TaskModel(req.body);
      task.project = project.id;
      project.tasks.push(task.id);
      await Promise.allSettled([task.save(), project.save()]);
      res.send(`Task created: ${task}`);
    } catch (error) {
      res.status(500).send({ error: "Error creating task" });
      return;
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    const { project } = req;
    try {
      const tasks = await TaskModel.find({ project: project.id }).populate(
        "project"
      );
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).send({ error: "Error fetching tasks" });
      return;
    }
  };
}
