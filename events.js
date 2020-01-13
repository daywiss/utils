import assert from './assert'

export default ()=>{
  const listeners = new Set()
  function off(cb){
    listeners.delete(cb)
  }
  function on(cb){
    assert(cb,'requires callback')
    listeners.add(cb)
    return ()=>off(cb)
  }
  function emit(...args){
    listeners.forEach(cb=>cb(...args))
  }
  return {
    on,
    off,
    emit,
    listeners,
  }
}
