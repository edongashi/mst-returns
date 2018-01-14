import { returns, returnsFlow } from './index'
import { types, getType } from 'mobx-state-tree'

// returns(type, env)(fn)
// returnsFlow(type, env)(fn*)

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const User = types.model({
  id: types.identifier(types.number),
  name: types.string
})

const UserManager = types
  .model({})
  .actions(self => {
    return {
      getUser1: returns(User)(function () {
        return { id: 1, name: 'User 1' }
      }),

      @returns(User) getUser2() {
        return { id: 2, name: 'User 2' }
      },

      getUser3: returnsFlow(User)(function* () {
        yield delay(1)
        return { id: 3, name: 'User 3' }
      }),

      // Note: this is not yet supported in babel 6
      // @returnsFlow(User) *getUser4() {
      //   yield delay(1)
      //   return { id: 4, name: 'User 4' }
      // })
    }
  })

const userManager = UserManager.create({})

test('synchronously returns User when wrapped', function () {
  const user = userManager.getUser1()
  expect(getType(user)).toBe(User)
})

test('synchronously returns User when decorated', function () {
  const user = userManager.getUser2()
  expect(getType(user)).toBe(User)
})

test('asynchronously returns User when wrapped', async function () {
  const user = await userManager.getUser3()
  expect(getType(user)).toBe(User)
})

// Note: this is not yet supported in babel 6
// test('asynchronously returns User when decorated', async function () {
//   const user = await userManager.getUser4()
//   expect(getType(user)).toBe(User)
// })