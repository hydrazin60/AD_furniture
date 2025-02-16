import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { NewVehicleUpload } from "../../controllers/Manager/Vehicles/Vehicles.controller.js";
import { uploadMultipleImages } from "../../middleware/multer.js";
const VehiclesRouter = express.Router();
VehiclesRouter.post(
  "/create/newvehicle/:branchId",
  isAuthenticated,
  uploadMultipleImages("vehicleImage", 6),
  NewVehicleUpload
);

export default VehiclesRouter;
