const get = require('lodash/get')

//still trying to replace lodash.get becuase its way too huge
// function get (obj,path=[]){
//   path = toPath(path)
//   if(path.length == 0) return obj

//   let i = 0
//   let length = path.length

//   while(obj != null && i < length){
//     obj = obj[path[i++]]
//   }

//   return (i == length) ? obj : undefined
// }

// function getDef(obj,path=[],def){
//   const result = obj== null ? undefined : get(obj, path)
//   return result === undefined ? def : result
// }

module.exports = get
