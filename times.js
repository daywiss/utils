export default (length,cb)=>{
 return Array.from({length},(_,i)=> cb(i))
}
