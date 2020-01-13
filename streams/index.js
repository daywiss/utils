
exports.pipe = (...args)=>{

  args.forEach(next=>{
    const first = next(first)
  })

}

exports.fromIterator = source => (sendUp,push,onData) => {
  let iter= source[Symbol.iterator]()
  assert(iter,'Not an iterator',module.exports)
  return (code,data) => {
    if(code === 1){
      const {done,value} = iter.next()
      if(done){
        push(2)
        push = null
      }else{
        push(1,value)
      }
    }
  }
}

exports.map = (fn=x=>x) => (sendUp,push,onData)  =>{
  onData((code,data)=>{
    push(fn(data))
    pull(1)
  })
  return sendUp
}

exports.each = (fn=x=>x) => (sendUp,push,onData)  =>{
  onData((code,data)=>{
    if(code === 1){
      fn(data)
      sendUp(1)
    }
  }
  sendUp(1)
}
