"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { convertedUrl } from "@/lib/database";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { getCurrentUser } from "@/lib/sessions";
import {
  createUser,
  getUserByEmail,
  updateUser,
  updateUserPhoto,
} from "@/lib/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function register(prevState, formData) {
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const gender = formData.get("gender");
  const email = formData.get("email");
  const country = formData.get("country");
  const bio = formData.get("bio");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (confirmPassword !== password) {
    errors.confirm_password = "Confirm must be exactly same as Password";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  let user = {
    name: `${firstName} ${lastName}`,
    gender: gender || "Not Specified",
    email: email,
    country: country,
    bio: bio || "Not Specified by User.",
    password: hashedPassword,
  };

  try {
    const id = createUser({ ...user });
    // console.log(id);
    await createAuthSession(id);
    redirect(convertedUrl(`/profile/${user.name}`));
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "It seems like an account for the chosen email already exists.",
        },
      };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    // console.log("invalid-pass");
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials.",
      },
    };
  }
  try {
    await createAuthSession(existingUser.id);
  } catch (e) {
    // console.log("error");
  }
  redirect("/arts");
}

export async function updateProfileDetails({ data }) {
  const curruntUser = getCurrentUser();
  const user = {
    name: `${data["first-name"]} ${data["last-name"]}`,
    country: data.country,
    bio: data.about,
    oldName: curruntUser.name,
  };
  // console.log(user);
  const newUser = await updateUser(user);
  console.log("update-successfully");
  revalidatePath("/profile");
  redirect(convertedUrl(`/profile/${newUser}`));
}

export async function updateProfilePhoto(newUrl) {
  const curruntUser = getCurrentUser();
  await updateUserPhoto(newUrl, curruntUser.id);
  console.log("update-successfully");
  revalidatePath("/profile");
  redirect(convertedUrl(`/profile/${curruntUser.name}`));
}

export async function logout() {
  // console.log("here");
  await destroySession();
  redirect("/");
}
