import Player from './player'
import PlayerState from './../const/player-state'

export default class YouTube extends Player {
  pauseAfterSeek = false
  constructor (el, id, props, onStateChange) {
    super(el, id, props, null, onStateChange)
    this.onStateChange = this.onStateChange.bind(this)
    super.load('//www.youtube.com/iframe_api', 'YT.Player')
  }
  onLoaded (Player) {
    this.props.events.onStateChange = this.onStateChange
    this.player = new Player(this.el, this.props)
  }
  getCurrentTime () {
    return this.player.getCurrentTime()
  }
  getDuration () {
    if (!this.totalTime) this.totalTime = this.player.getDuration()
    return super.getDuration()
  }
  seekTo (time, pauseAfterSeek) {
    this.pauseAfterSeek = pauseAfterSeek
    this.player.seekTo(time)
  }
  play () {
    this.player.playVideo()
  }
  pause () {
    this.player.pauseVideo()
  }
  onStateChange ({ data }) {
    let state = ''
    switch (data) {
      case -3:
        state = PlayerState.LOADING
        break
      case -2:
        state = PlayerState.LOADED
        break
      case -1:
        state = PlayerState.UNSTARTED
        break
      case 0:
        state = PlayerState.ENDED
        break
      case 1:
        if (this.pauseAfterSeek) {
          this.pauseAfterSeek = false
          this.pause()
          return
        }
        state = PlayerState.PLAYING

        break
      case 2:
        state = PlayerState.PAUSED
        break
      case 3:
        state = PlayerState.BUFFERING
        break
      case 5:
        state = PlayerState.CUED
        break
      default:
        console.warn('unhandled state change', data)
        break
    }
    this.setChanged(state)
  }
}
