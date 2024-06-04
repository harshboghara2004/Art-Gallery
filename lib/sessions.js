import { cookies } from "next/headers";
import db from "./database";
import { getUserById } from "./users";

export function getUserBySessionId(sessionId) {
  const query = `
   SELECT * FROM sessions
   WHERE id = ?
  `;
  const session = db.prepare(query).get(sessionId);
  // console.log(session);
  const { user_id } = session;
  return getUserById(user_id);
}

export function getCurrentUser() {
  let cookiesStore = cookies();
  let auth_session = cookiesStore.get("auth_session");
  // console.log(auth_session);
  let currentUser;

  if (auth_session !== undefined) {
    currentUser = getUserBySessionId(auth_session.value);
  }

  return currentUser;
}
