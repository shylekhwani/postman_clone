import { NextResponse } from "next/server";
import { currentUser } from "@/modules/authentication/actions";
import { acceptWorkspaceInvite } from "@/modules/invites/actions";

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const result = await acceptWorkspaceInvite(token);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid or expired invite" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
