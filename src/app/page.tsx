import { Button } from "@/components/ui/button";
import { currentUser } from "@/modules/authentication/actions";
import UserButton from "@/modules/authentication/components/UserButton";

export default async function Home() {
  const currUser = await currentUser();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <UserButton user={currUser} />
    </div>
  );
}
