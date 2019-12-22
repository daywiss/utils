const toPath = require('./topath')

//this creates new objects along the path
//and allows you to do what you want at final key
function touch(state={},path=[],cb=x=>x,i=0){
  if(i === 0) path = toPath(path)
  if(path.length == 0) return data
  if(i == path.length-1){ 
    cb(state,path[i])
    return state
  }
  const head = path[i]
  state[head] = {...state[head]}
  touch(state[head],path,cb,i+1)
  return state
}                        

module.exports = touch


