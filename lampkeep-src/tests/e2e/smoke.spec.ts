import { expect, test } from "@playwright/test";

test("title, move, pause, settings, and story", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/lampkeep/");
  await expect(page.getByRole("heading", { name: "Lampkeep of the Green Spire" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to career / resume" })).toHaveAttribute("href", "/lampkeep/career/");
  await page.getByRole("button", { name: "Story summary" }).click();
  await expect(page.getByText("You are the new Lampkeep.")).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect(page.locator("body")).toHaveClass(/mode-play/);
  await page.waitForTimeout(400);
  await page.keyboard.down("KeyW");
  await page.waitForTimeout(700);
  await page.keyboard.up("KeyW");
  const z = await page.evaluate(() => window.__LAMPKEEP?.player.z ?? 0);
  expect(z).toBeGreaterThan(1.4);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Resume" })).toBeVisible();
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByLabel("Endless lamp").click();
  await expect(page.getByLabel("Endless lamp")).not.toBeChecked();
  await page.getByRole("button", { name: "Back" }).click();
  const serious = errors.filter((line) => /shader|WebGL|three/i.test(line));
  expect(serious).toEqual([]);
});

test("a journal card takes focus and Escape closes it", async ({ page }) => {
  await page.goto("/lampkeep/");
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await page.evaluate(() => window.__LAMPKEEP?.teleport(-17, 10, 53));
  await page.keyboard.press("KeyF");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Keep exploring" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("portrait asks to rotate", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/lampkeep/");
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect(page.getByText("Rotate for touch controls")).toBeVisible();
});

test("homepage keeps takeoff and links to the career page", async ({ page }) => {
  await page.route(/\.(png|jpe?g|hdr|glb|gif|webp)(\?|$)/i, (route) => route.abort());
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Spencer Sweeney Website");
  const takeoff = page.locator("#takeoff-button");
  await expect(takeoff).toBeVisible();
  await expect(takeoff).toBeEnabled();
  const link = page.locator("#career-link");
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/lampkeep\/career\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "Spencer Sweeney" })).toBeVisible();
});

test("career page is static, has the job title, and skips the resume file", async ({ page }) => {
  const urls: string[] = [];
  page.on("request", (req) => urls.push(req.url()));
  const response = await page.goto("/lampkeep/career/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Spencer Sweeney: Career");
  await expect(page.getByRole("heading", { level: 1, name: "Spencer Sweeney" })).toBeVisible();
  await expect(page.getByText("Software engineer at SpaceX.")).toBeVisible();
  await expect(page.getByText("spencersweeney@gmail.com")).toBeVisible();
  await expect(page.getByRole("link", { name: /resume/i })).toHaveCount(0);
  await expect(page.getByText(/PLACEHOLDER|TODO|TO CONFIRM/)).toHaveCount(0);
  expect(urls.join(" ")).not.toMatch(/\.glb|\/three|lampkeep\/assets/);
});

test("career page works with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/lampkeep/career/");
  await expect(page.getByRole("heading", { level: 1, name: "Spencer Sweeney" })).toBeVisible();
  await expect(page.getByText("Software engineer at SpaceX.")).toBeVisible();
  await expect(page.getByText("spencersweeney@gmail.com")).toBeVisible();
  await context.close();
});
