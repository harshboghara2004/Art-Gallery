import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center w-full mt-10 mx-auto">
      <SignUp />
    </main>
  );
}
