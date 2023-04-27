const express = require("express");

const ctrl = require("../../controllers/users-controllers");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");
const { isValidId } = require("../../middlewares");
// const { changeAvatarSize } = require("../../middlewares");
const { upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(schemas.updateSubscribtionSchema),
  ctrl.upatateSubscribtionById
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  // changeAvatarSize,
  ctrl.updateAvtar
);

module.exports = router;
