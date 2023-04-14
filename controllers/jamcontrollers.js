import JamSession from "../model/JamSession.js";
import User from "../model/User.js";
import geocoder from "../utils/geoCoder.js";

import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get all Jam Sessions
// @route   GET /api/v1/jam-sessions
// @access  Private
export const getAllJamSessions = asyncHandler(async (req, res, next) => {
  const allJamSessions = await JamSession.find().populate("user_id");
  res.status(200).json({
    success: true,
    data: allJamSessions,
  });
});

//@desc Get one Jam Session by name
//@route GET /api/v1/jam-sessions/name/:name
//@access private
export const getOneJamSessionByName = asyncHandler(async (req, res) => {
  const jamSession = await JamSession.findOne({
    jamSessionName: req.params.jamSessionName,
  });
  if (!jamSession) {
    res.status(404);
    throw new Error("Jam Session not found");
  }
  res.status(200).json(jamSession);
});

// @desc    Get  Jam Sessions Filtered by dates
// @route   GET /api/v1/jam-sessions
// @access  Private
export const getJamSessionFilteredByDate = asyncHandler(
  async (req, res, next) => {
    const { startDate, endDate } = req.params;
    const jamSessions = await JamSession.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate("user_id");
    res.status(200).json({
      success: true,
      data: jamSessions,
    });
  }
);

// @desc    Create a Jam Session
// @route   POST /api/v1/jam-sessions
// @access  Private
// export const createJamSession = asyncHandler(async (req, res, next) => {
//   const userId = req.params.id;
//   const jamSessionDetails = req.body;
//   const createdNewJam = await JamSession.create(jamSessionDetails);
//   const updateJamForUser = await User.findByIdAndUpdate(
//     userId,
//     { $push: { jamSession_id: createdNewJam.id } },
//     { new: true }
//   );
//   res.status(200).json({
//     success: true,
//     data: updateJamForUser,
//   });
// });
export const createJamSession = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const jamSessionDetails = req.body;

  // Add the user_id to the jamSessionDetails object
  jamSessionDetails.user_id = userId;

  const createdNewJam = await JamSession.create(jamSessionDetails);

  const updateJamForUser = await User.findByIdAndUpdate(
    userId,
    { $push: { jamSession_id: createdNewJam.id } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: updateJamForUser,
  });
});

// @desc    Delete a Jam Session
// @route   Delete /api/v1/jam-sessions/:id
// @access  Private
export const deleteJamSession = asyncHandler(async (req, res, next) => {
  const jamSessionId = req.params.id;
  const deletedJamSession = await JamSession.findByIdAndDelete(jamSessionId);
  if (!deletedJamSession) {
    throw new Error("Jam Session not found");
  }

  const deleteJamSessionFromUser = await User.updateMany(
    { jamSession_id: jamSessionId },
    { $pull: { jamSession_id: jamSessionId } }
  );
  res.status(200).json({
    success: true,
    data: deleteJamSession,
  });
});

// @desc    Update a Jam Session
// @route   PUT /api/v1/jam-sessions/:id
// @access  Private
export const updateJamSession = asyncHandler(async (req, res, next) => {
  const jamSessionId = req.params.id;
  const updates = req.body;

  const jamSession = await JamSession.findById(jamSessionId);

  if (!jamSession) {
    throw new Error("Jam Session not found");
  }

  const updatedJamSession = await JamSession.updateOne(
    { _id: jamSessionId },
    { $set: updates, $currentDate: { lastUpdated: true } }
  );
  res.status(200).json({
    success: true,
    data: updatedJamSession,
  });
});

// @desc    Get Jam Session within a radius
// @route   GET /api/v1/jam-sessions/radius/:zipcode/:distance
// @access  Private
export const getJamSessionsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //   // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //   // Calc radius using radians
  //   // Divide distance by radius of Earth
  //   // Earth Radius = 6,378.1 km
  const radius = distance / 6378.1;

  const jamSession = await JamSession.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  }).sort("-location");

  res.status(200).json({
    success: true,
    count: jamSession.length,
    data: jamSession,
  });
});
