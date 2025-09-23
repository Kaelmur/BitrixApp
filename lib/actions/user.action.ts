"use server";

import db from "@/lib/db";
import { User } from "@/types";

export async function getUserById(id: number): Promise<User | null> {
  const stmt = db.prepare(
    "SELECT id, name, email, phone, address FROM users WHERE id = ?"
  );
  const user = stmt.get(id) as User | undefined;
  return user ?? null;
}

export async function updateUserProfile(
  id: number,
  data: Partial<Omit<User, "id">>
) {
  const entries = Object.entries(data) as [keyof Omit<User, "id">, unknown][];

  if (entries.length === 0) return;

  const setClause = entries.map(([field]) => `${field} = ?`).join(", ");
  const values = entries.map(([_, value]) => value);

  const stmt = db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`);
  stmt.run(...values, id);
}
