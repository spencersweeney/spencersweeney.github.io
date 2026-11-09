import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function serious(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
}

test("title, story, settings, and a journal card have no serious axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lampkeep/");
  expect(await serious(page)).toEqual([]);
  await page.getByRole("button", { name: "Story summary" }).click();
  await expect(page.getByText("You are the new Lampkeep.")).toBeVisible();
  expect(await serious(page)).toEqual([]);
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Settings" }).click();
  await expect(page.getByLabel("Endless lamp")).toBeChecked();
  expect(await serious(page)).toEqual([]);
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await page.evaluate(() => window.__LAMPKEEP?.stage("journal"));
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await serious(page)).toEqual([]);
});

test("career page has no serious axe violations on desktop or mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lampkeep/career/");
  expect(await serious(page)).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/lampkeep/career/");
  expect(await serious(page)).toEqual([]);
});

test("career page does not overflow and keeps 44px targets", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/lampkeep/career/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
    expect(overflow).toBe(true);
    const small = await page.locator("a, button, input, select").evaluateAll((els) => els.filter((el) => {
      const box = el.getBoundingClientRect();
      if (box.width < 1 || box.height < 1) return false;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") return false;
      return box.width < 44 || box.height < 44;
    }).map((el) => (el.textContent || el.getAttribute("aria-label") || el.tagName).trim()));
    expect(small).toEqual([]);
  }
});
