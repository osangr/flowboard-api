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

  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.task);
    } catch (error) {
      return res.status(500).send({ error: "Error retrieving task" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.title = req.body.title;
      req.task.description = req.body.description;
      await req.task.save();
      res.status(200).json({ msg: "Task updated correctly" });
    } catch (error) {
      return res.status(500).send({ error: "Error updating task" });
    }
  };

  static removeTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );

      await req.task.deleteOne();
      Promise.allSettled([req.task.deleteOne(), req.project.save()]);

      res.send(`req.Task deleted: ${req.task}`);
    } catch (error) {
      return res.status(500).send({ error: "Error deleting task" });
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
      req.task.status = status;
      await req.task.save();
      res.status(200).json({ msg: "Task status updated correctly" });
    } catch (error) {
      return res.status(500).send({ error: "Error updating task status" });
    }
  };
}
