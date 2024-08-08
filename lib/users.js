import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const user = await currentUser();
  // console.log(user);
  let userData;
  if (user !== null) {
    const [username] = user.emailAddresses[0].emailAddress.split("@");
    userData = {
      name: `${user.firstName} ${user.lastName}`,
      username: username,
      gender: "Not Specified",
      email: user.emailAddresses[0].emailAddress,
      country: "Not Specified",
      bio: "Not Specified",
      photoUrl: user.imageUrl,
    };
    let prismaUser = await getUserByEmail(userData.email);
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
  gender,
  email,
  country,
  bio,
  photoUrl,
}) {
  const newUser = await prisma.user.create({
    data: {
      name,
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
export async function updateUser(user) {
  const updatedUser = await prisma.user.update({
    where: { name: user.oldName },
    data: {
      name: user.name,
      country: user.country,
      bio: user.bio,
    },
  });
  return updatedUser.name;
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
