const touch = require('./touch') 

module.exports = (state,path,data) => {
  return touch(state,path,(obj,key)=>delete obj[key])
}

