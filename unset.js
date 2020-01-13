import touch from './touch'

export default (state,path,data) => {
  return touch(state,path,(obj,key)=>delete obj[key])
}

