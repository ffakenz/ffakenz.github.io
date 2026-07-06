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
  // Reveal (src/components/site/Reveal.tsx) intentionally skips its mount-triggered
  // hide/reveal opacity transition under prefers-reduced-motion, so reduced-motion
  // and no-JS users always see fully-opaque content. Scanning under that same media
  // feature is what makes the check deterministic: without it, axe can sample the
  // page mid-transition (a transient, non-representative opacity) instead of the
  // settled, fully-visible state — a false positive unrelated to the actual palette.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("about section shows origin", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("raised in Argentina", { exact: false })).toBeVisible();
});

test("experience lists all five companies", async ({ page }) => {
  await page.goto("/");
  for (const c of ["Input Output (IOHK)", "Valsea IT", "Letgo", "Tiendanube", "Wicom"]) {
    await expect(page.getByRole("heading", { name: c })).toBeVisible();
  }
});

test("skills section shows groups", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Languages", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Scala (9y)", { exact: false })).toBeVisible();
});

test("education shows the university", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Universidad Blas Pascal", { exact: false }).first()).toBeVisible();
});
