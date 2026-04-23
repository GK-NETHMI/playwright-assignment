import { test, expect } from './fixtures';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { PdfEditorPage } from '../pages/PdfEditorPage';

test.describe('PDF Editor Feature Tests', () => {
  let homePage: HomePage;
  let pdfEditorPage: PdfEditorPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    pdfEditorPage = new PdfEditorPage(page);
    await homePage.navigateToHome();
    await pdfEditorPage.navigateToPdfEditor();
  });

  // Test Case 1: Successful PDF Upload and Export
  test('TC01: Successful PDF Upload and Export', async ({ page }) => {
    const pdfPath = path.resolve(__dirname, '../test-data/valid.pdf');
    await pdfEditorPage.uploadPdf(pdfPath);
    await pdfEditorPage.verifyUploadSuccess();

    const download = await pdfEditorPage.clickDownload();

    expect(download).not.toBeNull();
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
