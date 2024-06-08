import db from "./database";

export async function addTag(tag, title) {
  const query = `
    INSERT INTO Tags (artTitle, tag) VALUES (? ,?)
  `;
  const id = db.prepare(query).run(title, tag);
  console.log(id);
}

export async function deleteTag(tag, title) {
  const query = `
    DELETE FROM Tags
    WHERE artTitle = ? and tag = ?
  `;
  db.prepare(query).run(title, tag);
}
