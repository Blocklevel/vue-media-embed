import * as events from './events'
const silent = { silent: true }
export default {
  [events.CHANGED]: ({ commit }, payload) => {
    commit(events.CHANGED, payload, silent)
  }
}
