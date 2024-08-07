import prisma from "./prisma"; // Ensure correct path for Prisma Client instance

// Check if a User Exists
export async function checkUserExists(name) {
  const count = await prisma.user.count({
    where: { name },
  });
  return count > 0;
}

// Check if a User Exists By Email
export async function checkUserExistsByEmail(email) {
  const count = await prisma.user.count({
    where: { email },
  });
  return count > 0;x
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
