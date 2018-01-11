# mst-returns

Auto wrap return types for mobx-state-tree.

Example:
```js
import { types } from 'mobx-state-tree'
import { returns, returnsFlow } from 'mst-returns'

// returns(type, env)(fn)
// returnsFlow(type, env)(fn*)

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
        yield delay(1000)
        return { id: 3, name: 'User 3' }
      }),

      @returnsFlow(User) *getUser4() {
        yield delay(1000)
        return { id: 4, name: 'User 4' }
      })
    }
  })

```

It's a quick and untested implementation of the idea. Decorators are not yet supported.