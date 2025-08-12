import { test, expect } from '@playwright/test';

const routes = ['/', '/leistungen', '/beratung', '/metallform'];
const viewports = [
  { width: 320, height: 640 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
];

test.describe('visual', () => {
  for (const route of routes) {
    for (const vp of viewports) {
      test(`${route} ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize(vp);
        await page.goto(route);
        const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        expect(hasHScroll).toBeFalsy();
        await page.screenshot({
          path: `tests/screenshots/${route.replace(/\//g, '_')}-${vp.width}x${vp.height}.png`,
          fullPage: true,
        });
      });
    }
  }
});
