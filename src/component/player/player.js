/**
 * @name tms-popup
 * @author remo <remo@blocklevel.nl>
 */
import props from './player-props'
import getPlayer from '../../util/get-player'
import PlayerState from './player-state'
import * as events from '../../module/events'
export default {
  name: 'translation-block',
  mixins: [ props ],
  data () {
    return {
      isBuffering: false,
      stored: null,
      status: '',
      player: null,
      interval: 0
    }
  },
  mounted () {
    this.player = getPlayer(
                                this.$refs.player,
                                this,
                                this.onPlayerReady,
                                this.onStateChange
                            )
    this.status = this.player.state
  },
  beforeDestroy () {
    this.dispatch(true)
    this.track(false)
    this.player.dispose()
    this.player = null
  },
  methods: {
    track (add) {
      clearInterval(this.interval)
      if (!add) return
      this.interval = setInterval(this.dispatch, 300)
    },
    getFromStore () {
      const hasStore = this.player.getPlayerID() in this.$store.getters.players
      return hasStore ? this.$store.getters.players[this.player.getPlayerID()] : null
    },
    onPlayerReady ({ target }) {
      this.status = this.player.state
      const stored = this.getFromStore()

      if (!stored && this.seekTo) {
        this.player.seekTo(this.seekTo, !this.autoPlay)
      } else if (stored && stored.currentTime > 0) {
        this.player.seekTo(stored.currentTime, stored.status !== PlayerState.PLAYING)
      }
      this.dispatch()
      this.stored = !stored ? this.getFromStore() : stored
    },
    onStateChange () {
      this.isBuffering = this.player.isBuffering
      this.status = this.player.state
      this.dispatch()
    },
    dispatch (removed) {
      let state = {
        id: this.player.getPlayerID(),
        totalTime: this.player.getDuration(),
        currentTime: this.player.getCurrentTime(),
        isBuffering: this.isBuffering,
        status: this.status,
        autoPause: this.autoPause
      }
      if (removed) state.action = ''
      this.$store.dispatch(events.CHANGED, state)
    }
  },
  computed: {
    currentTime () {
      return this.stored ? this.stored.currentTime : 0
    },
    totalTime () {
      return this.stored ? this.stored.totalTime : 0
    }
  },
  watch: {
    'stored.action' (value) {
      if (value === PlayerState.PAUSED) {
        this.player.pause()
      }
      if (value === PlayerState.TOGGLE) {
        if (this.stored.status === PlayerState.PLAYING) this.player.pause()
        else this.player.play()
      }
    },
    status (value) {
      if (this.isBuffering) return
      this.track(value === PlayerState.PLAYING)
    }
  }
}
