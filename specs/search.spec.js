// Import requirement packages
const { expect } = require('chai');
const { Builder, Key, By, until } = require('selenium-webdriver');

const baseUrl = 'http://www.google.com';
const browser = 'chrome'
let driver;


describe('Google Search', async () => {
    before(async () => {
        driver = await new Builder().forBrowser(browser).build();
        driver.manage().setTimeouts({ implicit: 3000});
        await driver.get(baseUrl);
    });

    after(async () => {
        await driver.quit();
    });


    it('Search for Happy Returns', async () => {
        await driver.findElement(By.name('q')).sendKeys('Happy Returns', Key.RETURN);
        await driver.wait(until.titleIs('Happy Returns - Google Search'), 2000);
        // will get the first NON advertised search result
        const firstResult = await driver.findElement(By.css('div[class="r"]:nth-child(1)>a')).getAttribute('href');
        expect(firstResult, 'first search result should be happy returns').to.equal('https://www.happyreturns.com/');
    });


});