const puppeteer = require("puppeteer")
const log = require("SyntheticsLogger")
const path = require("path")
const fs = require('fs')
let browser
let page

let screenShotPath = ".screenshot"
let userAgent = "CloudWatchSynthetics-Local"
let index = 0

exports.setLogLevel = log.setLogLevel
exports.getLogLevel = log.getLogLevel
exports.addUserAgent = async (page, userAgentString) => {
  userAgent += " " + userAgentString
  await page.setUserAgent(userAgent)
}

exports.getCanaryUserAgentString = () => {
  return userAgent
}

exports.getPage = async () => {
  const pages = await this.browser.pages()
  console.log(pages.length)
  if (pages.length <= 1) {
    this.page = await this.browser.newPage()
  }
  return this.page
}

exports.executeStep = async (stepName = null, func) => {
  index++;
  let currIdx = index

  let name = ""
  if (stepName !== null) {
    name = `-${stepName}`
  }

  log.info(`executeStep "${currIdx}${name}" start`)

  await this.page.screenshot({path: path.join(screenShotPath, `${currIdx}${name}-starting.png`)})

  const start = Date.now()

  try {
    await func()
    log.info(`executeStep "${currIdx}${name}" succeeded`)
    await this.page.screenshot({path: path.join(screenShotPath, `${currIdx}${name}-succeeded.png`)})
  } catch (e) {
    log.info(e)
    log.info(`executeStep "${currIdx}${name}" failed`)
    await this.page.screenshot({path: path.join(screenShotPath, `${currIdx}${name}-failed.png`)})
    throw e
  } finally {
    const end = Date.now()
    const d = end - start
    log.info(`${name}: ${Math.floor(d / 1000)} seconds`)
  }
}

exports.takeScreenshot = async (stepName, suffix) => {
  index++;
  let currIdx = index
  return await this.page.screenshot({path: path.join(screenShotPath, `${currIdx}-${stepName}-${suffix}.png`)})
}

exports.getRequestResponseLogHelper = () => {
  return helper
}

exports.setRequestResponseLogHelper = (newHelper) => {
  helper = newHelper
}

let helper = function () {
  let RequestResponseLogHelper = () => {
    this.request = {url: true, resourceType: false, method: false, headers: false, postData: false};
    this.response = {status: true, statusText: true, url: true, remoteAddress: false, headers: false};
  }

  RequestResponseLogHelper.prototype.withLogRequestUrl = (b) => {
    this.request.url = b
  }

  RequestResponseLogHelper.prototype.withLogRequestResourceType = (b) => {
    this.request.resourceType = b
  }

  RequestResponseLogHelper.prototype.withLogRequestMethod = (b) => {
    this.request.method = b
  }

  RequestResponseLogHelper.prototype.withLogRequestHeaders = (b) => {
    this.request.headers = b
  }

  RequestResponseLogHelper.prototype.withLogRequestPostData = (b) => {
    this.request.postData = b
  }

  RequestResponseLogHelper.prototype.withLogResponseStatus = (b) => {
    this.response.status = b
  }

  RequestResponseLogHelper.prototype.withLogResponseStatusText = (b) => {
    this.response.statusText = b
  }

  RequestResponseLogHelper.prototype.withLogResponseUrl = (b) => {
    this.response.url = b
  }

  RequestResponseLogHelper.prototype.withLogResponseRemoteAddress = (b) => {
    this.response.remoteAddress = b
  }

  RequestResponseLogHelper.prototype.withLogResponseHeaders = (b) => {
    this.response.headers = b
  }

  return {
    RequestResponseLogHelper: RequestResponseLogHelper
  }
}



// ***********************************************************************

exports.start = async (headlessMode, screenshotDir) => {
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir)
  }
  this.browser = await puppeteer.launch({
    headless: headlessMode,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  })
}

exports.close = async () => {
  await this.browser.close()
}
