import { test, expect } from './fixtures';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { MemePage } from '../pages/MemePage';

test.describe('Meme Generator Feature Tests', () => {
  let homePage: HomePage;
  let memePage: MemePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    memePage = new MemePage(page);
    await homePage.navigateToHome();
    await memePage.navigateToMemeGenerator();
  });

  // Test Case 1: Successful Meme Generation
  test('TC01: Successful Meme Generation', async ({ page }) => {
    const imagePath = path.resolve(__dirname, '../test-data/test-image.png');
    await memePage.uploadImage(imagePath);
    await memePage.verifyUploadSuccess();

    await memePage.setTopText('Top text');
    await memePage.setBottomText('Bottom text');

    await memePage.clickGenerate();

    const download = await memePage.clickDownload();

    expect(download).not.toBeNull();
    expect(download.suggestedFilename()).toMatch(/\.(png|jpg|jpeg|webp)$/i);
  });
});
