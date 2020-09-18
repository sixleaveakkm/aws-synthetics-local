const puppeteer = require('puppeteer-core')
const path = require('path')
let browser
let page

let index = 1

exports.addUserAgent = async (page, str) => {
  await page.setUserAgent(str)
}

exports.getCanaryUserAgentString = () => {
  return "CloudWatchSynthetics-local"
}

exports.start = async (chromiumPath, headlessMode) => {
  this.browser = await puppeteer.launch({
    executablePath: path.resolve(chromiumPath),
    headless: headlessMode,
    defaultViewport: {
      width: 1024,
      height: 768,
    }
  })
}
exports.getPage = async () => {
  const pages = await this.browser.pages()
  console.log(pages.length)
  if (pages.length <= 1) {
    this.page = await this.browser.newPage()
  }
  return this.page
}

exports.executeStep =async (name, func) => {
  console.log(`executeStep "${index}-${name}" start`)
  await this.page.screenshot({path: `screenshot/${index}-${name}-starting.png`})

  const start = Date.now()

  try {
    await func()
    console.log(`executeStep "${index}-${name}" succeeded`)
    await this.page.screenshot({path: `screenshot/${index}-${name}-succeeded.png`})
  } catch (e) {
    console.log(e)
    console.log(`executeStep "${index}-${name}" failed`)
    await this.page.screenshot({path: `screenshot/${index}-${name}-failed.png`})
  } finally {
    const end = Date.now()
    const d = end - start
    console.log(`${name}: ${Math.floor(d / 1000)} seconds`)
  }
  index ++;
}

exports.close = async () => {
  await this.browser.close()
}
