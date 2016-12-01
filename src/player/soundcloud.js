import Player from './player'
import PlayerState from './../const/player-state'

export default class SoundCloud extends Player {
  events = null
  player = null
  pauseAfterSeek = false
  constructor (el, id, props, onReady, onChange) {
    super(el, id, props, onReady, onChange)
    this.onPlayerReady = this.onPlayerReady.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onEnded = this.onEnded.bind(this)
    this.onTimeUpdate = this.onTimeUpdate.bind(this)
    super.load('//w.soundcloud.com/player/api.js', 'SC.Widget')
  }
  onLoaded (Player) {
    const iframe = document.createElement('iframe')
    let src = `//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/
    ${this.props.videoId}&amp;
    auto_play=${this.props.autoPlay ? 'true' : 'false'}&amp;
    liking=${this.props.showLiking ? 'true' : 'false'}&amp;
    hide_related=${this.props.hideRelated ? 'true' : 'false'}&amp;
    show_comments=${this.props.showComments ? 'true' : 'false'}&amp;
    show_user=${this.props.showUser ? 'true' : 'false'}&amp;
    buying=${this.props.showBuying ? 'true' : 'false'}&amp;
    linking=${this.props.showLinking ? 'true' : 'false'}&amp;
    download=${this.props.showDownload ? 'true' : 'false'}&amp;
    sharing=${this.props.showSharing ? 'true' : 'false'}&amp;
    show_reposts=${this.props.showReposts ? 'true' : 'false'}&amp;
    show_artwork=${this.props.showArtwork ? 'true' : 'false'}&amp;
    show_playcount=${this.props.showPlayCount ? 'true' : 'false'}&amp;
    start_track=${this.props.startTrack}&amp;
    visual=${this.props.showVisual ? 'true' : 'false'}`
    src = src.split('\n').join('').split(' ').join('')

    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '100%')
    iframe.setAttribute('scrolling', 'no')
    iframe.setAttribute('frameborder', 'no')
    iframe.setAttribute('src', src)
    this.el.appendChild(iframe)
    this.player = new Player(iframe)
    this.events = Player.Events
    this.configureListeners('bind')
  }
  onPlayerReady (e) {
    this.player.getDuration(duration => {
      this.totalTime = duration / 1000
      this.state = PlayerState.LOADED
      this.onReady({ target: this })
    })
  }
  pause () {
    this.player.pause()
  }
  play () {
    this.player.play()
  }
  seekTo (time, pauseAfterSeek) {
    this.seekTime = time * 1000
    this.pauseAfterSeek = pauseAfterSeek
    this.player.play()
  }
  setCurrentTime (value) {
    this.currentTime = value / 1000
  }
  onPlay ({ currentPosition, loadedProgress, relativePosition }) {
    if (this.seekTime > 0) {
      this.setCurrentTime(this.seekTime)
      this.player.seekTo(this.seekTime)
      this.seekTime = 0
    } else this.setCurrentTime(currentPosition)

    if (this.pauseAfterSeek) {
      this.pauseAfterSeek = false
      this.pause()
      return
    }
    this.setChanged(PlayerState.PLAYING)
  }
  onPause ({ currentPosition, loadedProgress, relativePosition }) {
    this.setChanged(PlayerState.PAUSED)
  }
  onEnded ({ currentPosition, loadedProgress, relativePosition }) {
    this.setCurrentTime(currentPosition)
    this.setChanged(PlayerState.PAUSED)
  }
  onProgress ({ currentPosition, loadedProgress, relativePosition }) {
    this.setCurrentTime(currentPosition)
    this.setChanged(PlayerState.BUFFERING)
  }
  onTimeUpdate ({ currentPosition, loadedProgress, relativePosition }) {
    this.setCurrentTime(currentPosition)
  }
  configureListeners (type) {
    this.player[type](this.events.READY, this.onPlayerReady)
    this.player[type](this.events.PLAY, this.onPlay)
    this.player[type](this.events.PAUSE, this.onPause)
    this.player[type](this.events.FINISH, this.onEnded)
    this.player[type](this.events.PLAY_PROGRESS, this.onTimeUpdate)
  }
}
