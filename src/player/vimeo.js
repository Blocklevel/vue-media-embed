import Player from './player'
import PlayerState from './../const/player-state'

export default class Vimeo extends Player {
  constructor (el, id, props, onReady, onChange) {
    super(el, id, props, onReady, onChange)
    this.onVideoLoaded = this.onVideoLoaded.bind(this)
    this.configureListeners = this.configureListeners.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onEnded = this.onEnded.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onTimeUpdate = this.onTimeUpdate.bind(this)
    super.load('//player.vimeo.com/api/player.js', 'Vimeo.Player')
  }
  onLoaded (Player) {
    this.player = new Player(this.el, this.props)
    this.configureListeners('on')
  }
  configureListeners (type) {
    this.player[type]('loaded', this.onVideoLoaded)
    this.player[type]('play', this.onPlay)
    this.player[type]('pause', this.onPause)
    this.player[type]('ended', this.onEnded)
    this.player[type]('timeupdate', this.onTimeUpdate)
    this.player[type]('volumechange', this.onVolumeChange)
    this.player[type]('progress', this.onProgress)
  }
  onPlay ({ seconds, percent, duration }) {
    this.currentTime = seconds
    this.setChanged(PlayerState.PLAYING)
  }
  onPause ({ seconds, percent, duration }) {
    this.currentTime = seconds
    this.setChanged(PlayerState.PAUSED)
  }
  onEnded ({ seconds, percent, duration }) {
    this.currentTime = seconds
    this.setChanged(PlayerState.ENDED)
  }
  onProgress ({ seconds, percent, duration }) {
    this.setChanged(PlayerState.BUFFERING)
  }
  onTimeUpdate ({ seconds, percent, duration }) {
    this.currentTime = seconds
    this.setChanged(PlayerState.PLAYING)
  }
  onVideoLoaded (data) {
    this.player.getDuration().then((duration) => {
      this.totalTime = duration
      this.state = PlayerState.LOADED
      this.onReady({ target: this })
    })
  }
  onVolumeChange ({volume}) {
    // TODO
  }
  pause () {
    this.player.pause()
  }
  play () {
    this.player.play()
  }
  seekTo (time, pauseAfterSeek) {
    this.player.setCurrentTime(time).then(() => {
      if (pauseAfterSeek) this.player.pause()
    })
  }
}
