import express from "express";
import { getAllUsers, deleteUser, dashboardStats } from "../controllers/adminController.js";
import {
  authorizedRoles,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.get(
  "/get-all-users",
  isAuthenticated,
  authorizedRoles("Admin"),
  getAllUsers
); // DASHBOARD
adminRouter.delete(
  "/delete/:id",
  isAuthenticated,
  authorizedRoles("Admin"),
  deleteUser
);
adminRouter.get(
  "/fetch/dashboard-stats",
  isAuthenticated,
  authorizedRoles("Admin"),
  dashboardStats
);

export default adminRouter;
