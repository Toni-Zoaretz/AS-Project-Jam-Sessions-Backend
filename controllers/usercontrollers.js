import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/User.js";
import mongoose from "mongoose";

//@desc Get all Users
//@route GET /api/v1/jam-user
//@access private
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate({
    path: "jamSession_id",
  });
  res.status(200).json(users);
});

// @desc    Create a User
// @route   POST /api/v1/jam-user
// @access  Private
export const createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc Get one User
//@route GET /api/v1/jam-user/:id
//@access private
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//@desc Get one User by email
//@route GET /api/v1/jam-user/email/:email
//@access private
export const getUserByEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//@desc Get one User by name
//@route GET /api/v1/jam-user/name/:name
//@access private
export const getUserByName = asyncHandler(async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//@desc Update User
//@route PUT /api/v1/jam-user/:id
//@access private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(user);
});

//@desc Delete User
//@route PUT /api/v1/jam-user/:id
//@access private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  res.status(200).json(user);
});
