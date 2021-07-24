'use strict';

const puppeteer = require('puppeteer');

async function puppeteerPapagoScraping(text, to, from = 'auto') {
  if (typeof(text) === 'string') {
    return await puppeteerPapagoScrapingString(text, to, from);
  } else if (text.length === 1) {
    return [await puppeteerPapagoScrapingString(text[0], to, from)];
  } else {
    return await puppeteerPapagoScrapingArray(text, to, from);
  }
}

async function puppeteerPapagoScrapingString(text, to, from) {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    const textEncoded = encodeURIComponent(text.replace(/&/g, '%amp'));
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
    console.error(e);
    await browser?.close();
    return undefined;
  }
}

async function puppeteerPapagoScrapingArray(texts, to, from) {
  let browser;
  let translatedTexts = [];
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://papago.naver.com/?sk=${from}&tk=${to}`);
    await page.waitForSelector('#txtSource');
    for (const text of texts) {
      await page.waitForFunction('document.getElementById("txtSource").value = `' + text.replace(/`/g, '\\`') + '`');
      await page.type(`#txtSource`, String.fromCharCode(13));
      await page.click(`#btnTranslate`);
      await page.waitForFunction(`document.querySelector('[alt="로딩중"]') === null`);
      await page.waitForSelector(`#txtTarget`);
      const translatedText = await page.evaluate(`document.getElementById("txtTarget").innerText`);
      translatedTexts.push(translatedText);
    }
    await browser.close();
    return translatedTexts;
  } catch (e) {
    console.error(e);
    await browser?.close();
    return undefined;
  }
}

module.exports = puppeteerPapagoScraping;