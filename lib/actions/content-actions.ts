"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const CONTENT_FILE = path.join(process.cwd(), "data", "site-content.json");

export async function updateSection(key: string, data: unknown): Promise<void> {
  const current = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
  current[key] = data;
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(current, null, 2), "utf-8");
  revalidatePath("/", "layout");
}
