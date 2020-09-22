#!/usr/bin/env node

const synthetics = require('../index')
const path = require('path')
const yargs = require('yargs')
  .usage("Usage: $0 [options] <handler>")
  .example([
    ['$0 index.handler', 'use index.js in current directory and use exported handler to run canary']
  ])
  .option('headlessMode', {
    alias: 'm',
    type: 'boolean',
    default: false,
    description: 'puppeteer headlessMode'
  })
  .option('screenshotDir', {
    alias: 'd',
    type: 'string',
    default: '.screenshot',
    description: 'relative path for screenshot, will be created if not exists'
  }), argv = yargs.argv;

async function execute(entry, headlessMode=false, screenshotDir=".screenshot") {
  console.info('Start Canary')

  await synthetics.start(headlessMode, screenshotDir)
  try{
    console.log(`process dir: ${process.cwd()}`)
    let lib = path.join(process.cwd(), entry.split('.')[0])
    const script = require(lib)
    await script[entry.split('.')[1]]()
  } finally {
    await synthetics.close()
  }
}

if (argv.h === true) {
  yargs.showHelp()
  process.exit(0)
}

if (argv._.length !== 1) {
  yargs.showHelp()
  process.exit(1)
} else {
  (async () => {
    await execute(argv._[0], argv.m, argv.d)
  })();
}
