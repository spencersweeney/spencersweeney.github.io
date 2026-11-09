import { expect, test } from "@playwright/test";

test("title, move, pause, settings, and about", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/lampkeep/");
  await expect(page.getByRole("heading", { name: "Lampkeep of the Green Spire" })).toBeVisible();
  await expect(page.getByText("Assists are ON by default")).toBeVisible();
  await page.getByRole("button", { name: "About", exact: true }).click();
  await expect(page.getByText("(No contact link in this build.)")).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/mode-about/);
  await expect(page.locator("a")).toHaveCount(0);
  await page.getByRole("button", { name: "Back" }).click();
  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.locator("body")).toHaveClass(/mode-play/);
  await page.waitForTimeout(400);
  await page.keyboard.down("KeyW");
  await page.waitForTimeout(700);
  await page.keyboard.up("KeyW");
  const z = await page.evaluate(() => window.__LAMPKEEP?.player.z ?? 0);
  expect(z).toBeGreaterThan(0.8);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Settings" })).toBeVisible();
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByLabel("Assists master").click();
  await expect(page.getByLabel("Assists master")).not.toBeChecked();
  await page.locator("#back").click();
  await page.getByRole("button", { name: "Title" }).click();
  await expect(page.getByText("Assists are currently off for this save.")).toBeVisible();
  const serious = errors.filter((line) => /shader|WebGL|three/i.test(line));
  expect(serious).toEqual([]);
});

test("portrait asks to rotate", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/lampkeep/");
  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.getByText("Rotate for touch controls")).toBeVisible();
});

test("homepage is still the space site", async ({ page }) => {
  await page.route(/\.(png|jpe?g|hdr|glb|webp)(\?|$)/i, (route) => route.abort());
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Spencer Sweeney Website");
  await expect(page.locator("h2", { hasText: "Space Controls" })).toBeVisible();
  await expect(page.locator("#takeoff-button")).toBeVisible();
});

test("lampkeep path responds", async ({ request }) => {
  const home = await request.get("/");
  const game = await request.get("/lampkeep/");
  expect(home.status()).toBe(200);
  expect(game.status()).toBe(200);
  expect(await game.text()).toContain("Lampkeep of the Green Spire");
  expect(await home.text()).toContain("Spencer Sweeney Website");
  expect(await home.text()).not.toContain("Lampkeep of the Green Spire");
});
