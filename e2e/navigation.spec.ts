import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate through all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Test sidebar navigation
    const sidebarLinks = [
      { text: 'Dashboard', url: '/#/' },
      { text: 'Meine Benachrichtigungen', url: '/#/nachrichten' },
      { text: 'Meine Termine', url: '/#/termine' },
      { text: 'Meine Anträge', url: '/#/antraege' },
      { text: 'Energieverbrauch', url: '/#/verbrauch' }
    ];

    for (const link of sidebarLinks) {
      await page.getByText(link.text).first().click();
      await page.waitForURL(link.url);
      await expect(page).toHaveURL(link.url);
      
      // Wait a bit for page to load
      await page.waitForTimeout(1000);
    }
  });

  test('should show proper role-based content for kunde', async ({ page }) => {
    await page.goto('/#/');
    
    // Check that customer-specific elements are visible
    await expect(page.getByText('Willkommen')).toBeVisible();
    
    // Should not see installer-specific content
    await expect(page.getByText('Ihre Installationsprojekte')).not.toBeVisible();
  });
});