import { test, expect } from '@playwright/test';
import path from 'path';

test('Image to Text OCR Test', async ({ page }) => {

  await page.goto('https://www.pixelssuite.com/');

  await page.click('text=More Tools');
  await page.click('text=Image → Text');

  const filePath = path.join(__dirname, '../test-data/test-image.png');
  await page.setInputFiles('input[type="file"]', filePath);

  // Wait until OCR text appears
  await page.waitForFunction(() => {
    const el = document.querySelector('textarea');
    return el && el.value.trim().length > 0;
  }, { timeout: 15000 });

  const result = page.locator('textarea');

  // Get value correctly
  const value = await result.inputValue();

  // Assertion
  expect(value.trim().length).toBeGreaterThan(0);

  console.log('Extracted Text:', value);

  await page.screenshot({ path: 'screenshots/ocr-result.png' });

});
