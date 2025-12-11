import { test, expect } from '@playwright/test';

test.describe('Netzportal Core Tests', () => {

  // Helper function to login with test credentials
  async function loginAsTestUser(page: any, email: string = 'abc@efg.de', password: string = '123456') {
    await page.goto('/#/auth');
    await page.waitForLoadState('networkidle');
    
    // Fill in login form
    await page.fill('#login-email', email);
    await page.fill('#login-password', password);
    
    // Submit login form
    await page.click('button[type="submit"]');
    
    // Wait for navigation after successful login
    await page.waitForURL(/\/#\/$/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');
  }

  test('should load homepage and login', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should redirect to auth page if not logged in
    expect(page.url()).toContain('#/auth');
    expect(await page.isVisible('text=Netzportal')).toBe(true);
    expect(await page.isVisible('text=Anmelden')).toBe(true);
    
    // Test login functionality
    await loginAsTestUser(page);
    
    // Should now be on dashboard
    expect(page.url()).toMatch(/\/#\/$/);
  });

  test('should show dashboard content', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Look for dashboard-specific elements
    let dashboardLoaded = false;
    try {
      // Check for various dashboard elements that might be present
      const checks = [
        () => page.isVisible('text=Dashboard'),
        () => page.isVisible('text=Übersicht'),
        () => page.isVisible('text=Willkommen'),
        () => page.locator('h1, h2, h3').count().then(count => count > 0)
      ];
      
      for (const check of checks) {
        if (await check()) {
          dashboardLoaded = true;
          break;
        }
      }
    } catch (error) {
      console.log('Dashboard check failed:', error);
    }
    
    expect(dashboardLoaded).toBe(true);
  });

  test('should navigate to nachrichten', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/nachrichten');
    await page.waitForLoadState('networkidle');
    
    // Check for messages page content - look for actual content on the page
    const pageContent = await page.textContent('body');
    const hasNachrichtenContent = pageContent && (
      pageContent.includes('Nachrichten') || 
      pageContent.includes('Geplante Netzwartung') ||
      pageContent.includes('Terminvorschlag') ||
      pageContent.includes('Energieverbrauch')
    );
    
    expect(hasNachrichtenContent).toBe(true);
  });

  test('should navigate to termine', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/termine');
    await page.waitForLoadState('networkidle');
    
    // Check for appointments page content
    let termineLoaded = false;
    try {
      const checks = [
        () => page.isVisible('text=Termine'),
        () => page.isVisible('text=Terminübersicht'),
        () => page.isVisible('text=Erhaltene Termine'),
        () => page.isVisible('text=Gesendete Termine')
      ];
      
      for (const check of checks) {
        if (await check()) {
          termineLoaded = true;
          break;
        }
      }
    } catch (error) {
      console.log('Termine check failed:', error);
    }
    
    expect(termineLoaded).toBe(true);
  });

  test('should navigate to antraege', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/antraege');
    await page.waitForLoadState('networkidle');
    
    // Check for applications page content
    let antraegeLoaded = false;
    try {
      const checks = [
        () => page.isVisible('text=Anträge'),
        () => page.isVisible('text=Antrag'),
        () => page.isVisible('text=Neue Anlage'),
        () => page.isVisible('button:has-text("Neue Anlage")')
      ];
      
      for (const check of checks) {
        if (await check()) {
          antraegeLoaded = true;
          break;
        }
      }
    } catch (error) {
      console.log('Anträge check failed:', error);
    }
    
    expect(antraegeLoaded).toBe(true);
  });
});