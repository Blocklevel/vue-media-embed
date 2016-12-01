import YouTube from '../player/youtube'
import Vimeo from '../player/vimeo'
import SoundCloud from '../player/soundcloud'

const parser = (source) => {
  // youtube
  const yt = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  let match = source.match(yt)
  if (match && match[7].length === 11) return { mediaID: match[7], type: 'youtube' }

  // vimeo
  const vimeo = /http(s)?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
  match = source.match(vimeo)
  if (match) return { mediaID: match[3], type: 'vimeo' }

  // schemes like soundcloud://{ID}
  const scheme = /(youtube|vimeo|soundcloud)?:\/\/(\w+)($|\/|)/
  match = source.match(scheme)
  if (match && match.length === 4) return { type: match[1], mediaID: match[2] }
  return null
}

export default (el, props, onPlayerReady, onStateChange) => {
  const { mediaID, type } = parser(props.source)
  const id = `${props.contentIndex}-${mediaID}`
  switch (type) {
    case 'soundcloud':
      return new SoundCloud(
        el,
        id,
        {
          videoId: mediaID,
          startTrack: props.startTrack,
          autoPlay: props.autoPlay,
          hideRelated: !props.related,
          showComments: props.showComments,
          showUser: props.showUser,
          showBuying: props.showBuying,
          showLinking: props.showLinking,
          showDownload: props.showDownload,
          showSharing: props.showSharing,
          showReposts: props.showReposts,
          showArtwork: props.showArtwork,
          showPlayCount: props.showPlayCount,
          showVisual: props.showVisual,
          showLiking: props.showLiking
        },
        onPlayerReady,
        onStateChange
      )
    case 'youtube':
      return new YouTube(
        el,
        id,
        {
          videoId: mediaID,
          playerVars: {
            hl: props.locale,
            showinfo: props.showInfo,
            modestbranding: props.modestBranding,
            rel: props.related,
            autoplay: props.autoPlay,
            color: props.color,
            controls: props.controls,
            cc_load_policy: props.captions,
            disablekb: props.disableKeyboard,
            end: props.end,
            start: props.start,
            fs: props.allowFullscreen,
            iv_load_policy: props.annotations,
            loop: props.loop,
            playsinline: props.playsInline
          },
          events: {
            onReady: onPlayerReady
          }
        },
        onStateChange
      )
    case 'vimeo':
      return new Vimeo(
        el,
        id,
        {
          id: mediaID,
          autoplay: props.autoPlay,
          color: props.color,
          loop: props.loop,
          title: props.showTitle,
          portrait: props.showPortrait,
          byline: props.showInfo,
          badge: props.showBadge,
          autopause: false
        },
        onPlayerReady,
        onStateChange
      )
    default:
      console.warn(`embed: ${props.source} is unsupported`)
      return null
  }
}
