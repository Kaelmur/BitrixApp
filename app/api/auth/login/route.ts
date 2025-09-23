import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = stmt.get(email) as User | undefined;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, { httpOnly: true, secure: true });
    return res;
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
