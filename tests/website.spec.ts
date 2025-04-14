import { expect, test } from '@playwright/test';

// Recommended locator structure
const locators = {
    url: 'https://the-internet.herokuapp.com/',
    headingRole: { role: 'heading', name: 'Welcome to the-internet' },
    abTestingLinkText: 'A/B Testing'
} as const;

test.describe('The Internet Heroku App', () => {

    test.beforeEach('Navigate to Landing Page', async ({ page }) => {
        await page.goto(locators.url);
    });

    test('Check landing page has loaded', async ({ page }) => {
        const heading = page.getByRole('heading', { name: locators.headingRole.name });
        await expect(heading).toHaveText(/Welcome to the-internet/i, { timeout: 10000 });
    });

    test('A/B Testing Section', async ({ page }) => {
        await page.getByRole('link', { name: locators.abTestingLinkText }).click();
        await expect(page).toHaveURL(/.*abtest/);
    });

});
