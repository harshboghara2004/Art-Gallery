"use server";
import { convertedUrl } from "@/lib/database";
import {
  approvalNotification,
  deleteNotification,
  initiatePaymentNotification,
} from "@/lib/notification";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// CREATE TABLE notifications (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   type ENUM('Approval', 'Payment', 'Refund') NOT NULL,
//   desc TEXT NOT NULL,
//   from TEXT NOT NULL,
//   to TEXT NOT NULL,
//   artTitle TEXT NOT NULL,
//   e1 TEXT NOT NULL,
//   e2 TEXT NOT NULL,
//   e3 TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export async function initiatePaymentNotificationAction({ artTitle }) {
  await initiatePaymentNotification({ artTitle });
  revalidatePath("/profile");
  redirect(convertedUrl(`/arts/${artTitle}/payment`));
}

export async function approvalNotificationAction({ artTitle }) {
  await approvalNotification({ artTitle });
  revalidatePath("/profile");
}

export async function cancelPaymentNotificationAction({ artTitle, newPath }) {
  await deleteNotification({ artTitle });
  revalidatePath("/profile");
  if (newPath) redirect(convertedUrl(`/arts/${artTitle}`));
}

export async function deleteApprovalNotificationAction({ artTitle }) {
  await deleteNotification({ artTitle });
  revalidatePath("/profile");
  redirect(convertedUrl(`/arts/${artTitle}`));
}
