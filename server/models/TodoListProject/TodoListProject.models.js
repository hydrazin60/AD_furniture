import mongoose from "mongoose";
const TodoListProjectSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    todoListProjectCreatedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    BranchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    todoListProjectName: {
      type: String,
      required: [true, "Todo list name is required"],
    },
    todoListProjectDescription: {
      type: String,
      default: "",
    },
    numberofProject: {
      type: Number,
      default: 1,
    },
    todoListProjectStatus: {
      type: String,
      enum: ["done", "inprogress"],
      default: "inprogress",
    },
    todoListProjectStartDate: {
      type: Date,
      default: Date.now,
    },
    todoListProjectEndDate: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TodoListProject = mongoose.model(
  "TodoListProject",
  TodoListProjectSchema
);
export default TodoListProject;
