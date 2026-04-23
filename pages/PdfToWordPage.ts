import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PdfToWordPage extends BasePage {
  readonly uploadArea: Locator;
  readonly selectFilesButton: Locator;
  readonly fileInput: Locator;
  readonly clearButton: Locator;
  readonly downloadButton: Locator;
  readonly previewSection: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadArea = page.locator('text=Drag and drop your file here').first();
    this.selectFilesButton = page.getByRole('button', { name: /select files/i });
    this.fileInput = page.locator('input[type="file"]').first();
    this.clearButton = page.getByRole('button', { name: /clear/i });
    this.downloadButton = page.getByRole('button', { name: /convert to word/i }).last();
    this.previewSection = page.locator('text=Preview').first();
  }

  async navigateToPdfToWord() {
    await this.goto('/pdf-to-word');
  }

  async uploadPdf(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(1500);
  }

  async verifyUploadSuccess() {
    await this.downloadButton.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyUploadFailure() {
    await this.uploadArea.waitFor({ state: 'visible', timeout: 3000 });
  }

  async clickDownload() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click()
    ]);
    return download;
  }

  async clickClear() {
    await this.clearButton.click();
    await this.page.waitForTimeout(500);
  }
}
