import { expect, test, type Page } from "@playwright/test";

async function focusText(page: Page, text: string): Promise<void> {
  await page.evaluate(() => {
    const body = document.body;
    body.setAttribute("tabindex", "-1");
    body.focus();
  });
  for (let i = 0; i < 80; i++) {
    const label = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) return "";
      return `${el.getAttribute("aria-label") ?? ""} ${el instanceof HTMLElement ? el.innerText : ""}`;
    });
    if (label.includes(text)) return;
    await page.keyboard.press("Tab");
  }
  throw new Error(`Could not tab to ${text}`);
}

async function ackEvents(page: Page): Promise<void> {
  for (let i = 0; i < 4; i++) {
    const dialog = page.getByRole("dialog");
    if ((await dialog.count()) === 0) return;
    if (!(await dialog.isVisible())) return;
    const title = await dialog.locator("h2").innerText();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(40);
    if (/double knock/i.test(title)) {
      await page.keyboard.press("e");
      await page.waitForTimeout(40);
    }
  }
}

async function bell(page: Page): Promise<string> {
  return (await page.locator("[data-bell]").innerText()).replace(/\s+/g, " ");
}

test("a night can be finished from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/lampkeep/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toContainText("New Night");
  await page.keyboard.press("Enter");
  await expect(page.locator(":focus")).toContainText("Begin");
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-bell]")).toContainText("Bell 1");

  await focusText(page, "Map Room");
  await page.keyboard.press("1");
  await focusText(page, "Kettle");
  await page.keyboard.press("Enter");
  await focusText(page, "Map Table");
  await page.keyboard.press("Enter");
  await focusText(page, "Map Room");
  await page.keyboard.press("2");
  await focusText(page, "Mira of the Switchbacks");
  await page.keyboard.press("3");
  await ackEvents(page);
  await expect.poll(() => bell(page)).toContain("Bell 2");

  await focusText(page, "Hearth Hall");
  await page.keyboard.press("1");
  await page.keyboard.press("4");
  await expect(page.getByRole("dialog", { name: "Mediate the Hearth" })).toBeVisible();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toContainText("Share the hearth");
  await page.keyboard.press("Enter");
  await ackEvents(page);
  await expect.poll(() => bell(page)).toContain("Bell 3");

  await page.keyboard.press("e");
  await ackEvents(page);
  await expect.poll(() => bell(page)).toContain("Bell 4");

  await focusText(page, "Refuse");
  await page.keyboard.press("Enter");
  await page.keyboard.press("e");
  await ackEvents(page);
  await expect.poll(() => bell(page)).toContain("Bell 5");

  await page.keyboard.press("e");
  await ackEvents(page);
  await expect.poll(() => bell(page)).toContain("Bell 6");

  await page.keyboard.press("d");
  await expect(page.getByRole("dialog", { name: "Ring Dawn" })).toBeVisible();
  await page.keyboard.press("Enter");
  const outcome = page.locator("[data-outcome]");
  await expect(outcome).toBeVisible();
  await expect(outcome).toHaveAttribute("data-outcome", /warm|perfect/);

  await focusText(page, "About");
  await page.keyboard.press("Enter");
  const about = page.getByRole("dialog", { name: "About" });
  await expect(about).toBeVisible();
  await expect(about).toContainText("Spencer Sweeney");
  await expect(about).not.toContainText("TO CONFIRM");
  await expect(about).not.toContainText("@");
});
