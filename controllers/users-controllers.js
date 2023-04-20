const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const updateSubscriotionById = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await User.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = {
  upatateSubscriotionById: ctrlWrapper(updateSubscriotionById),
};
