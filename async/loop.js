import sleep from './sleep'

async function loop(fn,delay,...args){
  do{
    await fn(...args)
    await sleep(delay)
  }while(true)
}

export default loop
