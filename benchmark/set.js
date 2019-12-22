const {setRecursive2,setRecursive,setWhile,setWS,setAssign,setFor} = require('../experimental')
const mySet = require('../set')
const {setWith,times,cloneDeep,get} = require('lodash')
const assert = require('assert')

const path = ['a','b','c','d','e','f','g','h']
const state = {}
let ptr = state
path.forEach(x=>{
  times(50,y=>{
    ptr[y] = {}
  })
  ptr[x] = {}
  ptr = ptr[x]
})

const tests = [
  [setWith,'setWith'],
  [mySet,'mySet'],
  [setRecursive,'setRecursive'],
  [setAssign,'setAssign'],
  [setWhile,'setWhile'],
  [setFor,'setFor'],
  // set,
  // setWS,
].map(([fn,label],i)=>{
  return {
    fn:([state,path,val])=>{
      let result = fn({...state},path,'test')
      assert(get(result,path) === 'test')
      result = fn({...state},path,true)
      assert(get(result,path) === true)
    },
    params:[cloneDeep(state),[...path],'test'],
    label
  }
})

bench(
  tests,
  {
    runs:1000
  }
)
