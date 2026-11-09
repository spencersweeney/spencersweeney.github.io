import { expect, test, type Page } from "@playwright/test";

const out = "/opt/cursor/artifacts";

async function dismiss(page: Page): Promise<void> {
  for (let i = 0; i < 4; i++) {
    const dialog = page.getByRole("dialog");
    if (!(await dialog.isVisible().catch(() => false))) return;
    const title = await dialog.locator("h2").innerText();
    await dialog.getByRole("button").first().click();
    if (/double knock/i.test(title)) {
      await page.getByRole("button", { name: "End Bell" }).first().click();
    }
  }
}

test("capture desktop play, mobile play, and dawn", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lampkeep/");
  await page.getByRole("button", { name: "New Night" }).click();
  await page.getByRole("button", { name: "Begin" }).click();
  await page.locator("[data-room='map_room']").click();
  await page.getByRole("button", { name: /^Light/ }).click();
  await page.getByRole("button", { name: /Kettle/ }).click();
  await page.getByRole("button", { name: /Map Table/ }).click();
  await page.getByRole("button", { name: /^Stage/ }).click();
  await page.getByRole("button", { name: /^Invite/ }).click();
  await dismiss(page);
  await expect(page.locator("[data-bell]")).toContainText("Bell 2");
  await page.screenshot({ path: `${out}/lampkeep-desktop-play.png`, fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${out}/lampkeep-mobile-play.png` });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator("[data-room='hearth_hall']").click();
  await page.getByRole("button", { name: /^Light/ }).click();
  await page.getByRole("button", { name: /^Mediate/ }).click();
  await page.getByRole("button", { name: /Share the hearth/ }).click();
  await dismiss(page);

  await page.getByRole("button", { name: "End Bell" }).first().click();
  await dismiss(page);
  await page.getByRole("button", { name: /^Refuse/ }).click();
  await page.getByRole("button", { name: "End Bell" }).first().click();
  await dismiss(page);
  await page.getByRole("button", { name: "End Bell" }).first().click();
  await dismiss(page);

  await page.locator("[data-focus='dawn']").click();
  await page.locator("[data-focus='dawn-yes']").click();
  await expect(page.locator("[data-outcome]")).toHaveAttribute("data-outcome", /warm|perfect/);
  await page.screenshot({ path: `${out}/lampkeep-dawn.png`, fullPage: true });
});
