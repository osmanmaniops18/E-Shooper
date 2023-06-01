const express=require("express");
const { registerUser, loginUser, logout, forgotPassword,resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUserDetails, updateProfilebyAdmin, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser,authorizeRole } = require("../middleware/auth");
const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get( isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRole("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRole("admin"),getSingleUserDetails).put(isAuthenticatedUser,authorizeRole("admin"),updateProfilebyAdmin).delete(isAuthenticatedUser,authorizeRole("admin"),deleteUser);

module.exports=router;