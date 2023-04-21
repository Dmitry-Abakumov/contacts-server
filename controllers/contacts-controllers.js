const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  res.status(200).json(
    await Contact.find(
      favorite ? { owner, favorite } : { owner },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email")
  );
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id, "-createdAt -updatedAt").populate(
    "owner",
    "email"
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const { id: owner } = req.user;

  res.status(201).json(await Contact.create({ ...req.body, owner }));
};

const updateContactById = async (req, res, next) => {
  const { body, params } = req;
  const { id } = params;
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

const updateFavoriteById = async (req, res, next) => {
  const { body, params } = req;
  const { id } = params;
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

const deleteContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) throw HttpError(404, "Not found");

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
