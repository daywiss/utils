const assert = require('../assert')
module.exports = (source) => {
  let push
  let iter= source[Symbol.iterator]()
  assert(iter,'Not an iterator',module.exports)

  return function fromIterator(code,data){
    if(code === 0){
      push = data
      push(0,fromIterator)
    }
    if(push == null) return
    if(code === 1){
      const {done,value} = iter.next()
      if(done){
        push(2)
        push = null
      }else{
        push(1,value)
      }
    }
    if(code === 2){
      push = null
    }
  }
}

