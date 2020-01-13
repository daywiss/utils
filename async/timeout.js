import sleep from './sleep'

export default async (fn,delay,msg='Request Timed Out')=>{
  return Promise.race([
    fn,
    ()=>sleep(delay).then(x=>{throw new Error(msg)})
  ])
}
