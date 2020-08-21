const puppeteer = require('puppeteer');
const htmlToText = require('html-to-text');

module.exports = async (sk, tk, text) => {
    const textEncoded = encodeURIComponent(text.replace(/&/g, '%amp'))
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://papago.naver.com/?sk=${sk}&tk=${tk}&st=${textEncoded}`)
    await page.waitForSelector('#txtTarget')
    await page.waitForFunction('document.getElementById("txtTarget").innerHTML')
    const translatedHtml = await page.evaluate('document.getElementById("txtTarget").innerHTML')
    await browser.close();
    return htmlToText.fromString(translatedHtml)
}