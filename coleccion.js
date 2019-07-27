"use strict";
const util = require('util');
class Collection extends Map {
  constructor(iterable) {
    super(iterable);
    Object.defineProperty(this, '_array', { value: null, writable: true, configurable: true });
    Object.defineProperty(this, '_keyArray', { value: null, writable: true, configurable: true });
  }
  filter(fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg);
    const results = {};
    for (const [key, val] of this) {
      if (fn(val, key, this)) results[key] = val;
    }
    return results;
  }
}
module.exports = Collection;