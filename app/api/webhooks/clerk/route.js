import { createUser } from "@/lib/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Handle user created event
    if (body.type === "user.created") {
      const data = body.data;
      const email = data.email_addresses[0].email_address;
      const [username] = email.split("@");
      await createUser({
        name: `${data.first_name} ${data.last_name}`,
        username: username,
        gender: "Not Specified",
        email: email,
        country: "Not Specified",
        bio: "Not Specified by User",
        photoUrl: data.image_url,
      });
    }

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
