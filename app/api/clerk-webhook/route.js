import { Clerk } from "@clerk/clerk-sdk-node";
import { checkUserExistsByEmail, createUser } from "@/lib/users";

const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY }); // Ensure you have this environment variable set

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Verify the request with Clerk
      const event = req.body;

      if (event.type === "user.created") {
        const userId = event.data.id;
        const user = await clerk.users.getUser(userId);

        // Example function to run after sign-up
        const [username] = user.emailAddress[0].emailAddress.split('@');
        const userData = {
          name: `${user.firstName} ${user.lastName}`,
          username: username,
          gender: "Not Specified",
          email: user.emailAddresses[0].emailAddress,
          country: "Not Specified",
          bio: "Not Specified",
          photoUrl: user.imageUrl,
        };

        if (!checkUserExistsByEmail(user.email)) {
          await createUser(userData);
        }
      }

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
