export default {
  props: {
    seekTo: {
      type: Number,
      required: false
    },
    source: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      default: ''
    },
    autoPlay: {
      type: Number,
      default: 0
    },
    autoPause: {
      type: Number,
      default: 1
    },
    contentIndex: {
      type: Number,
      default: 0
    },
    showBuying: {
      type: Number,
      default: 0
    },
    showLinking: {
      type: Number,
      default: 0
    },
    showDownload: {
      type: Number,
      default: 0
    },
    showSharing: {
      type: Number,
      default: 0
    },
    showInfo: {
      type: Number,
      default: 0
    },
    related: {
      type: Number,
      default: 0
    },
    showArtwork: {
      type: Number,
      default: 1
    },
    showComments: {
      type: Number,
      default: 0
    },
    showPlayCount: {
      type: Number,
      default: 0
    },
    showUser: {
      type: Number,
      default: 0
    },
    startTrack: {
      type: Number,
      default: 0
    },
    showReposts: {
      type: Number,
      default: 0
    },
    showLiking: {
      type: Number,
      default: 1
    },
    showVisual: {
      type: Number,
      default: 1
    },
    modestBranding: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '00adef'
    },
    controls: {
      type: Number,
      default: 1
    },
    captions: {
      type: Number,
      default: 0
    },
    disableKeyboard: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: -1
    },
    start: {
      type: Number,
      default: -1
    },
    allowFullscreen: {
      type: Number,
      default: 1
    },
    annotations: {
      type: Number,
      default: 3
    },
    loop: {
      type: Number,
      default: 0
    },
    playsInline: {
      type: Number,
      default: 0
    },
    showPortrait: {
      type: Number,
      default: 0
    },
    showTitle: {
      type: Number,
      default: 0
    },
    showBadge: {
      type: Number,
      default: 0
    }
  }
}
