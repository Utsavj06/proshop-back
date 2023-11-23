import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Product from "../models/productModel.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const addProductToDB = async(prodData, imgUrl) => {
  const {name , desc, brnd, catry, prce, stk, rating, review, userId} = prodData;

  await Product.create({
    name,
    image: imgUrl,
    brand: brnd,
    category: catry,
    description: desc,
    numReviews: +review,
    rating: +rating,
    countInStock: +stk,
    price: +prce,
    user: userId,
  });
}

export const addProduct = async (req, res) => {
  const proshop_products = "proshop_products";

  try {
    const uploadResult = await cloudinary.uploader.upload(
      req.files.image.path,
      {
        folder: proshop_products,
      }
    );

    addProductToDB(req.fields, uploadResult.secure_url)

  } catch (err) {
    console.log(err);
  }
};
