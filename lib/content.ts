import fs from "fs";
import path from "path";
import type defaultContent from "@/data/site-content.json";

export type SiteContent = typeof defaultContent;

const CONTENT_FILE = path.join(process.cwd(), "data", "site-content.json");

export function getContent(): SiteContent {
  const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
  return JSON.parse(raw) as SiteContent;
}
