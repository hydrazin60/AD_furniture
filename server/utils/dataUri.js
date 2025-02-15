import DataURIParser from "datauri/parser.js";
import path from "path";

const parser = new DataURIParser();

export const getDataUri = (file) => {
  if (!file || !file.buffer) {
    console.error("Invalid file input:", file);
    return null;
  }
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
