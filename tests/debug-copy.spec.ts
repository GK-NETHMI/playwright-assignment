import { test, expect } from '@playwright/test';
test('debug copy', async ({ page }) => {
  await page.goto('/color-picker');
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  
  const buttons = await page.getByRole('button', { name: /copy/i }).all();
  console.log('Number of copy buttons: ' + buttons.length);
  
  for (let i = 0; i < buttons.length; i++) {
    await buttons[i].click();
    await page.waitForTimeout(500);
    const text = await page.evaluate(() => navigator.clipboard.readText());
    console.log(`Button ${i} copied: ${text}`);
  }
});
