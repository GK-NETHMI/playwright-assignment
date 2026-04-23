import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PdfEditorPage extends BasePage {
  readonly uploadInput: Locator;
  readonly toolbar: Locator;
  readonly downloadButton: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadInput = page.locator('input[type="file"]').first();
    this.toolbar = page.locator('text=Toolbar').locator('..').first(); 
    this.downloadButton = page.getByRole('button', { name: /download|save|export/i }).last();
  }

  async navigateToPdfEditor() {
    await this.goto('/pdf-editor');
  }

  async uploadPdf(filePath: string) {
    await this.uploadInput.waitFor({ state: 'attached' });
    await this.uploadInput.setInputFiles(filePath);
    await this.page.waitForTimeout(1500);
  }

  async verifyUploadSuccess() {
    const noFileText = this.page.locator('text=No file chosen');
    await expect(noFileText).toBeHidden({ timeout: 10000 });
  }

  async verifyUploadFailure() {
    const noFileText = this.page.locator('text=No file chosen');
    await expect(noFileText).toBeVisible({ timeout: 5000 });
  }

  async clickDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click()
    ]);
    return download;
  }
}
