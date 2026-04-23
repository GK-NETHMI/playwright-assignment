import { test, expect } from './fixtures';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { RotatePage } from '../pages/RotatePage';

test.describe('Rotate Image Feature Tests', () => {
  let homePage: HomePage;
  let rotatePage: RotatePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    rotatePage = new RotatePage(page);
    await homePage.navigateToHome();
    await rotatePage.navigateToRotate();
  });

  // Test Case 1: Successful Image Rotation
  test('TC01: Successful Image Rotation', async ({ page }) => {
    const imagePath = path.resolve(__dirname, '../test-data/test-image.png');
    await rotatePage.uploadImage(imagePath);
    await rotatePage.verifyUploadSuccess();

    await rotatePage.clickRotateRight();
    await rotatePage.setRotation(45);

    const download = await rotatePage.clickDownload();

    expect(download).not.toBeNull();
    expect(download.suggestedFilename()).toMatch(/\.(png|jpg|jpeg|webp)$/i);
  });

  // Test Case 2: "Clear" Functionality
  test('TC02: Clear Functionality', async ({ page }) => {
    const imagePath = path.resolve(__dirname, '../test-data/test-image.png');
    await rotatePage.uploadImage(imagePath);
    await rotatePage.verifyUploadSuccess();

    await rotatePage.clickClear();

    await rotatePage.verifyUploadFailure();
    await expect(rotatePage.downloadButton).toBeHidden({ timeout: 3000 });
  });
});
