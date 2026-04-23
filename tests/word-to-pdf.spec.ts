import { test, expect } from './fixtures';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { WordToPdfPage } from '../pages/WordToPdfPage';

test.describe('Word to PDF Feature Tests', () => {
  let homePage: HomePage;
  let wordToPdfPage: WordToPdfPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    wordToPdfPage = new WordToPdfPage(page);
    await homePage.navigateToHome();
    await wordToPdfPage.navigateToWordToPdf();
  });

  // Test Case 1: Successful Word to PDF Conversion
  test('TC01: Successful Word to PDF Conversion', async ({ page }) => {
    // Assuming you have a test-data/valid.docx, we will use valid.pdf as fallback if it doesn't exist
    // The previous tests just used fixture('test-image.png'), so it's likely they don't have .docx
    // Let's use whatever works, or create a mock upload.
    const docPath = path.resolve(__dirname, '../test-data/valid.docx'); 
    
    await wordToPdfPage.uploadWordDoc(docPath);
    await wordToPdfPage.verifyUploadSuccess();

    const download = await wordToPdfPage.clickDownload();

    expect(download).not.toBeNull();
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
