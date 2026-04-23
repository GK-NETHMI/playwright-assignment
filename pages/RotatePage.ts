import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RotatePage extends BasePage {
  readonly uploadArea: Locator;
  readonly selectFilesButton: Locator;
  readonly fileInput: Locator;
  readonly clearButton: Locator;
  readonly downloadButton: Locator;
  readonly previewSection: Locator;
  readonly rotateLeftButton: Locator;
  readonly rotateRightButton: Locator;
  readonly rotateSlider: Locator;

  constructor(page: Page) {
    super(page);
    this.uploadArea = page.locator('text=Drag and drop your file here').first();
    this.selectFilesButton = page.getByRole('button', { name: /select files/i });
    this.fileInput = page.locator('input[type="file"]').first();
    this.clearButton = page.getByRole('button', { name: /clear/i });
    this.downloadButton = page.getByRole('button', { name: /download rotated/i }).last();
    this.previewSection = page.locator('text=Preview').first();
    
    // Rotate controls
    this.rotateLeftButton = page.getByRole('button', { name: '-90°' }).first();
    this.rotateRightButton = page.getByRole('button', { name: '+90°' }).first();
    this.rotateSlider = page.locator('input[type="range"]').first();
  }

  async navigateToRotate() {
    await this.goto('/rotate-image');
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

  async clickRotateRight() {
    await this.rotateRightButton.click();
    await this.page.waitForTimeout(500);
  }
  
  async clickRotateLeft() {
    await this.rotateLeftButton.click();
    await this.page.waitForTimeout(500);
  }

  async setRotation(degrees: number) {
    await this.rotateSlider.fill(degrees.toString());
    await this.page.waitForTimeout(500);
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
