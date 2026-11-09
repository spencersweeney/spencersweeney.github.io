import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function noCritical(page: Page, label: string): Promise<void> {
  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((item) => item.impact === "critical");
  expect(critical, `${label}\n${JSON.stringify(critical, null, 2)}`).toEqual([]);
}

async function begin(page: Page): Promise<void> {
  await page.addInitScript(() => localStorage.removeItem("lampkeep.v1.slice"));
  await page.goto("/lampkeep/");
  await page.getByRole("button", { name: "New Night" }).click();
  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.locator("[data-bell]")).toContainText("Bell 1");
}

test("title, play, about, and epilogue have no critical axe violations", async ({ page }) => {
  await page.goto("/lampkeep/");
  await noCritical(page, "title");

  await page.getByRole("button", { name: "New Night" }).click();
  await page.getByRole("button", { name: "Begin" }).click();
  await noCritical(page, "play");

  await page.getByRole("button", { name: "About" }).first().click();
  await expect(page.getByRole("dialog", { name: "About" })).toBeVisible();
  await expect(page.getByRole("dialog")).not.toContainText("TO CONFIRM");
  await noCritical(page, "about");
  await page.keyboard.press("Escape");

  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Title screen" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
});

test("homepage space site still serves", async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (/\.(png|jpe?g|glb|hdr|gif|webp)(\?|$)/i.test(url)) return route.abort();
    return route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/Spencer Sweeney Website/);
  await expect(page.locator("#takeoff-button")).toBeVisible();
  await expect(page.locator("#takeoff-button")).toBeEnabled();
});

test("layouts fit and controls are at least 44px", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await begin(page);
    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const small = Array.from(document.querySelectorAll("button, a, input, select")).flatMap((el) => {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return [];
        const rect = el.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return [];
        if (rect.width < 44 || rect.height < 44) {
          return [`${el.tagName} ${(el.textContent || "").trim().slice(0, 48)} ${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`];
        }
        return [];
      });
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, small };
    });
    expect(metrics.scrollWidth, `${viewport.width} overflow`).toBeLessThanOrEqual(metrics.clientWidth + 1);
    expect(metrics.small, `${viewport.width} targets`).toEqual([]);
  }
});
