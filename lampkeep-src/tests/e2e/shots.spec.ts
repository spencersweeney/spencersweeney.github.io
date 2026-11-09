import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const out = "/opt/cursor/artifacts";

test("exploration, journal, gatewick, career, and homepage shots", async ({ page }) => {
  mkdirSync(out, { recursive: true });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/lampkeep/?stage=stones");
  await expect(page.getByText("Hold lamp up: reveal the old stones")).toBeVisible();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/lampkeep-exploration.png` });

  await page.goto("/lampkeep/?stage=journal");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Career · Robotics")).toBeVisible();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/lampkeep-journal.png` });

  await page.goto("/lampkeep/?stage=gatewick");
  await expect(page.getByText("Braziers lit 1 / 4")).toBeVisible();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/lampkeep-gatewick.png` });

  await page.goto("/lampkeep/career/");
  await expect(page.getByRole("heading", { name: "Spencer Sweeney" })).toBeVisible();
  await page.screenshot({ path: `${out}/lampkeep-career.png`, fullPage: true });

  await page.route(/\.(png|jpe?g|hdr|glb|gif|webp)(\?|$)/i, (route) => route.abort());
  await page.goto("/");
  const link = page.locator("#career-link");
  await expect(link).toBeVisible();
  await link.scrollIntoViewIfNeeded();
  await page.locator(".welcome-footer").screenshot({ path: `${out}/lampkeep-homepage-link.png` });
});
