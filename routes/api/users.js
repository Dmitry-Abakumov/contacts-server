const express = require("express");

const ctrl = require("../../controllers/users-controllers");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");
const { isValidId } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.upatateSubscriotionById
);

module.exports = router;
