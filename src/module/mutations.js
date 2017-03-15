import * as events from './events'
import PlayerState from './../component/player/player-state'

export default {
  [events.CHANGED] (state, payload) {
    const { id, totalTime, currentTime, isBuffering, status, autoPause, seekTime } = payload
    if (!state.players[id]) {
      state.players = { ...state.players, [id]: {autoPause, isBuffering, action: '', currentTime, totalTime, status, seekTime} }
    }

    state.players[id].totalTime = totalTime
    state.players[id].currentTime = currentTime
    state.players[id].status = status
    state.players[id].isBuffering = isBuffering
    state.players[id].autoPause = autoPause
    state.players[id].seekTime = seekTime


    if ('action' in payload) state.players[id].action = payload.action

    // if no current action is active, and it is playing, pause other
    // playing media

    if (!state.players[id].action && status === PlayerState.PLAYING) {
      for (let _id in state.players) {
        if (_id === id) continue
        if (state.players[id].autoPause !== state.players[_id].autoPause) continue
        if (state.players[_id].autoPause && state.players[_id].status === PlayerState.PLAYING) {
          state.players[_id].action = PlayerState.PAUSED
        }
      }
    } else state.players[id].action = ''
  },
  [events.PLAY] (state, id) {
    if (!state.players[id]) return
    state.players[id].action = PlayerState.TOGGLE
  }
}
