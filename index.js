'use strict';

const puppeteer = require('puppeteer');

async function puppeteerPapagoScraping(text, to, from = 'auto') {
  let browser;
  try {
    const textEncoded = encodeURIComponent(text.replace(/&/g, '%amp'));
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (textEncoded.length > 1200) {
      await page.goto(`https://papago.naver.com/?sk=${from}&tk=${to}`);
      await page.waitForSelector('#txtSource');
      await page.waitForFunction('document.getElementById("txtSource").value = `' + text.replace(/`/g, '\\`') + '`');
      await page.type('#txtSource', String.fromCharCode(13));
      await page.click('#btnTranslate');
    } else {
      await page.goto(`https://papago.naver.com/?sk=${from}&tk=${to}&st=${textEncoded}`);
    }
    await page.waitForSelector('#txtTarget');
    await page.waitForFunction('document.getElementById("txtTarget").innerHTML');
    await page.waitForFunction('document.getElementById("txtTarget").innerText != "..."');
    const translatedText = await page.evaluate('document.getElementById("txtTarget").innerText');
    await browser.close();
    return translatedText;
  } catch (e) {
    await browser?.close();
    return undefined;
  }
}

module.exports = puppeteerPapagoScraping;