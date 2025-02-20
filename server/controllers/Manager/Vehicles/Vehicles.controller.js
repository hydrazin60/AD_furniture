import mongoose, { isValidObjectId } from "mongoose";
import BranchModel from "../../../models/Branch/Branch.model.js";
import Worker from "../../../models/user/worker/worker.models.js";
import Vehicles from "../../../models/vehicles/Vehicles.models.js";
import cloudinary from "../../../utils/cloudnary.js";
import { getDataUri } from "../../../utils/dataUri.js";

export const NewVehicleUpload = async (req, res) => {
  try {
    const AUterid = req.staffId.trim(); // Trim the staffId
    const BranchId = req.params.branchId.trim(); // Trim the branchId

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(AUterid)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid Author ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(BranchId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid Branch ID",
      });
    }

    const {
      branchId = BranchId,
      vehicleType,
      vehicleNumber,
      vehicleDriver,
      vehicleDescription,
      registrationDate,
    } = req.body;

    const vehicleImage = req.files;

    // Check required fields
    if (!vehicleNumber || !vehicleDriver) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Vehicle number and driver are required",
      });
    }

    if (!BranchId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please select a branch to upload a new vehicle",
      });
    }

    // Check if the author exists
    const Auther = await WorkerModel.findById(AUterid);
    if (!Auther) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author ID not found",
      });
    }

    // Authorization check
    if (Auther.role !== "Manager" && Auther.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to upload a new vehicle",
      });
    }

    // Check if the branch exists
    const branchData = await BranchModel.findById(BranchId);
    if (!branchData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Branch not found",
      });
    }

    // Admin-specific authorization check
    if (
      Auther.role === "Admin" &&
      Auther._id.toString() !== branchData.BranchStaff.toString()
    ) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Unauthorized to create a vehicle for this branch",
      });
    }

    // Validate the driver
    const driver = await WorkerModel.findById(vehicleDriver);
    if (!driver || driver.role !== "DeliveryBoy") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid driver ID or the driver is not a DeliveryBoy",
      });
    }

    // Upload images if provided
    const imageUris = [];
    if (Array.isArray(vehicleImage) && vehicleImage.length > 0) {
      await Promise.all(
        vehicleImage.map(async (image) => {
          try {
            const fileUri = getDataUri(image);
            const cloudResponse = await cloudinary.uploader.upload(
              fileUri.content,
              {
                folder: "vehicleImage",
              }
            );
            imageUris.push({
              public_id: cloudResponse.public_id,
              url: cloudResponse.secure_url,
            });
          } catch (error) {
            console.error("Error uploading vehicle image:", error);
          }
        })
      );
    }

    // Create new vehicle entry
    const newVehicle = await Vehicles.create({
      BranchId: branchId,
      vehicleType,
      vehicleNumber,
      vehicleDriver,
      vehicleDescription,
      registrationDate,
      vehicleImage: imageUris,
      vehicleCreatedBy: Auther._id,
    });

    // Assign vehicle to the driver (only for DeliveryBoy role)
    driver.vechalId.push(newVehicle._id);
    await driver.save();

    // Add the vehicle to the branch
    branchData.vehicles.push(newVehicle._id);
    await branchData.save();

    // Populate data for response
    const populatedVehicle = await Vehicles.findById(newVehicle._id)
      .populate("vehicleDriver", "fullName phoneNumber email address")
      .populate("BranchId", "branchName address branchPhoneNumber")
      .populate("vehicleCreatedBy", "fullName phoneNumber email address");

    return res.status(201).json({
      success: true,
      message: "Vehicle uploaded successfully",
      vehicle: populatedVehicle,
    });
  } catch (err) {
    console.error(`Error in NewVehicleUpload:`, err);
    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while uploading a new vehicle",
    });
  }
};

export const GetAllVehicles = async (req, res) => {
  try {
    const AutherId = req.staffId;
    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staff ID",
      });
    }

    const AllVehicles = await Vehicles.find()
      .populate("BranchId")
      .populate("vehicleDriver", "fullName phoneNumber email address")
      .limit(10);
    return res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      vehicles: AllVehicles,
    });
  } catch (err) {
    console.error(`Error in GetAllVehicles:`, err);
    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while getting all vehicles",
    });
  }
};

export const GetOneVehicleData = async (req, res) => {
  try {
    const AUtherId = req.staffId;
    const vehicleId = req.params.vehicleId;
    if (!mongoose.Types.ObjectId.isValid(AUtherId) || !AUtherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staff ID",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(vehicleId) || !vehicleId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid vehicle ID",
      });
    }

    const AutherData = await Worker.findById(AUtherId);
    if (!AutherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }
    const VehicleData = await Vehicles.findById(vehicleId)
      .populate("BranchId")
      .populate("vehicleDriver", "fullName phoneNumber email address")
      .populate("vehicleCreatedBy", "fullName phoneNumber email address");

    if (!VehicleData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Vehicle not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Vehicle data fetched successfully",
      vehicle: VehicleData,
    });
  } catch (err) {
    console.error(`Error in GetOneVehicleData:`, err);
    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while getting one vehicle data",
    });
  }
};
export const DeleteVehicle = async (req, res) => {
  try {
    const AuthorId = req.staffId;
    const vehicleId = req.params.vehicleId;

    if (!mongoose.Types.ObjectId.isValid(AuthorId) || !AuthorId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staff ID",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(vehicleId) || !vehicleId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid vehicle ID",
      });
    }

    const AuthorData = await Worker.findById(AuthorId);
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
        message: "You are not authorized to delete this vehicle",
      });
    }

    const VehicleData = await Vehicles.findById(vehicleId);
    if (!VehicleData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Vehicle not found",
      });
    }

    if (AuthorData.role !== "Admin") {
      const BranchId = AuthorData.BranchId;
      if (BranchId.toString() !== VehicleData.BranchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to delete this vehicle",
        });
      }
    }

    await VehicleData.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      vehicle: VehicleData,
    });
  } catch (error) {
    console.error(`Error in DeleteVehicle:`, error);
    res.status(500).json({
      success: false,
      error: true,
      message: "An unexpected error occurred while deleting the vehicle",
    });
  }
};

export const UpdateVehicleDetails = async (req, res) => {
  try {
    const AutherId = req.staffId;
    const vehicleId = req.params.vehicleId;
    const {
      branchId,
      vehicleType,
      vehicleNumber,
      vehicleDriver,
      vehicleDescription,
      registrationDate,
    } = req.body;
    const vehicleImage = req.files;

    if (!mongoose.Types.ObjectId.isValid(AutherId) || !AutherId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid staff ID",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(vehicleId) || !vehicleId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid vehicle ID",
      });
    }
    const AUtherData = await Worker.findById(AutherId);
    if (!AUtherData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Author not found",
      });
    }

    if (AUtherData.role !== "Admin" && AUtherData.role !== "Manager") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this vehicle",
      });
    }

    const VehicleData = await Vehicles.findById(vehicleId);
    if (!VehicleData) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Vehicle not found",
      });
    }
    if (AUtherData.role !== "Admin") {
      const BranchId = AUtherData.BranchId;
      if (BranchId.toString() !== VehicleData.BranchId.toString()) {
        return res.status(403).json({
          success: false,
          error: true,
          message: "You are not authorized to update this vehicle",
        });
      }
    }
    const imageUris = [];
    if (Array.isArray(vehicleImage) && vehicleImage.length > 0) {
      await Promise.all(
        vehicleImage.map(async (image) => {
          try {
            const fileUri = getDataUri(image);
            const cloudResponse = await cloudinary.uploader.upload(
              fileUri.content,
              {
                folder: "vehicleImage",
              }
            );
            imageUris.push({
              public_id: cloudResponse.public_id,
              url: cloudResponse.secure_url,
            });
          } catch (error) {
            console.error("Error uploading vehicle image:", error);
          }
        })
      );
    }
    if (branchId !== undefined) {
      VehicleData.BranchId = branchId;
    }
    if (vehicleType !== undefined) {
      VehicleData.vehicleType = vehicleType;
    }
    if (vehicleNumber !== undefined) {
      VehicleData.vehicleNumber = vehicleNumber;
    }
    if (vehicleDriver !== undefined) {
      VehicleData.vehicleDriver = vehicleDriver;
    }
    if (vehicleDescription !== undefined) {
      VehicleData.vehicleDescription = vehicleDescription;
    }
    if (registrationDate !== undefined) {
      VehicleData.registrationDate = registrationDate;
    }
    if (imageUris.length > 0) {
      VehicleData.vehicleImage = imageUris;
    }

    await VehicleData.save();
    return res.status(200).json({
      success: true,
      message: "Vehicle details updated successfully",
      vehicle: VehicleData,
    });
  } catch (error) {
    console.log(`Error in UpdateVehicleDetails: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Error in UpdateVehicleDetails: ${error.message}`,
    });
  }
};

// export const DeleteVehicle = async (req, res) => {
//   try {
//     const AUtherId = req.staffId;
//     const vehicleId = req.params.vehicleId;
//     if (!mongoose.Types.ObjectId.isValid(AUtherId) || !AUtherId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid staff ID",
//       });
//     }
//     if (!mongoose.Types.ObjectId.isValid(vehicleId) || !vehicleId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid vehicle ID",
//       });
//     }

//     const AutherData = await Worker.findById(AUtherId);
//     if (!AutherData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author not found",
//       });
//     }

//     if (AutherData.role !== "Admin" && AutherData.role !== "Manager") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to delete this vehicle",
//       });
//     }

//     const VehicleData = await Vehicles.findById(vehicleId);
//     if (!VehicleData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Vehicle not found",
//       });
//     }
//     if (AutherData.role !== "Admin") {
//       const BranchId = AutherData.BranchId;
//       if (BranchId.toString() !== VehicleData.BranchId.toString()) {
//         return res.status(403).json({
//           success: false,
//           error: true,
//           message: "You are not authorized to delete this vehicle",
//         });
//       }
//     }

//     const Deletevehicles = await Vehicles.findById(vehicleId);

//     if (!Deletevehicles) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Vehicle not found",
//       });
//     }
//     await DeleteVehicles.deleteOne({ _id: vehicleId });
//     return res.status(200).json({
//       success: true,
//       message: "Vehicle deleted successfully",
//       vehicle: Deletevehicles,
//     });
//   } catch (error) {
//     console.error(`Error in DeleteVehicle:`, err);
//     res.status(500).json({
//       success: false,
//       error: true,
//       message: "An unexpected error occurred while deleting a vehicle",
//     });
//   }
// };
