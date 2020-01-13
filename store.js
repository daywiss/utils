import assert from './assert'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import get from './get'

export default (state={})=>{

  const listeners = new Map()

  function set(next){
    //swap state to be next before running callbacks
    //because they may try to get state when executing
    const prev = state
    state = next
    for (let [cb, isEqual] of listeners.entries()){
      if(!isEqual(prev,next)) cb(next)
    }
  }

  const wrapPathArray = (paths=[]) => (prev,next)=>{
    //if an empty array is passed trigger every state update
    if(paths.length == 0) return prev == next
    return  paths.every(path=>{
      return get(prev,path) == get(next,path)
    })
  }

  const wrapPathString = (path) => (prev,next)=>{
    //if empty string passed trigger every update
    if(path.length == 0) return prev == next
    return get(prev,path) == get(next,path)
  }

  function on(cb,isEqual){
    assert(isFunction(cb),'requires callback function',on)

    cb(state)

    if(isEqual){
      if(isString(isEqual)){
        listeners.set(cb,wrapPathArray(isEqual))
      }
      else if(isArray(isEqual)){
        listeners.set(cb,wrapPathArray(isEqual))
      }
      else if(isFunction(isEqual)){
        listeners.set(cb,isEqual)
      }else{
        throw new Error('isEqual must be string, array of strings, array of arrays, or a function')
      }
    }

    return ()=>off(cb)
  }

  function off(cb){
    return listeners.delete(cb)
  }

  function getState(path,def){
    if(path == null) return state
    if(path.length == 0) return state
    return get(state,path,def)
  }

  return {
    on,
    off,
    get:getState,
    set,
  }
}


