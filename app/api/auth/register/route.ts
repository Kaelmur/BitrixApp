import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { createContactInBitrix } from "@/lib/bitrix";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashed = await bcrypt.hash(password, 10);

    const stmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    );
    stmt.run(name, email, hashed);

    await createContactInBitrix(name, email);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 400 }
    );
  }
}
