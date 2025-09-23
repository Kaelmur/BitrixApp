"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import db from "@/lib/db";
import { JwtPayload, User } from "@/types";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const stmt = db.prepare("SELECT id, name, email FROM users WHERE id = ?");
    const user = stmt.get(decoded.id) as User | undefined;

    if (!user) return null;

    return user;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
