export default (fn,duration,...args) => {
  const stop = setTimeout(fn,duration,...args)
  return ()=>clearTimeout(stop)
}
