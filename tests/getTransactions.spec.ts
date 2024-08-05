import { test, expect } from '@playwright/test';
import {sleep, waitUntil } from '../lib/waitUntil'


test('has title', async ({ page }) => {
  //Goto webpage
  await page.goto(process.env.BANK_LOGIN_URL!);

  //Pull Local Creds
  let bankUsername = process.env.BANK_USERNAME!;
  let bankPassword = process.env.BANK_PASSWORD!;

  //Fine User/Pass Locators
  let sign_in_box_locator = page.frameLocator('#logonbox')
  await sign_in_box_locator.locator('#userId').getByLabel('Username').fill(bankUsername);
  await sign_in_box_locator.locator('#password').getByLabel('Password').fill(bankPassword);
  await sleep(3000);
  await sign_in_box_locator.getByText('Sign in').click()


  //Confirm Using Mobile App
  await page.locator('button').getByText('Cancel').first().waitFor({state: 'visible'})
  //await page.locator('list-item--navigational').filter({hasText: 'Confirm using our mobile app'}).last().click({timeout: 60000});
  //await page.locator('list-item--navigational').first().click();



  //await expect(page).toHaveTitle(/.*Accounts.*/);

  await page.goto('https://secure.chase.com/web/auth/dashboard#/dashboard/accountDetails/downloadAccountTransactions/index')

  await expect(page).toHaveTitle(/.*Download.*/);

  let last4s = process.env.BANK_ACCOUNTS_LAST4!.split(",")

  let choose_an_account_locator = page.getByText('Choose an account', {exact: true});
  last4s.forEach( async (acct) => {
    await choose_an_account_locator.click();
    await page.getByText('...7476').last().click();
    await page.locator('button').getByText('Download').click();
  });
});

