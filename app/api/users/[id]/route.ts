import { NextRequest, NextResponse } from "next/server";
import { updateUserProfile } from "@/lib/actions/user.action";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    await updateUserProfile(Number(id), body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}
