import { NextResponse } from "next/server";
import { updateUserProfile } from "@/lib/actions/user.action";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    await updateUserProfile(Number(params.id), body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}
