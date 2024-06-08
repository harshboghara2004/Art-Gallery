import db, { convertedUrl } from "./database";
import { revalidatePath } from "next/cache";

export function createUser({ name, gender, email, country, bio, password }) {
  const result = db
    .prepare(
      "INSERT INTO Users (name, gender, email, country, password, bio, profilePhoto) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(name, gender, email, country, password, bio, "/assets/default.png");
  return result.lastInsertRowid;
}

export async function updateUser(user) {
  // console.log(user);
  if (user.image.size > 0) {
    const extenstion = user.image.name.split(".").pop();
    const fileName = `${convertedUrl(user.name)}.${extenstion}`;

    const stream = fs.createWriteStream(`public/assets/artists/${fileName}`);
    const bufferedImage = await user.image.arrayBuffer();

    const filePath = `public/assets/artists/${fileName}`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log("File not found");
        return;
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Failed to delete file");
          return;
        }
        console.log("File deleted successfully");
      });
    });
    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error("Saving Image Failed!");
      }
    });
    user.image = `/assets/artists/${fileName}`;
    // user.image = user.oldProfilePhoto;
  } else {
    user.image = user.oldProfilePhoto;
  }

  const query = `
  UPDATE Users
  SET name = ?, country = ?, bio = ?, profilePhoto = ?
  WHERE name = ?

`;

  db.prepare(query).run(
    user.name,
    user.country,
    user.bio,
    user.image,
    user.oldName
  );

  return user.name;
}

export function getFirstAndLastName(name) {
  const res = name.split(" ");
  return res;
}
export function getAllUsers() {
  const query = `SELECT * FROM Users`;
  return db.prepare(query).all();
}
export function getUserById(id) {
  const query = `SELECT * FROM Users WHERE Id = ?`;
  return db.prepare(query).get(id);
}

export function getUserByEmail(email) {
  const query = `SELECT * FROM Users WHERE email = ?`;
  return db.prepare(query).get(email);
}

export function getUserByName(name) {
  const query = `SELECT * FROM Users WHERE name = ?`;
  return db.prepare(query).get(name);
}
