import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const file = fileURLToPath(new URL("../content/career.json", import.meta.url));
const data = JSON.parse(readFileSync(file, "utf8"));
const errors = [];
const held = [];
if (!data.person?.name) errors.push("missing name");
for (const item of data.items ?? []) {
  if (!item.id || !item.topic || !item.status) errors.push(`bad item ${item.id}`);
  if (item.status !== "approved") held.push(`${item.id} (${item.status})`);
  if (item.status === "approved" && !String(item.factLine ?? "").trim()) errors.push(`empty fact ${item.id}`);
}
if (data.resume?.status === "approved" && !data.resume.href) errors.push("resume href");
if (data.contact?.status === "approved" && !data.contact.href) errors.push("contact href");
console.log(held.length ? `placeholders kept out of production: ${held.join(", ")}` : "no placeholders");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
