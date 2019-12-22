const toPath = require('./topath')

exports.setRecursive = (state={},path=[],data,i=0)=>{
  if(i == path.length) return data
  if(i=== 0) path = toPath(path)
  const head = path[i]
  state[head] = exports.setRecursive({...state[head]},path,data,i+1)
  return state
}

exports.setFor = (state={},path=[],data)=>{
  if(path.length === 0) return data
  path = toPath(path)
  let i = 0
  let ptr = state
  for(;i<path.length-1;++i){
    const head = path[i]
    // const obj = {}
    // for(let k in ptr[head]) obj[k] = ptr[head][k];
    // ptr = obj
    ptr[head] = Object.assign({},ptr[head])
    ptr = ptr[head]
  }
  ptr[path[i]] = data
  return state
}

exports.setAssign = (state={},path=[],data)=>{
  if(path.length === 0) return data
  path = toPath(path)
  let i = 0
  let ptr = state
  while(i < path.length-1){
    const head = path[i]
    ptr[head] = Object.assign({},ptr[head])
    ptr = ptr[head]
    ++i
  }
  ptr[path[i]] = data
  return state
}

exports.setWhile = (state={},path=[],data)=>{
  if(path.length === 0) return data
  path = toPath(path)
  let i = 0
  let ptr = state
  while(i < path.length-1){
    const head = path[i]
    ptr[head] = {...ptr[head]}
    ptr = ptr[head]
    ++i
  }
  ptr[path[i]] = data
  return state
}

exports.setWS = (obj,path=[],val)=>{
  if(path.length === 0){
    return val
  }
  if(path.length === 1){
    obj[path[0]] = val
    return obj
  }

  const [head,...rest] = path
  const child = obj[head]
  //if child exists, create a new object, otherwise its null and make an object
  obj[head] = (child != null) ? {...child} : {}

  exports.setWS(obj[head],rest,val)
  return obj
}

// exports.setProxy = (obj,path=[],val)=>{
//   const handlers = {
//     get(target, prop, receiver){
//       target[prop] = {...target[prop]}
//       return new Proxy(target[prop],handlers)
//     },
//     set(target, prop, value){
//       target[prop] = value
//       return true

//     }
//   }
//   const prox = new Proxy(obj,handlers)

//   let curr = prox
//   path.forEach(prop=>{
//     console.log(prop,curr,prox)
//     curr = curr[prop]
//   })
//   curr = val
//   return obj
// }

exports.getProxy = (obj,path=[],def)=>{
  const handlers = {
    get(target, prop, receiver){
      if(target[prop] === undefined) target[prop] = {}
      return target[prop]
    },
    set(target, prop, value){
      target[prop] = value
      return true

    }
  }
  const prox = new Proxy(obj,handlers)
  let curr = prox
  path.forEach(prop=>{
    curr = curr[prop]
  })
  if(curr === undefined) return def
  return curr
}

exports.touch = (obj,path=[]) => {
  if(path.length === 0){
    return {...obj}
  }
  const head = path[0]

  if(path.length === 1){
    return {
      ...obj,
      [head]:{...obj[head]}
    }
  }

  return exports.touch(copy[head],path.slice(1))
}

exports.set = (obj,path=[],val)=>{
  if(path.length === 0){
    return val
  }
  if(path.length === 1){
    obj[path[0]] = val
    return obj
  }

  const [head,...rest] = path
  const child = obj[head]
  //if child exists, create a new object, otherwise its null and make an object
  obj[head] = (child != null) ? {...child} : {}

  exports.set(obj[head],rest,val)
  return obj
}

exports.unset = (obj,path=[])=>{
  if(obj === undefined) return
  if(path.length === 0){
    return obj
  }


  if(path.length === 1){
    return delete obj[path[0]]
  }

  const [head,...rest] = path
  const child = obj[head]
  //if child exists, create a new object, otherwise its null and make an object
  obj[head] = (child != null) ? {...child} : {}

  return exports.unset(obj[head],rest)
}

exports.get = (obj,path=[],def)=>{
  if(obj == null) return def
  if(path.length === 0){
    return obj
  }
  const [head,...rest] = path
  return exports.get(obj[head],rest,def)
}


