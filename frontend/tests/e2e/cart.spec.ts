import { expect, test } from '@playwright/test';

test.describe('Shopping cart workflow', () => {
  test('Add products to cart, update quantity, and remove item', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('h1:has-text("Products")')).toBeVisible();

    await page.click('button[aria-label="Increase quantity of SmartFeeder One"]');
    await page.click('button[aria-label="Increase quantity of SmartFeeder One"]');
    await page.click('button[aria-label="Add 2 SmartFeeder One to cart"]');

    await expect(page.locator('a[aria-label="View cart"] span')).toHaveText('2');
    await page.click('a[aria-label="View cart"]');
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.locator('h2:has-text("SmartFeeder One")')).toBeVisible();

    await page.click('button[aria-label="Increase quantity of SmartFeeder One"]');
    await expect(page.locator('span[aria-label="Cart quantity of SmartFeeder One"]')).toHaveText('3');

    await page.click('button[aria-label="Remove SmartFeeder One from cart"]');
    await expect(page.locator('text=Your cart is empty. Add some products to get started.')).toBeVisible();
  });

  test('Cart persists after page refresh in same session', async ({ page }) => {
    await page.goto('/products');
    await page.click('button[aria-label="Increase quantity of SmartFeeder One"]');
    await page.click('button[aria-label="Add 1 SmartFeeder One to cart"]');
    await page.click('a[aria-label="View cart"]');
    await expect(page.locator('h2:has-text("SmartFeeder One")')).toBeVisible();

    await page.reload();
    await expect(page.locator('h2:has-text("SmartFeeder One")')).toBeVisible();
    await expect(page.locator('span[aria-label="Cart quantity of SmartFeeder One"]')).toHaveText('1');
  });
});
