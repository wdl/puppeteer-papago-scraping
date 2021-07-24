# puppeteer-papago-scraping

puppeteer-papago-scraping is a tool that scraps Papago translation results using [Puppeteer](https://github.com/puppeteer/puppeteer) without using the Papago API.

## Install

```
npm i puppeteer-papago-scraping
```

## Usage

Simply import the package and use it as a function:

```javascript
const translate = require('puppeteer-papago-scraping')
const translatedText = await translate('みかんが 見っかんない。', 'ko', 'ja')
const translatedTextArray = await translate(['女の子が憧れてきた魔法', 'フシギは常識 超異世界', '唱えたらショウタイム'], 'ko', 'ja')
```

## API

### translate(text, to[, from])

#### text

Type: `string` | `array`

The text to be translated. Maximum 5,000 characters per text.

#### to

Type: `string`

The language in which the text should be translated. Must be one of the codes from the supported languages list below.

##### from

Type: `string` Default: `auto`

The text language. Detects language if not given. If provided, must be one of the codes from the supported languages list below.

## Supported languages

|Language|Code|
|:---|:---|
|Korean|ko|
|English|en|
|Japanese|ja|
|Chinese Simplified|zh-CN|
|Chinese Traditional|zh-TW|
|Spanish|es|
|French|fr|
|German|de|
|Russian|ru|
|Portuguese|pt|
|Italian|it|
|Vietnamese|vi|
|Thai|th|
|Indonesian|id|
|Hindi|hi|

## License

MIT License

Copyright (c) 2020-present Elenchus(sijongyeoil)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
