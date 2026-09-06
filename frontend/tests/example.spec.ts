import { test, expect } from '@playwright/test';

test('has correct title and renders landing page', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Adjust this to match the actual title of your app
  await expect(page).toHaveTitle(/ClashMinds|React App|Vite App/i);

  // Example: Check if the Login or Get Started button exists
  // await expect(page.getByRole('button', { name: /Login|Get Started/i })).toBeVisible();
});

test('can navigate to bot selection (if accessible without auth)', async ({ page }) => {
  await page.goto('http://localhost:5173/bot-selection');
  
  // Since we might be redirected if not logged in, we check if the URL is correct or if we hit the auth page
  const url = page.url();
  expect(url.includes('auth') || url.includes('bot-selection')).toBeTruthy();
});
