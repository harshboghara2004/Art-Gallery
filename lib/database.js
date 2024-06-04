const Database = require("better-sqlite3");
const db = new Database("arts.db");

export const convertedUrl = (url) => {
  return url.replace(/ /g, "-");
};

export default db;