import { flow } from 'mobx-state-tree'

export function returns(type, env) {
  return function (fn, name, descriptor) {
    if (typeof name === 'string') {
      fn = descriptor.value
      descriptor.value = function (...args) {
        return type.create(fn(...args), env)
      }

      return descriptor
    }

    return function (...args) {
      return type.create(fn(...args), env)
    }
  }
}

export function returnsFlow(type, env) {
  return function (fn, name, descriptor) {
    let flowWrapper
    if (typeof name === 'string') {
      flowWrapper = flow(descriptor.value)
      descriptor.value = function (...args) {
        return flowWrapper(...args).then(result => type.create(result, env))
      }

      return descriptor
    }

    flowWrapper = flow(fn)
    return function (...args) {
      return flowWrapper(...args).then(result => type.create(result, env))
    }
  }
}
