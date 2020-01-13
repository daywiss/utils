const ignoreDefaults = [
  /node_modules/,
  /\internal\/process/,
]

const CleanStack = (ignore=ignoreDefaults) => (stack='',start=0,end)=>{
  return stack
    .split('\n')
    .slice(start, end)
    .filter(line => {
      return ignore.reduce((result, regex) => {
        return result && !regex.test(line)
      }, true)
    })
    .join('\n')
}
export default CleanStack
