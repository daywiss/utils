const sleep = require('./async-sleep')

module.export = async (fn,delay,...args)=>{
  await sleep(delay)
  return fn(...args)
}

exports.loop = async (fn, delay = 1000, max, count = 0, result) => {
  assert(lodash.isFunction(fn), 'loop requires a function')
  if (max && count >= max) return result
  result = await fn(count)
  await new Promise(res => setTimeout(res, delay))
  return exports.loop(fn, delay, max, count + 1, result)
}
