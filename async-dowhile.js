const sleep = require('./async-sleep')

async function doWhile (promise, delay, ...args) => {
  if(!await promise(...args)) return
  await sleep(delay)
  return doWhile(promise, delay, ...args)
}

module.exports = doWhile
