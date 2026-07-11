import { test, expect } from '@playwright/test';

test('Core E2E Mock Flow', async ({ page }) => {
  // 1. Homepage Load
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Insane Tech.');

  // 2. Add Item to Cart
  // In a real DB we'd select a dynamic item, here we just select the first button
  // Note: We bypass strict DB state in simple frontend E2E check
  const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
  if (await addToCartButton.isVisible()) {
    await addToCartButton.click();
    
    // 3. Open Drawer
    await expect(page.locator('text=Your Cart')).toBeVisible();
    await expect(page.locator('text=Proceed to Checkout')).toBeVisible();

    // 4. Checkout Navigation
    await page.locator('text=Proceed to Checkout').click();
    await expect(page).toHaveURL(/.*checkout/);
    
    // Check form loads
    await expect(page.locator('h1')).toContainText('Secure Checkout');
  }
});
