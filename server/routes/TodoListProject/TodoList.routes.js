import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createNewTodoListProject } from "../../controllers/TodoListProject/TodoListProject.controller.js";
const TodoListRouter = express.Router();

TodoListRouter.post(
  "/create/project/:branchId",
  isAuthenticated,
  createNewTodoListProject
);

export default TodoListRouter;
