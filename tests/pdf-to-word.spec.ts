import { test, expect } from './fixtures';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { PdfToWordPage } from '../pages/PdfToWordPage';

test.describe('PDF to Word Feature Tests', () => {
  let homePage: HomePage;
  let pdfToWordPage: PdfToWordPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    pdfToWordPage = new PdfToWordPage(page);
    await homePage.navigateToHome();
    await pdfToWordPage.navigateToPdfToWord();
  });

  // Test Case 1: Successful PDF to Word Conversion
  test('TC01: Successful PDF to Word Conversion', async ({ page }) => {
    const pdfPath = path.resolve(__dirname, '../test-data/valid.pdf');
    await pdfToWordPage.uploadPdf(pdfPath);
    await pdfToWordPage.verifyUploadSuccess();

    const download = await pdfToWordPage.clickDownload();

    expect(download).not.toBeNull();
    expect(download.suggestedFilename()).toMatch(/\.(doc|docx)$/i);
  });
});
