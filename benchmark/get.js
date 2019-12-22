const Benchmark = require('benchmark')
const suite = new Benchmark.Suite;
const myGet = require('../get')
const assert = require('../assert')
const {times,get,cloneDeep} = require('lodash')

function getData(){
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
  return [path,state,'test']
}

const tests = [
  [get,'get'],
  [myGet,'myGet'],
].forEach(([fn,label],i)=>{
  suite.add(label, ()=>{
    const [path,state,val] = getData()
    state.a.b.c.d.e.f.g.h = val
    const result = fn(state,'a.b.c.d.e.f.g.h')
    assert(result == val)
    fn(state,'a.b.e.f.g.h','test')
    fn(state, ['a.b.e.f.g.h'],'test')
  })
})

suite.on('error', function(...args) {
  console.log(...args)
})
suite .on('complete', function(...args) {
  console.log(...args)
  console.log('Fastest is ' + this.filter('fastest').map('stats'))
})
// run async
.run({ 'async': true });
