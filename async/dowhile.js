import sleep from './sleep'

export default async function doWhile (promise, delay, ...args){
  if(!await promise(...args)) return
  await sleep(delay)
  return doWhile(promise, delay, ...args)
}

