const Database = require("better-sqlite3");
const db = new Database("arts.db");
import fs from "node:fs";

export const convertedUrl = (url) => {
  return url.replace(/ /g, "-");
};

export const convertedUrlBack = (url) => {
  return url.replace(/-/g, " ");
};

export async function uploadImage({ title, image, location }) {
  const extenstion = image.name.split(".").pop();
  const fileName = `${convertedUrl(title)}.${extenstion}`;

  const stream = fs.createWriteStream(`public/assets${location}/${fileName}`);
  const bufferedImage = await image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving Image Failed!");
    }
  });

  const path = `/assets${location}/${fileName}`;
  return path;
}

export default db;
