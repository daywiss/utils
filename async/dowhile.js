import sleep from './sleep'

export default async function doWhile (promise, delay, ...args){
  let ok = true
  do{
    ok = await promise(...args)  
    if(ok) await sleep(delay)
  }while(ok)
}

