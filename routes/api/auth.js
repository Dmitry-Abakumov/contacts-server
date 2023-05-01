const express = require("express");

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.put("/logout", authenticate, ctrl.logout);
router.get("/verify/:verificationToken", ctrl.verify);
router.post(
  "/verify",
  validateBody(schemas.resendVerifyEmailSchema),
  ctrl.resendVerifyEmail
);

module.exports = router;
