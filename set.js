const touch = require('./touch') 

module.exports = (state,path,data) => {
  return touch(state,path,(obj,key)=>obj[key]=data)
}

