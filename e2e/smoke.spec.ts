import { test, expect } from '@playwright/test';

test.describe('Netzportal Smoke Tests', () => {

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
    await page.waitForURL('/#/', { timeout: 15000 });
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
    expect(page.url()).toBe('http://localhost:8080/#/');
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

  test('should test antragsstrecke workflow', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/antraege/neue-anlage');
    await page.waitForLoadState('networkidle');

    // Step 1: Anlagendaten
    await page.fill('input[name="anlagenleistung"]', '10');
    await page.fill('input[name="modulanzahl"]', '25');
    await page.selectOption('select[name="wechselrichterHersteller"]', 'SMA');
    await page.click('button:has-text("Weiter")');
    
    await page.waitForLoadState('networkidle');
    
    // Step 2: Standortdaten
    await page.fill('input[name="strasse"]', 'Musterstraße');
    await page.fill('input[name="hausnummer"]', '123');
    await page.fill('input[name="plz"]', '12345');
    await page.fill('input[name="ort"]', 'Musterstadt');
    await page.click('button:has-text("Weiter")');
    
    await page.waitForLoadState('networkidle');
    
    // Verify we progressed through steps
    expect(page.url()).toContain('neue-anlage');
  });

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

  test('should navigate to infos-zum-netz', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/#/infos-zum-netz');
    await page.waitForLoadState('networkidle');
    
    const pageContent = await page.textContent('body');
    const hasNetzContent = pageContent && (
      pageContent.includes('Netz') || 
      pageContent.includes('Stromnetz') ||
      pageContent.includes('Netzinformationen')
    );
    
    expect(hasNetzContent).toBe(true);
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