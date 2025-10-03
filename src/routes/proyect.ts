import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { validateRequest } from "../middleware/validation";

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

export default router;
