import { expect, test } from '@playwright/test';

test('checking activity pages', async ({ page }) => {
	await page.goto('https://nopedev.netlify.app/activities/55441a6f-1b3e-43c1-8be9-86be59d2b0b5');
	await expect(page.locator('text=프레임워크 없는 프레임워크 개발')).toBeVisible();
});

test('check main', async ({ page }) => {
	await page.goto('https://nopedev.netlify.app/main');
	await expect(page.locator('text=전체활동')).toBeVisible();
});
