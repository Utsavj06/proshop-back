import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetPassword,
  getUpPass,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getGoogleOauthUrlRoute } from "../controllers/getGoogleAuthController.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.get("/getGoogleOAuth", getGoogleOauthUrlRoute);
router.post("/reset-pass", resetPassword);
router.post("/update-password", getUpPass);

export default router;
