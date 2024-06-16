import db from "./database";

export function createUser({ name, gender, email, country, bio, password }) {
  const result = db
    .prepare(
      "INSERT INTO Users (name, gender, email, country, password, bio, photoUrl) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(name, gender, email, country, password, bio, "/assets/default.png");
  return result.lastInsertRowid;
}

export async function updateUser(user) {
  const query = `
    UPDATE Users
    SET name = ?, country = ?, bio = ?
    WHERE name = ?
`;

  db.prepare(query).run(user.name, user.country, user.bio, user.oldName);

  return user.name;
}

export async function updateUserPhoto(newUrl, userId) {
  const query = `
    UPDATE Users
    SET photoUrl = ?
    WHERE id = ?
`;

  db.prepare(query).run(newUrl, userId);
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
