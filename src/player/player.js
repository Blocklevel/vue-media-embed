import getScript from './../util/get-script'
import PlayerState from './../const/player-state'
export default class Player {
  props = null
  el = null
  onReady = null
  onChange = null
  currentTime = 0
  totaltime = 0
  id = null
  state = PlayerState.LOADING
  isBuffering = false

  constructor (el, id, props, onReady, onChange) {
    this.el = el
    this.id = id
    this.props = props
    this.onReady = onReady
    this.onChange = onChange
    this.onLoaded = this.onLoaded.bind(this)
    this.dispose = this.dispose.bind(this)
  }
  load (source, target) {
    getScript(source, this.onLoaded, target)
  }
  getDuration () {
    return this.totalTime
  }
  getCurrentTime () {
    return this.currentTime
  }
  getPlayerID () {
    return this.id
  }
  setChanged (state) {
    this.isBuffering = state === PlayerState.BUFFERING
    if (!this.isBuffering) this.state = state
    if (this.onChange !== null) this.onChange()
  }
  seekTo (time, pauseAfterSeek) {}
  dispose () {
    this.onReady = null
    this.onChange = null
  }
  play () {}
  pause () {}
  onLoaded (player) {}
}
