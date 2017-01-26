import * as events from './events'
export default {
  [events.CHANGED]: ({ commit }, payload) => {
    commit(events.CHANGED, payload)
  }
}
