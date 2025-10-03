import type { Request, Response } from "express";
import Project from "../models/Project.model";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    const projects = await Project.find({});
    if (!projects) {
      return res.status(404).send("No projects found");
    }
    res.status(200).json(projects);
  };

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      project.save();
      res.send(`Project created: ${project}`);
    } catch (error) {
      res.status(500).send("Error creating project");
      return;
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        return res.status(404).send("Project not found");
      }
      res.status(200).json(project);
    } catch (error) {
      return res.status(500).send("Error retrieving project");
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findByIdAndUpdate(id, req.body);

      const updateProject = await project?.save();

      if (!project) {
        return res.status(404).send("Project not found");
      }
      res.send(`Project updated: ${updateProject}`);
    } catch (error) {
      return res.status(500).send("Error retrieving project");
    }
  };

  static removeProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).send("Project not found");
      }

      await project.deleteOne();

      res.send(`Project deleted: ${project}`);
    } catch (error) {
      return res.status(500).send("Error deleting project");
    }
  };
}
