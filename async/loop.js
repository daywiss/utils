import sleep from './sleep'

async function loop(fn,delay,...args){
  await fn(...args)
  await sleep(delay)
  return loop(fn,delay,...args)
}                       

export default loop
// module.exports = async (fn,delay,...args)=>{
//   await sleep(delay)
//   return fn(...args)
// }

// exports.loop = async (fn, delay = 1000, max, count = 0, result) => {
//   assert(lodash.isFunction(fn), 'loop requires a function')
//   if (max && count >= max) return result
//   result = await fn(count)
//   await new Promise(res => setTimeout(res, delay))
//   return exports.loop(fn, delay, max, count + 1, result)
// }
