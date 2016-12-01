const PACKAGE = require('json-loader!./../package.json')
import template from './template.html'
import './index.scss'
import * as events from './module/events'
import module from './module'
import getPlayer from './util/get-player'
import props from './const/props'
import PlayerState from './const/player-state'

const install = (Vue, options = {}) => {
  const { store } = options
  store.registerModule(PACKAGE.name, module)
  Vue.component(PACKAGE.name, {
    template,
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
                                this.$el.querySelector('.player'),
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
        return this.player.getPlayerID() in this.$store.getters.players ? this.$store.getters.players[this.player.getPlayerID()] : null
      },
      onPlayerReady ({ target }) {
        this.status = this.player.state
        const stored = this.getFromStore()
        if (stored && stored.currentTime) {
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
  })
}

export default { install }
