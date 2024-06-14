"use server";

import { convertedUrl } from "@/lib/database";
import {
  approvalFromArtist,
  paymentDoneFromBuyer,
  startPayment,
} from "@/lib/payment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Step 1
export async function initiatePayment(title) {
  await startPayment(title);
  revalidatePath(convertedUrl(`/arts/${title}`));
  redirect(convertedUrl(`/arts/${title}/payment`));
}

export async function paymentFromBuyer(title) {
  await paymentDoneFromBuyer(title);
  revalidatePath(convertedUrl(`/arts/${title}/payment`));
}

export async function approvalActionByArtist(title) {
  await approvalFromArtist(title);
  revalidatePath(convertedUrl(`/arts/${title}/payment`));
  redirect(convertedUrl(`/arts/${title}/payment`));
}
