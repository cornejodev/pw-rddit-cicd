import { expect, test } from '@playwright/test';

const locators = {
    url: 'https://the-internet.herokuapp.com/',
    landingPageHeader: '//h1[text()="Welcome to the-internet"]',
    abTestingSection: '//a[text()="A/B Testing"]'
} as const; // make it read only

test.describe('The Internet Heroku App', () => {
    test.beforeEach('Navigate to Landing Page', async ({ page }) => {
        await page.goto(locators.url)
    })

    test('Check landing page has loaded', async ({ page }) => {
        const headerText = await page.locator(locators.landingPageHeader)
        expect(headerText).toContainText(/Welcome to the-internet/i, { timeout: 10000 })

    })

    test('A/B Testing Section', async ({ page }) => {
        await page.locator(locators.abTestingSection).click()
        await expect(page).toHaveURL(/.*abtest/);
    })
})