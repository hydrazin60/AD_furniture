import Branch from "../../../models/Branch/Branch.model";
import Worker from "../../../models/user/worker/worker.models";

export const createNewCustomer = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const branchId = req.params.branchId;
    const {
      customerName,
      companyWebsite,
      companySocialMediaLink,
      phoneNumber,
      email,
      customerCategory,
      description,
      address,
      paymentType,
      note,
    } = req.body;
    if (!customerName) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Customer name is required",
      });
    }
    if (!branchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Branch ID is required",
      });
    }
    if (!AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Author ID is required",
      });
    }
    const Auther = await Worker.findById(AutherId);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author ID not found",
      });
    }
    const Branch = await Branch.findById(branchId);
    if (!Branch) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch ID not found",
      });
    }
    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create a new customer",
      });
    }
    if (
      Auther.role === "Admin" &&
      Auther._id.toString() !== Branch.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to create a new customer",
      });
    }
    

  } catch (err) {
    console.log(` Error in createNewCustomer: ${err}`);
    return res.status(400).json({
      success: false,
      error: true,
      message: `Error in createNewCustomer: ${err.message}`,
    });
  }
};
