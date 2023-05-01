const fs = require("fs/promises");
const path = require("path");

const Jimp = require("jimp");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateSubscribtionById = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await User.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

const updateAvatar = async (req, res) => {
  if (!req.file) throw HttpError(400, "avatar field is required");

  const { _id } = req.user;
  const { path: tempUlpoad, filename } = req.file;
  const avatarName = `${_id}_${filename}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  try {
    const avatar = await Jimp.read(tempUlpoad);
    await avatar.cover(250, 250);
    avatar.write(resultUpload);
  } catch ({ message }) {
    console.log(message);
  }
  await fs.unlink(tempUlpoad);

  const avatarURL = path.join("avatars", avatarName);
  res.json({ avatarURL });
};



module.exports = {
  upatateSubscribtionById: ctrlWrapper(updateSubscribtionById),
  updateAvtar: ctrlWrapper(updateAvatar),
};
