import asyncHandler from '../middleware/asyncHandler.js';

export const addProduct = asyncHandler(async (req, res) => {
    console.log(req, req.fields, req.files)
  });