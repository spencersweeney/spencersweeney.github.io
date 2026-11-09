import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function critical(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter((v) => v.impact === "critical");
}

test("title, about, settings, and story have no critical axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/lampkeep/");
  expect(await critical(page)).toEqual([]);
  await page.getByRole("button", { name: "About", exact: true }).click();
  expect(await critical(page)).toEqual([]);
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Story Summary" }).click();
  await expect(page.getByText("rekindles the Spire gate")).toBeVisible();
  expect(await critical(page)).toEqual([]);
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Settings" }).click();
  await expect(page.getByLabel("Assists master")).toBeChecked();
  expect(await critical(page)).toEqual([]);
});
