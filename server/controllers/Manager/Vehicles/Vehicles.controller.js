import mongoose from "mongoose";
import BranchModel from "../../../models/Branch/Branch.model.js";
import WorkerModel from "../../../models/user/worker/worker.models.js";
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

// import BranchModel from "../../../models/Branch/Branch.model.js";
// import WorkerModel from "../../../models/user/worker/worker.models.js";
// import Vehicles from "../../../models/vehicles/Vehicles.models.js";
// import cloudinary from "../../../utils/cloudnary.js";
// import { getDataUri } from "../../../utils/dataUri.js";

// export const NewVehicleUpload = async (req, res) => {
//   try {
//     const AUterid = req.staffId;
//     const BranchId = req.params.branchId.trim();
//     const {
//       branchId = BranchId,
//       vehicleType,
//       vehicleNumber,
//       vehicleDriver,
//       vehicleDescription,
//       registrationDate,
//     } = req.body;

//     const vehicleImage = req.files;

//     // Check required fields
//     if (!vehicleNumber || !vehicleDriver) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Vehicle number and driver are required",
//       });
//     }

//     if (!BranchId) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Please select a branch to upload a new vehicle",
//       });
//     }

//     // Check if the author exists
//     const Auther = await WorkerModel.findById(AUterid);
//     if (!Auther) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Author ID not found",
//       });
//     }

//     // Authorization check
//     if (Auther.role !== "Manager" && Auther.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "You are not authorized to upload a new vehicle",
//       });
//     }

//     // Check if the branch exists
//     const branchData = await BranchModel.findById(BranchId);
//     if (!branchData) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "Branch not found",
//       });
//     }

//     // Admin-specific authorization check
//     if (
//       Auther.role === "Admin" &&
//       Auther._id.toString() !== branchData.BranchStaff.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Unauthorized to create a vehicle for this branch",
//       });
//     }

//     // Validate the driver
//     const driver = await WorkerModel.findById(vehicleDriver);
//     if (!driver || driver.role !== "DeliveryBoy") {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Invalid driver ID or the driver is not a DeliveryBoy",
//       });
//     }

//     // Upload images if provided
//     const imageUris = [];
//     if (Array.isArray(vehicleImage) && vehicleImage.length > 0) {
//       await Promise.all(
//         vehicleImage.map(async (image) => {
//           try {
//             const fileUri = getDataUri(image);
//             const cloudResponse = await cloudinary.uploader.upload(
//               fileUri.content,
//               {
//                 folder: "vehicleImage",
//               }
//             );
//             imageUris.push({
//               public_id: cloudResponse.public_id,
//               url: cloudResponse.secure_url,
//             });
//           } catch (error) {
//             console.error("Error uploading vehicle image:", error);
//           }
//         })
//       );
//     }

//     // Create new vehicle entry
//     const newVehicle = await Vehicles.create({
//       BranchId: branchId,
//       vehicleType,
//       vehicleNumber,
//       vehicleDriver,
//       vehicleDescription,
//       registrationDate,
//       vehicleImage: imageUris,
//       vehicleCreatedBy: Auther._id,
//     });

//     // Assign vehicle to the driver (only for DeliveryBoy role)
//     driver.vechalId.push(newVehicle._id);
//     await driver.save();

//     // Add the vehicle to the branch
//     branchData.vehicles.push(newVehicle._id);
//     await branchData.save();

//     // Populate data for response
//     const populatedVehicle = await Vehicles.findById(newVehicle._id)
//       .populate("vehicleDriver", "fullName phoneNumber email address")
//       .populate("BranchId", "branchName address branchPhoneNumber");

//     return res.status(201).json({
//       success: true,
//       message: "Vehicle uploaded successfully",
//       vehicle: populatedVehicle,
//     });
//   } catch (err) {
//     console.error(`Error in NewVehicleUpload:`, err);
//     res.status(500).json({
//       success: false,
//       error: true,
//       message: "An unexpected error occurred while uploading a new vehicle",
//     });
//   }
// };

// // import Branch from "../../../models/Branch/Branch.model";
// // import Worker from "../../../models/user/worker/worker.models";
// // import Vehicles from "../../../models/vehicles/Vehicles.models";
// // import cloudinary from "../../../utils/cloudnary";
// // import { getDataUri } from "../../../utils/dataUri";

// // export const NewVehicleUpload = async (req, res) => {
// //   try {
// //     const AUterid = req.staffId;
// //     const BranchId = req.branchId;
// //     const {
// //       branchId = BranchId,
// //       vehicleType,
// //       vehicleNumber,
// //       vehicleDriver,
// //       vehicleDescription,
// //       registrationDate,
// //     } = req.body;
// //     const vehicleImage = req.files;
// //     if (!vehicleNumber || !vehicleDriver) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Vehicle number and driver are required",
// //       });
// //     }
// //     if (!BranchId) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "You are not authorized to upload a new vehicle",
// //       });
// //     }
// //     if (!BranchId) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "Please select a branch to upload a new vehicle",
// //       });
// //     }
// //     const Auther = await Worker.findById(AUterid);
// //     if (!Auther) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Author ID not found",
// //       });
// //     }

// //     if (Auther.role !== "Manager" && Auther.role !== "Admin") {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "You are not authorized to upload a new vehicle",
// //       });
// //     }

// //     const Branch = await Branch.findById(BranchId);
// //     if (!Branch) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "Branch not found",
// //       });
// //     }
// //     if (
// //       Auther.role === "Admin" &&
// //       Auther._id.toString() !== Branch.BranchStaff.toString()
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "Unauthorized to create invoice for this branch",
// //       });
// //     }
// //     const imageUris = [];
// //     if (Array.isArray(vehicleImage) && vehicleImage.length > 0) {
// //       await Promise.all(
// //         vehicleImage.map(async (image) => {
// //           try {
// //             const fileUri = getDataUri(image);
// //             const cloudResponse = await cloudinary.uploader.upload(
// //               fileUri.content,
// //               {
// //                 folder: "vehicleImage",
// //               }
// //             );
// //             imageUris.push({
// //               public_id: cloudResponse.public_id,
// //               url: cloudResponse.secure_url,
// //             });
// //           } catch (error) {
// //             console.error("Error uploading branch image:", error);
// //           }
// //         })
// //       );
// //     }

// //     const newVehicle = await Vehicles.create({
// //       BranchId: branchId,
// //       vehicleType,
// //       vehicleNumber,
// //       vehicleDriver,
// //       vehicleDescription,
// //       registrationDate,
// //       vehicleImage: imageUris,
// //       vehicleCreatedBy: Auther._id,
// //     });
// //     if (
// //       Worker.role === "DeliveryBoy" &&
// //       Worker._id.toString() === newVehicle.vehicleDriver.toString()
// //     ) {
// //       Worker.vechalId = newVehicle._id;
// //       await Worker.save();
// //     }
// //     const branchData = await Branch.findById(BranchId);
// //     branchData.vehicles.push(newVehicle._id);
// //     await branchData.save();

// //     const populateData = await Vehicles.findById(newVehicle._id)
// //       .populate("vehicleDriver", "fullName phoneNumber email address")
// //       .populate("BranchId", "branchName address , branchPhoneNumber");
// //   } catch (err) {
// //     console.error(`Error in NewVehicleUpload:`, err);
// //     res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: "An unexpected error occurred while uploading a new vehicle",
// //     });
// //   }
// // };
