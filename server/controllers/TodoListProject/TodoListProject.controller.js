import Product from "../../models/product/FinalProduct/Product.models.js";
import Branch from "../../models/Branch/Branch.model.js";
import TodoListProject from "../../models/TodoListProject/TodoListProject.models.js";
import Worker from "../../models/user/worker/worker.models.js";

export const createNewTodoListProject = async (req, res) => {
  try {
    const authorId = req.staffId;
    const branchId = req.params.branchId;
    const {
      productId,
      todoListProjectName,
      todoListProjectDescription,
      numberofProject = 1,
      todoListProjectStartDate,
    } = req.body;

    if (!authorId || !branchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "AuthorId and branchId are required",
      });
    }

    if (!productId || !todoListProjectName) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "productId and todoListProjectName are required",
      });
    }

    // Check if Product model is defined
    if (!Product) {
      console.error("Product model is not defined");
      return res.status(500).json({
        success: false,
        error: true,
        message: "Internal Server Error: Product model is not defined",
      });
    }

    const productData = await Product.findById(productId);
    if (!productData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    const author = await Worker.findById(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (author.role !== "Manager" && author.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create a new todo list project",
      });
    }

    const branchData = await Branch.findById(branchId);
    if (!branchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    if (
      author.role === "Admin" &&
      author._id.toString() !== branchData.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message:
          "You are not authorized to create a todo list project for this branch",
      });
    }

    const newTodoListProject = new TodoListProject({
      productId,
      todoListProjectCreatedBy: authorId,
      BranchId: branchId,
      todoListProjectName,
      todoListProjectDescription,
      numberofProject,
      todoListProjectStartDate,
    });

    await newTodoListProject.save();

    const populatedData = await TodoListProject.findById(newTodoListProject._id)
      .populate("BranchId", "branchName branchPhoneNumber")
      .populate("todoListProjectCreatedBy", "fullName phoneNumber email")
      .populate("productId", "productName productImage productPrice");

    return res.status(201).json({
      success: true,
      error: false,
      message: "Todo list project created successfully",
      data: populatedData,
    });
  } catch (error) {
    console.error(`Error in createNewTodoListProject: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
