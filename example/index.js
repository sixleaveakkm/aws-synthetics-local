const synthetics = require('Synthetics')
const log = require('SyntheticsLogger')

exports.handler = async () => {
  let page = await synthetics.getPage()
  await synthetics.executeStep('test', async () => {
    await page.goto('https://www.google.com')
  })
}
