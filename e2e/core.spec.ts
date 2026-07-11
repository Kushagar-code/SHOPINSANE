import { test, expect } from '@playwright/test';

test('Core E2E Mock Flow', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('h1')).toContainText('INSANE TECH.');
  await page.waitForTimeout(2500);

  // 2. Add Item to Cart
  const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
  await addToCartButton.click({ force: true });
  
  // 3. Open Drawer
  await expect(page.locator('text=Your Cart')).toBeVisible();
  await expect(page.locator('text=Proceed to Checkout')).toBeVisible();

  // 4. Checkout Navigation
  await page.locator('text=Proceed to Checkout').click();
  await expect(page).toHaveURL(/.*checkout/);
  
  // Check form loads
  await expect(page.locator('h1')).toContainText('Secure Checkout');
});
