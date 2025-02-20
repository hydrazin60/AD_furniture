import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import {
  DeleteVehicle,
  GetAllVehicles,
  GetOneVehicleData,
  NewVehicleUpload,
  UpdateVehicleDetails,
} from "../../controllers/Manager/Vehicles/Vehicles.controller.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
const VehiclesRouter = express.Router();
VehiclesRouter.post(
  "/create/newvehicle/:branchId",
  isAuthenticated,
  uploadMultipleImages("vehicleImage", 6),
  NewVehicleUpload
);
VehiclesRouter.get("/get/all_vehicle", isAuthenticated, GetAllVehicles);
VehiclesRouter.get(
  "/get/one_vehicle/:vehicleId",
  isAuthenticated,
  GetOneVehicleData
);
VehiclesRouter.delete(
  "/delete/vehicle/:vehicleId",
  isAuthenticated,
  DeleteVehicle
);

VehiclesRouter.post(
  "/update/newvehicle/:vehicleId",
  isAuthenticated,
  uploadMultipleImages("vehicleImage", 6),
  UpdateVehicleDetails
);

export default VehiclesRouter;
