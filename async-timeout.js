const sleep = require('./async-sleep')

module.export = async (fn,delay,msg='Request Timed Out')=>{
  return Promise.race([
    fn,
    ()=>sleep(delay).then(x=>throw new Error(msg))
  ])
}
