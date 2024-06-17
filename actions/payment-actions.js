"use server";

import { convertedUrl } from "@/lib/database";
import {
  approvalFromArtist,
  cancelPayment,
  paymentDoneFromBuyer,
  startPayment,
} from "@/lib/payment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function cancelPaymentAction(title) {
  await cancelPayment(title);
  revalidatePath(convertedUrl(`/arts/${title}`));
  redirect(convertedUrl(`/arts/${title}`));
}
