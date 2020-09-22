#!/usr/bin/env node

const synthetics = require('../index')

async function execute(entry, headlessMode) {
  console.info('Start Canary')
  await synthetics.start(headlessMode)
  try{
    await entry()
  } finally {
    await synthetics.close()
  }
}

const args = process.argv.slice(2);
console.log('trying start with args:', args)
if (args.length === 0) {
  console.error('missing entry handler')

}

(async () => {
  await execute(args[0])
})();
