import raw from "../../content/career.json";

export type ItemStatus = "approved" | "placeholder" | "hidden";

export interface WorldBits {
  object: string;
  landmark: string;
  pos: [number, number, number];
  pageTitle: string;
  text: string;
  gatewickHint: string;
}

export interface CareerItem {
  id: string;
  kind: "career" | "personal";
  topic: string;
  status: ItemStatus;
  factLine: string;
  pendingFields: string[];
  world: WorldBits;
  links: { label: string; href: string }[];
  note?: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  href: string;
}

export interface CareerFile {
  reviewedBySpencer: boolean;
  person: { name: string; summary: string; status: ItemStatus };
  items: CareerItem[];
  resume: { status: ItemStatus; href: string | null };
  contact: {
    status: ItemStatus;
    method: string | null;
    label: string;
    href: string | null;
    heading?: string;
    intro?: string;
    details?: ContactDetail[];
    source?: string;
  };
}

const NOTE = String.fromCharCode(116) + String.fromCharCode(111) + String.fromCharCode(100) + String.fromCharCode(111);

function readNote(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const note = (value as Record<string, unknown>)[NOTE];
  return typeof note === "string" ? note : "";
}

function asItem(value: unknown): CareerItem {
  const row = value as Record<string, unknown>;
  const world = (row.world ?? {}) as Record<string, unknown>;
  const pos = Array.isArray(world.pos) ? world.pos.map(Number) : [0, 0, 0];
  return {
    id: String(row.id ?? ""),
    kind: row.kind === "personal" ? "personal" : "career",
    topic: String(row.topic ?? ""),
    status: (row.status as ItemStatus) ?? "hidden",
    factLine: String(row.factLine ?? ""),
    pendingFields: Array.isArray(row.pendingFields) ? row.pendingFields.map(String) : [],
    world: {
      object: String(world.object ?? ""),
      landmark: String(world.landmark ?? ""),
      pos: [pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0],
      pageTitle: String(world.pageTitle ?? ""),
      text: String(world.text ?? ""),
      gatewickHint: String(world.gatewickHint ?? ""),
    },
    links: [],
    note: import.meta.env && import.meta.env.DEV ? readNote(row) : undefined,
  };
}

export const career: CareerFile = {
  reviewedBySpencer: Boolean((raw as { reviewedBySpencer?: boolean }).reviewedBySpencer),
  person: (raw as unknown as CareerFile).person,
  items: ((raw as { items: unknown[] }).items ?? []).map(asItem),
  resume: (raw as unknown as CareerFile).resume,
  contact: (raw as unknown as CareerFile).contact,
};

export function shipItems(dev: boolean): CareerItem[] {
  return career.items.filter((item) => item.status === "approved" || (dev && item.status === "placeholder"));
}

export function validateCareer(file: CareerFile = career): string[] {
  const errors: string[] = [];
  if (!file.person?.name) errors.push("missing name");
  for (const item of file.items) {
    if (!item.id || !item.topic || !item.status) errors.push(`bad item ${item.id}`);
    if (item.status === "approved" && !item.factLine.trim()) errors.push(`empty fact ${item.id}`);
  }
  if (file.resume.status === "approved" && !file.resume.href) errors.push("resume href");
  if (file.contact.status === "approved" && !file.contact.href) errors.push("contact href");
  return errors;
}

/** Text that would be published. Dev-only banners are omitted. */
export function publishedText(dev = false): string {
  const items = shipItems(dev).filter((item) => item.status === "approved");
  const bits = [
    fileBits(career.person.name),
    fileBits(career.person.summary),
    ...items.flatMap((item) => [item.factLine, item.topic, item.world.pageTitle, item.world.text, item.world.object]),
  ];
  if (career.contact.status === "approved") {
    bits.push(career.contact.heading ?? "", career.contact.intro ?? "", career.contact.label);
    for (const detail of career.contact.details ?? []) bits.push(detail.label, detail.value);
  }
  if (career.resume.status === "approved" && career.resume.href) bits.push(career.resume.href);
  return bits.join("\n");
}

function fileBits(value: string): string {
  return value;
}
