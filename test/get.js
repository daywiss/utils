const {get} = require('..')
const test = require('tape')
const lodash = require('lodash')


test('get',t=>{
  const obj = {
    a:{
      b:{
        c:[1,2,3,4]
      }
    }
  }
  t.test('exists',t=>{
    t.ok(get)
    t.end()
  })
  t.test('get 1',t=>{
    const path = 'a.b.c[0]'
    t.equal(lodash.get(obj,path),get(obj,path))
    t.end()
  })
  t.test('get 2',t=>{
    const path = ['a','b','c','2']
    t.equal(lodash.get(obj,path),get(obj,path))
    t.end()
  })
  // t.test('get 3',t=>{
  //   const path  = ''
  //   t.equal(get(obj,path),obj)
  //   t.end()
  // })
  t.test('get 4',t=>{
    const path  = ['a','b','d','e']
    t.equal(get(obj,path),lodash.get(obj,path))
    t.end()
  })
  t.test('get def',t=>{
    const path  = 'b'
    const def = 'default'
    t.equal(get(obj,path,def),def)
    t.end()
  })
})
