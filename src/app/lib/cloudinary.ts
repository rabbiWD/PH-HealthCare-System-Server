import config from "../config";
import { v2 as Cloudinary } from "cloudinary";

Cloudinary.config({
  cloud_name: config.cordinary_cloud_name,
  api_key: config.cordinary_api_key,
  api_secret: config.cordinary_api_secret,
});

export const cloudinary = Cloudinary