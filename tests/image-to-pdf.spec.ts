import { test, expect } from './fixtures';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { ImageToPdfPage } from '../pages/ImageToPdfPage';

test.describe('Image to PDF Feature Tests', () => {
  let homePage: HomePage;
  let imageToPdfPage: ImageToPdfPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    imageToPdfPage = new ImageToPdfPage(page);
    await homePage.navigateToHome();
    await imageToPdfPage.navigateToImageToPdf();
  });

  // Test Case 1: Successful Image to PDF Conversion
  test('TC01: Successful Image to PDF Conversion', async ({ page }) => {
    // 1. Upload a supported image file
    const imagePath = path.resolve(__dirname, '../test-data/test-image.png');
    await imageToPdfPage.uploadImage(imagePath);
    await imageToPdfPage.verifyUploadSuccess();

    // 2. Click the "Download" button
    const download = await imageToPdfPage.clickDownload();

    // 3. Verify that the downloaded file is a PDF
    expect(download).not.toBeNull();
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
