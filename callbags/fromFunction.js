const assert = require('../assert')
module.exports = (fn=x=>x) => {
  let push 
  function fromFunction(code,data){
    if(code === 0){
      push = data
      push(0,fromFunction)
    }
    if(code > 1) push = null
  }

  function write(...args){
    assert(push,'Stream not ready')
    try{
      push(1,fn(...args))
    }catch(err){
      push(2,err)
    }
  }

  function end(err){
    push(2,err)
  }

  return [fromFunction,write,end]
}                       
