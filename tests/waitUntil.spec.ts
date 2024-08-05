import { test, expect } from '@playwright/test';
import {waitUntil} from '../lib/waitUntil';

test("Wait Until", async ({page}) => {
    await page.goto('https://practice.expandtesting.com/slow')
    console.log("arrived at slow website")
    let pageIsLoaded = async () => {return await page.locator('.alert').filter({hasText: 'Thanks for waiting!'}).first().isVisible()};
    expect(await waitUntil(pageIsLoaded))


});