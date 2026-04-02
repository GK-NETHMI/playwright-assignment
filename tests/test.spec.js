import { test, expect } from '@playwright/test';

test.describe('Pixelssuite Automation Tests', () => {

  test('Homepage should load correctly', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    
    await expect(page).toHaveURL(/pixelssuite/);
    await expect(page).toHaveTitle(/Pixel/);

    await page.screenshot({ path: 'screenshots/homepage.png' });
  });

  test('Navigation to Contact page', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');

    const contactLink = page.locator('a:has-text("Contact")');
    await contactLink.click();

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/navigation.png' });
  });

  test('Page stability test', async ({ page }) => {
    await page.goto('https://www.pixelssuite.com/');
    
    await page.reload();
    await page.reload();

    await page.screenshot({ path: 'screenshots/stability.png' });
  });

});