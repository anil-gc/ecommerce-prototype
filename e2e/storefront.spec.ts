import { test, expect } from '@playwright/test';

test.describe('Bangladesh Tech Store (GadgetBazar) Essential User Journeys', () => {
  test('Homepage displays hero, categories, and brand elements', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/GadgetBazar/i);

    // Check demo banner
    await expect(page.locator('#demo-disclaimer')).toContainText('Frontend demo');

    // Check hero heading
    await expect(page.locator('h1')).toContainText('Modern Tech & Gadgets Store');

    // Hero CTA links to shop
    const ctaButton = page.getByRole('link', { name: /explore store catalog/i });
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    await expect(page).toHaveURL(/\/shop/);
  });

  test('Catalog supports search, brand filtering, and responsive product cards', async ({ page }) => {
    await page.goto('/shop');

    // Verify search input
    const searchInput = page.getByPlaceholder(/search by name/i);
    await searchInput.fill('Galaxy');

    // Check filtered card
    await expect(page.getByText('Samsung Galaxy S24 FE 5G (8GB/256GB)')).toBeVisible();

    // Check BDT price display
    await expect(page.getByText('৳78,500')).toBeVisible();
  });

  test('Full Journey: Browse -> Add to Cart -> Modify Quantity -> Demo Checkout -> Confirmation', async ({ page }) => {
    // 1. Visit product page directly
    await page.goto('/product/samsung-galaxy-s24-fe-5g');

    // Check product specifications table
    await expect(page.getByText('Technical Specifications')).toBeVisible();
    await expect(page.getByText('Samsung Exynos 2400e (4nm)')).toBeVisible();

    // Check stock status
    await expect(page.getByText(/In Stock \(14 units available\)/i)).toBeVisible();

    // 2. Add to cart
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    // Verify floating feedback toast
    await expect(page.getByRole('status')).toContainText('Added');

    // 3. Open Cart
    await page.goto('/cart');

    // Verify item in cart
    await expect(page.getByText('Samsung Galaxy S24 FE 5G (8GB/256GB)')).toBeVisible();
    await expect(page.getByText('৳78,500 each')).toBeVisible();

    // Check delivery estimate toggle (Outside Dhaka ৳120)
    const outsideDhakaOption = page.getByLabel(/Outside Dhaka/i);
    await outsideDhakaOption.check();

    // Total: ৳78,500 + ৳120 = ৳78,620
    await expect(page.getByText('৳78,620')).toBeVisible();

    // 4. Proceed to Checkout
    const checkoutButton = page.getByRole('link', { name: /proceed to demo checkout/i });
    await checkoutButton.click();
    await expect(page).toHaveURL(/\/checkout/);

    // 5. Fill sample checkout details
    await page.getByLabel(/Full Name/i).fill('Sakil Ahmed');
    await page.getByLabel(/Bangladesh Mobile Number/i).fill('01700123456');
    await page.getByLabel(/City/i).fill('Dhaka');
    await page.getByLabel(/Street Address/i).fill('Road 12, Banani DOHS, Dhaka');

    // 6. Complete demo checkout
    const completeButton = page.getByRole('button', { name: /complete demo checkout/i });
    await completeButton.click();

    // 7. Verify order confirmation page
    await expect(page).toHaveURL(/\/order-success/);
    await expect(page.getByText(/Demo Order Simulated Successfully/i)).toBeVisible();
    await expect(page.getByText(/GB-DEMO-/i)).toBeVisible();
    await expect(page.getByText('৳78,560')).toBeVisible(); // Inside Dhaka default on checkout form

    // Verify cart was cleared
    await page.goto('/cart');
    await expect(page.getByText(/Your Shopping Cart is Empty/i)).toBeVisible();
  });

  test('Mobile drawer navigation and ESC key dismiss', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');

    // Hamburger button
    const menuButton = page.getByLabel(/open navigation menu/i);
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Mobile drawer visible
    const drawer = page.getByRole('dialog', { name: /mobile navigation menu/i });
    await expect(drawer).toBeVisible();

    // Close on Escape key
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });
});
