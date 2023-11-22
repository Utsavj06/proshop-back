import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const addProduct = async (req, res) => {
  const proshop_products = "proshop_products";

  try {
    const uploadResult = await cloudinary.uploader.upload(
      req.files.image.path,
      {
        folder: proshop_products,
      }
    );
    console.log(uploadResult.secure_url);
  } catch (err) {
    console.log(err);
  }

  res.status(200);
};
