function unset(state={},path=[],cb=x=>x,i=0){
  if(path.length == 0) return data
  if(i == path.length-1){ 
    cb(state,path[i])
    return state
  }
  const head = path[i]
  if(state[head] == null){
    return state
  }else{
    state[head] = {...state[head]}
  }
  unset(state[head],path,cb,i+1)
  return state
}                        

export default (state,path,data) => {
  return unset(state,path,(obj,key)=>delete obj[key])
}

