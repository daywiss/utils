# ynk
Some utilities optimized for file size, composability and performance for node or browser.
Mainly experimental so use at your own risk.

# Install
`yarn add ynk`

# Usage 
```js
  // in node
  const {assert} = require('ynk')

  // in browser
  import {assert} from 'ynk'

  //async stuff
  //in node
  const {map} = require('ynk').async

```

# Syncronous Utilities
- assert - assertions for truthy values
- exists - assertions for non undefined values
- Cleanstack - clean your error stack by filtering out regex matches
- Curry - curry N arity functions by specifying curry depth
- Events - a bare bones event publish subscriber
- get - lodash get 
- IncreasingId - alphanumeric sortable increasing strings padded by N places
- set - special set copying lodash set api, which creates new objects along the path the data is set
- Store - data store and subscribe to path changes
- timeout - Basic timeout that returns the clear timeout function
- topath - lodash toPath function, turns a string into an array of strings representing object path
- touch - modify an object along a path and callback to last key
- unset - delete a key on an object along a path, also mutate object along path
- Dispatch - pass in store and reducer and returns a dispatch function

# Async Utilities
- doWhile - loop over async functions while a condition is true
- filter - filter async functions
- loop - loop an async function forever
- map - map over async function
- reduce - reduce async function
- series - stream async data in order
- Dispatch - an async dispatcher, passs in store and async reducers
- timeout - race promise with a timeout value
- sleep - async sleep for some ms
