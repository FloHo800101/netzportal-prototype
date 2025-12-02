import { test, expect } from '@playwright/test';

test.describe('Netzportal Additional Pages', () => {

  // Helper function to login with test credentials
  async function loginAsTestUser(page: any, email: string = 'abc@efg.de', password: string = '123456') {
    await page.goto('/#/auth');
    await page.waitForLoadState('networkidle');
    
    await page.fill('#login-email', email);
    await page.fill('#login-password', password);
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/#/', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
  }

  test('should navigate to verbrauch', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/verbrauch');
    await page.waitForLoadState('networkidle');
    
    const pageContent = await page.textContent('body');
    const hasVerbrauchContent = pageContent && (
      pageContent.includes('Verbrauch') || 
      pageContent.includes('kWh') ||
      pageContent.includes('Energie')
    );
    
    expect(hasVerbrauchContent).toBe(true);
  });

  test('should navigate to meine-anschluesse', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/meine-anschluesse');
    await page.waitForLoadState('networkidle');
    
    const pageContent = await page.textContent('body');
    const hasAnschluesseContent = pageContent && (
      pageContent.includes('Anschlüsse') || 
      pageContent.includes('Anschluss') ||
      pageContent.includes('Zähler')
    );
    
    expect(hasAnschluesseContent).toBe(true);
  });

  test('should navigate to rechtliches', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/rechtliches');
    await page.waitForLoadState('networkidle');
    
    const pageContent = await page.textContent('body');
    const hasRechtlichesContent = pageContent && (
      pageContent.includes('Rechtliches') || 
      pageContent.includes('Datenschutz') ||
      pageContent.includes('AGB') ||
      pageContent.includes('Impressum')
    );
    
    expect(hasRechtlichesContent).toBe(true);
  });
});