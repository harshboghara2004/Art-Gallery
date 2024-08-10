import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const user = await currentUser();
  // console.log(user);
  let userData;
  if (user !== null) {
    const email = user.emailAddresses[0].emailAddress;
    let prismaUser = await getUserByEmail(email);
    if (prismaUser) userData = prismaUser;
  }
  return userData;
}
// Check if a User Exists
export async function checkUserExists(email) {
  const count = await prisma.user.count({
    where: { email },
  });
  return count > 0;
}

// Check if a User Exists By Email
export async function checkUserExistsByEmail(email) {
  const count = await prisma.user.count({
    where: { email },
  });
  return count > 0;
  x;
}

// Create a New User
export async function createUser({
  name,
  username,
  gender,
  email,
  country,
  bio,
  photoUrl,
}) {
  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      gender,
      email,
      country,
      bio,
      photoUrl,
    },
  });
  return newUser.id;
}

// Update an Existing User
export async function updateUser(userId, user) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: user.name,
      gender: user.gender,
      country: user.country,
      bio: user.bio,
    },
  });
}

// Update User Photo URL
export async function updateUserPhoto(newUrl, userId) {
  await prisma.user.update({
    where: { id: userId },
    data: { photoUrl: newUrl },
  });
}

// Split Full Name into First and Last Name
export function getFirstAndLastName(name) {
  const [firstName, lastName] = name.split(" ");
  return { firstName, lastName };
}

// Get All Users
export async function getAllUsers() {
  return prisma.user.findMany();
}

// Get User by ID
export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

// Get User by Email
export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Get User by Name
export async function getUserByName(name) {
  return prisma.user.findUnique({
    where: { name },
  });
}

export async function getUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username },
  });
}
