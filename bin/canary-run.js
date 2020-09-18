const synthetics = require('./index')


async function execute(entry) {
  console.info('Start Canary')
  await synthetics.start()
  await entry()
  await synthetics.close()
}

const args = process.argv.slice(2);
console.log('trying start with args:', args)
if (args.length === 0) {
  console.error('missing entry handler')
  exit(1)
}

(async () => {
  await execute(args[0])
})();
