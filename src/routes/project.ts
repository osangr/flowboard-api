import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { TaskController } from "../controllers/taskController";
import { validateRequest } from "../middleware/validation";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";

const router = Router();

// Define your project-related routes here
router.post(
  "/",

  body("projectName")
    .isString()
    .notEmpty()
    .withMessage("Project name is required"),
  body("clientName")
    .isString()
    .notEmpty()
    .withMessage("Client name is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  validateRequest,

  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",

  param("id").isMongoId().withMessage("Invalid project ID"),
  validateRequest,

  ProjectController.getProjectById
);
router.put(
  "/:id",

  param("id").isMongoId().withMessage("Invalid project ID"),

  body("projectName")
    .isString()
    .notEmpty()
    .withMessage("Project name is required"),
  body("clientName")
    .isString()
    .notEmpty()
    .withMessage("Client name is required"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  validateRequest,

  ProjectController.updateProject
);
router.delete(
  "/:id",

  param("id").isMongoId().withMessage("Invalid project ID"),

  validateRequest,

  ProjectController.removeProject
);

router.param("id", projectExists);

router.post(
  "/:id/tasks",
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description is required"),
  TaskController.createTask
);

router.param("taskId", taskExists);
router.param("id", taskBelongsToProject);

router.get("/:id/tasks", TaskController.getProjectTasks);

router.get(
  "/:id/tasks/:taskId",

  param("id").isMongoId().withMessage("Invalid project ID"),

  TaskController.getTaskById
);

router.put(
  "/:id/tasks/:taskId",

  param("id").isMongoId().withMessage("Invalid project ID"),
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description is required"),

  TaskController.updateTask
);

router.delete(
  "/:id/tasks/:taskId",

  param("id").isMongoId().withMessage("Invalid project ID"),

  TaskController.removeTask
);

router.post(
  "/:id/tasks/:taskId/status",
  param("id").isMongoId().withMessage("Invalid project ID"),
  body("status").isString().notEmpty().withMessage("Status is required"),
  validateRequest,
  TaskController.updateTaskStatus
);

export default router;
