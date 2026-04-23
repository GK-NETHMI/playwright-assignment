import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MemePage extends BasePage {
  readonly uploadArea: Locator;
  readonly selectFilesButton: Locator;
  readonly fileInput: Locator;
  readonly clearButton: Locator;
  readonly downloadButton: Locator;
  readonly previewSection: Locator;
  
  // Meme specific fields
  readonly topTextInput: Locator;
  readonly bottomTextInput: Locator;
  readonly generateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadArea = page.locator('text=Drag and drop your file here').first();
    this.selectFilesButton = page.getByRole('button', { name: /select files/i });
    this.fileInput = page.locator('input[type="file"]').first();
    this.clearButton = page.getByRole('button', { name: /clear/i });
    
    // We saw "Download Meme" in the snapshot
    this.downloadButton = page.getByRole('button', { name: /download/i }).last();
    this.previewSection = page.locator('text=Preview').first();
    
    // Textboxes for meme
    this.topTextInput = page.getByRole('textbox', { name: /top text/i });
    this.bottomTextInput = page.getByRole('textbox', { name: /bottom text/i });
    
    this.generateButton = page.getByRole('button', { name: /generate|create/i }).first();
  }

  async navigateToMemeGenerator() {
    await this.goto('/meme-generator');
  }

  async uploadImage(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(1500);
  }

  async verifyUploadSuccess() {
    await this.previewSection.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyUploadFailure() {
    await this.uploadArea.waitFor({ state: 'visible', timeout: 3000 });
  }

  async setTopText(text: string) {
    await this.topTextInput.fill(text);
    await this.page.waitForTimeout(500);
  }

  async setBottomText(text: string) {
    await this.bottomTextInput.fill(text);
    await this.page.waitForTimeout(500);
  }

  async clickGenerate() {
    if (await this.generateButton.isVisible().catch(() => false)) {
        await this.generateButton.click();
        await this.page.waitForTimeout(1000);
    }
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
