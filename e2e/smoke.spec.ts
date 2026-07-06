import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("hero shows name and tagline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Franco Testagrossa");
  await expect(page.getByText("Software Craftsman", { exact: false }).first()).toBeVisible();
});

test("contact policy: LinkedIn + GitHub, no email/whatsapp", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="https://www.linkedin.com/in/franco-testagrossa/"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://github.com/ffakenz"]').first()).toBeVisible();
  expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
  expect(await page.locator('a[href*="wa.me"], a[href*="whatsapp"]').count()).toBe(0);
});

test("CV download link is present", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator('a[href$=".pdf"]').count()).toBeGreaterThan(0);
});

test("no accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
