import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const out = "/opt/cursor/artifacts";

test("gameplay, touch, and boss screenshots", async ({ page }) => {
  mkdirSync(out, { recursive: true });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/lampkeep/");
  await page.waitForTimeout(500);
  await page.evaluate(() => window.__LAMPKEEP?.stage("road"));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/lampkeep-desktop-gameplay.png` });
  await expect(page.locator("body")).toHaveClass(/mode-play/);

  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/lampkeep/?touch=1");
  await page.waitForTimeout(400);
  await page.evaluate(() => window.__LAMPKEEP?.stage("road"));
  await page.waitForTimeout(300);
  await expect(page.getByRole("button", { name: "Attack" })).toBeVisible();
  await page.screenshot({ path: `${out}/lampkeep-mobile-touch.png` });

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/lampkeep/");
  await page.waitForTimeout(400);
  await page.evaluate(() => window.__LAMPKEEP?.stage("boss"));
  await page.waitForTimeout(300);
  await expect(page.getByText("Gatewick", { exact: true })).toBeVisible();
  await page.screenshot({ path: `${out}/lampkeep-miniboss.png` });
});
