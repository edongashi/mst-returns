import { flow } from 'mobx-state-tree'

export function returns(type, env) {
  return function (fn, name, descriptor) {
    return function (...args) {
      return type.create(fn(...args), env)
    }
  }
}

export function returnsFlow(type, env) {
  return function (fn) {
    const wrapped = flow(fn)
    return function (...args) {
      return wrapped(...args).then(result => type.create(result, env))
    }
  }
}
