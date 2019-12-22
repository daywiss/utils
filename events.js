const assert = require('./assert')

module.exports = ()=>{
  const listeners = new Map()
  function off(cb){
    listeners.delete(cb)
  }
  function on(cb){
    assert(cb,'requires callback')
    listeners.push(cb)
    return ()=>off(cb)
  }
  function emit(...args){
    listeners.forEach(cb=>cb(...args))
  },
  return {
    on,
    off,
    emit,
    listeners,
  }
}
