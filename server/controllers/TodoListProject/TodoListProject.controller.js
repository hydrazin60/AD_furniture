import Product from "../../models/product/FinalProduct/Product.models.js";
import Branch from "../../models/Branch/Branch.model.js";
import TodoListProject from "../../models/TodoListProject/TodoListProject.models.js";
import Worker from "../../models/user/worker/worker.models.js";
import mongoose from "mongoose";

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

export const getAllTodoListProject = async (req, res) => {
  try {
    const authorId = req.staffId;
    const branchId = req.params.branchId;

    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid branch ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid author ID",
      });
    }

    const AuthorData = await Worker.findById(authorId);
    if (!AuthorData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
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

    if (AuthorData.role !== "Admin") {
      if (AuthorData.BranchId.toString() !== branchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to view this Todo List Project",
        });
      }
    }

    const todoListProjectData = await TodoListProject.find({
      BranchId: branchId,
    })
      .populate("BranchId", "branchName")
      .populate("todoListProjectCreatedBy", "fullName")
      .populate("productId", "productName productImage");

    if (todoListProjectData.length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No Todo List Projects found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Todo List Projects fetched successfully",
      data: todoListProjectData,
    });
  } catch (error) {
    console.error(`Error in getAllTodoListProject: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

// export const getAllTodoListProject = async (req, res) => {
//   try {
//     const authorId = req.staffId;
//     const branchId = req.params.branchId;

//     if (!mongoose.Types.ObjectId.isValid(branchId) || !branchId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid branchId",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(authorId) || !authorId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid authorId",
//       });
//     }

//     const AutherData = await Worker.findById(authorId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }

//     const branchData = await Branch.findById(branchId);
//     if (!branchData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Branch not found",
//       });
//     }
//     if (AutherData.role !== "Admin") {
//       if (AutherData.BranchId.toString() !== branchId.toString()) {
//         return res.status(403).json({
//           success: false,
//           error: true,
//           message: "You are not authorized to get todo list project",
//         });
//       }
//     }

//     const todoListProjectData = await TodoListProject.find({
//       BranchId: branchId,
//     })
//       .populate("BranchId", "branchName ")
//       .populate("todoListProjectCreatedBy", "fullName ")
//       .populate("productId", "productName productImage ");

//     if (!todoListProjectData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Todo list project not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Todo list project fetched successfully",
//       data: todoListProjectData,
//     });
//   } catch (error) {
//     console.error(`Error in getAllTodoListProject: ${error}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Internal Server Error: ${error.message}`,
//     });
//   }
// };

export const GetOneTodolistProjectDetails = async (req, res) => {
  try {
    const authorId = req.staffId;
    const TodoListProjectId = req.params.todoListProjectId;

    if (!mongoose.Types.ObjectId.isValid(authorId) || !authorId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid authorId",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(TodoListProjectId) ||
      !TodoListProjectId
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid TodoListProjectId",
      });
    }

    const AutherData = await Worker.findById(authorId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    const todoListProjectData = await TodoListProject.findById(
      TodoListProjectId
    )
      .populate("BranchId", "branchName  address branchPhoneNumber")
      .populate("todoListProjectCreatedBy", "fullName phoneNumber email role")
      .populate("productId");

    if (!todoListProjectData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Todo list project not found",
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      message: "Todo list project fetched successfully",
      data: todoListProjectData,
    });
  } catch (error) {
    console.log(`Error in GetOneTodolistProjectDetails: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export const DeleteTodoListProject = async (req, res) => {
  try {
    const authorId = req.staffId;
    const todoListProjectId = req.params.todoListProjectId;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid author ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(todoListProjectId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid TodoListProject ID",
      });
    }

    const AuthorData = await Worker.findById(authorId);
    if (!AuthorData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (AuthorData.role !== "Admin" && AuthorData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to perform this action",
      });
    }

    const todoListProjectData = await TodoListProject.findById(
      todoListProjectId
    );
    if (!todoListProjectData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Todo list project not found",
      });
    }

    if (AuthorData.role !== "Admin") {
      if (
        AuthorData.BranchId.toString() !==
        todoListProjectData.BranchId.toString()
      ) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to delete this Todo List Project",
        });
      }
    }

    await TodoListProject.findByIdAndDelete(todoListProjectId);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Todo list project deleted successfully",
      data: todoListProjectData,
    });
  } catch (error) {
    console.error(`Error in DeleteTodoListProject: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

// export const DeleteTodoListProject = async (req, res) => {
//   try {
//     const authorId = req.staffId;
//     const TodoListProjectId = req.params.todoListProjectId;
//     if (!mongoose.Types.ObjectId.isValid(authorId) || !authorId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid authorId",
//       });
//     }
//     if (
//       !mongoose.Types.ObjectId.isValid(TodoListProjectId) ||
//       !TodoListProjectId
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid TodoListProjectId",
//       });
//     }
//     const AutherData = await Worker.findById(authorId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }
//     if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to perform this action",
//       });
//     }

//     if (AutherData.role !== "Admin") {
//       if (
//         AutherData.BranchId.toString() !== TodoListProjectId.BranchId.toString()
//       ) {
//         return res.status(400).json({
//           success: false,
//           error: true,
//           message: "You are not authorized to perform this action",
//         });
//       }
//     }

//     const todoListProjectData = await TodoListProject.findByIdAndDelete(
//       TodoListProjectId
//     );
//     if (!todoListProjectData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Todo list project not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Todo list project deleted successfully",
//       data: todoListProjectData,
//     });
//   } catch (error) {
//     console.log(`Error in DeleteTodoListProject: ${error}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Internal Server Error: ${error.message}`,
//     });
//   }
// };

export const UpdateTodoListProject = async (req, res) => {
  try {
    const authorId = req.staffId;
    const todoListProjectId = req.params.todoListProjectId;
    const {
      productId,
      todoListProjectName,
      todoListProjectDescription,
      todoListProjectStartDate,
    } = req.body;

    const numberofProject = req.body.numberofProject || 1; // Default to 1 if not provided

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid author ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(todoListProjectId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid TodoListProject ID",
      });
    }

    const AuthorData = await Worker.findById(authorId);
    if (!AuthorData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (AuthorData.role !== "Admin" && AuthorData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to perform this action",
      });
    }

    const todoListProjectData = await TodoListProject.findById(
      todoListProjectId
    );
    if (!todoListProjectData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Todo list project not found",
      });
    }

    if (AuthorData.role !== "Admin") {
      if (
        AuthorData.BranchId.toString() !==
        todoListProjectData.BranchId.toString()
      ) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to update this Todo List Project",
        });
      }
    }

    const updatedTodoListProject = await TodoListProject.findByIdAndUpdate(
      todoListProjectId,
      {
        productId,
        todoListProjectName,
        todoListProjectDescription,
        numberofProject,
        todoListProjectStartDate,
      },
      { new: true }
    );
    const POpulateData = await TodoListProject.findById(todoListProjectId)
      .populate("productId", "productName productImage")
      .populate("BranchId", "branchName  ")
      .populate("todoListProjectCreatedBy", "fullName ");
    if (!POpulateData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Todo list project not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Todo list project updated successfully",
      data: POpulateData,
    });
  } catch (error) {
    console.error(`Error in UpdateTodoListProject: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export const UpdateTodoListProjectStatus = async (req, res) => {
  try {
    const authorId = req.staffId;
    const todoListProjectId = req.params.todoListProjectId;
    const { todoListProjectStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid author ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(todoListProjectId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid TodoListProject ID",
      });
    }

    const AuthorData = await Worker.findById(authorId);
    if (!AuthorData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (AuthorData.role !== "Admin" && AuthorData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update the project status",
      });
    }

    const todoListProjectData = await TodoListProject.findById(
      todoListProjectId
    );
    if (!todoListProjectData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Todo list project not found",
      });
    }

    // Update the status
    todoListProjectData.todoListProjectStatus = todoListProjectStatus;
    await todoListProjectData.save();

    // Fetch populated data
    const populatedData = await TodoListProject.findById(todoListProjectId)
      .populate("BranchId", "branchName address  ")
      .populate("productId", "productName productImage");

    return res.status(200).json({
      success: true,
      error: false,
      message: "Todo list project status updated successfully",
      data: populatedData,
    });
  } catch (error) {
    console.error(`Error in TodoListProjectFinish: ${error}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

// export const UpdateTodoListProject = async (req, res) => {
//   try {
//     const authorId = req.staffId;
//     const todoListProjectId = req.params.todoListProjectId;
//     const {
//       productId,
//       todoListProjectName,
//       todoListProjectDescription,
//       numberofProject = 1,
//       todoListProjectStartDate,
//     } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(authorId) || !authorId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid authorId",
//       });
//     }

//     if (
//       !mongoose.Types.ObjectId.isValid(todoListProjectId) ||
//       !todoListProjectId
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid todoListProjectId",
//       });
//     }

//     const AutherData = await Worker.findById(authorId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }

//     if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to perform this action",
//       });
//     }
//     if (AutherData.role !== "Admin") {
//       if (
//         AutherData.BranchId.toString() !== todoListProjectId.BranchId.toString()
//       ) {
//         return res.status(400).json({
//           success: false,
//           error: true,
//           message: "You are not authorized to perform this action",
//         });
//       }
//     }

//     const todoListProjectData = await TodoListProject.findByIdAndUpdate(
//       todoListProjectId,
//       {
//         productId,
//         todoListProjectName,
//         todoListProjectDescription,
//         numberofProject,
//         todoListProjectStartDate,
//       }
//     );
//     if (!todoListProjectData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Todo list project not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Todo list project updated successfully",
//       data: todoListProjectData,
//     });

//   } catch (error) {
//     console.error(`Error in UpdateTodoListProject: ${error}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Internal Server Error: ${error.message}`,
//     });
//   }
// };

// export const TodoListProjectFinesh = async (req, res) => {
//   try {
//     const authorId = req.staffId;
//     const todoListProjectId = req.params.todoListProjectId;
//     const { todoListProjectStatus } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(authorId) || !authorId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid authorId",
//       });
//     }

//     if (
//       !mongoose.Types.ObjectId.isValid(todoListProjectId) ||
//       !todoListProjectId
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid todoListProjectId",
//       });
//     }

//     const AutherData = await Worker.findById(authorId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }

//     const todoListProjectData = await TodoListProject.findByIdAndUpdate(
//       todoListProjectId
//     );
//     if (!todoListProjectData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Todo list project not found",
//       });
//     }
//     todoListProjectData.todoListProjectStatus = todoListProjectStatus;
//     await todoListProjectData.save();

//     constpopulateData = await TodoListProject.findById(todoListProjectId)
//       .populate("BranchId")
//       .populate("productId")
//       .populate("createdBy");

//     return res.status(200).json({
//       success: true,
//       error: false,
//       message: "Todo list project finished successfully",
//       data: todoListProjectData,
//     });
//   } catch (error) {
//     console.log(`Error in TodoListProjectFinesh: ${error}`);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: `Internal Server Error: ${error.message}`,
//     });
//   }
// };
