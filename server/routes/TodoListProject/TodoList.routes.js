import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  createNewTodoListProject,
  DeleteTodoListProject,
  getAllTodoListProject,
  GetOneTodolistProjectDetails,
  UpdateTodoListProject,
  UpdateTodoListProjectStatus,
} from "../../controllers/TodoListProject/TodoListProject.controller.js";
const TodoListRouter = express.Router();

TodoListRouter.post(
  "/create/project/:branchId",
  isAuthenticated,
  createNewTodoListProject
);
TodoListRouter.get(
  "/get/all_project/:branchId",
  isAuthenticated,
  getAllTodoListProject
);

TodoListRouter.get(
  "/get/one_project/:todoListProjectId",
  isAuthenticated,
  GetOneTodolistProjectDetails
);
TodoListRouter.delete(
  "/delete/one_project/:todoListProjectId",
  isAuthenticated,
  DeleteTodoListProject
);
TodoListRouter.put(
  "/update/one_project/:todoListProjectId",
  isAuthenticated,
  UpdateTodoListProject
);
TodoListRouter.put(
  "/update/status/:todoListProjectId",
  isAuthenticated,
  UpdateTodoListProjectStatus
);
export default TodoListRouter;
