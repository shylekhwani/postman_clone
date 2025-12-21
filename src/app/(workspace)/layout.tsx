import Header from "@/modules/layouts/components/Header";
import { currentUser } from "@/modules/authentication/actions";
import { initializeWorkspace } from "@/modules/workspace/action";
import TabbedLeftPanel from "@/modules/workspace/components/TabbedLeftPannel";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  // 🚫 BLOCK UNAUTHENTICATED USERS
  if (!user) {
    redirect("/signin");
  }
  const workspace = await initializeWorkspace();
  console.log(workspace);
  return (
    <>
      {/* @ts-expect-error Fix user type later */}
      <Header user={user} />
      <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
        <div className="flex h-full w-full">
          <div className="w-12 border-r border-zinc-800 bg-zinc-900">
            <TabbedLeftPanel />
          </div>
          <div className="flex-1 bg-zinc-950">{children}</div>
        </div>
      </main>
    </>
  );
};

export default RootLayout;
