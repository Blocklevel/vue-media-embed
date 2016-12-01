export default (state) => {
  switch (state) {
    case -3:
      return 'loading'
    case -2:
      return 'loaded'
    case -1:
      return 'unstarted'
    case 0:
      return 'ended'
    case 1:
      return 'playing'
    case 2:
      return 'paused'
    case 3:
      return 'buffering'
    case 5:
      return 'cued'
    default:
      console.warn('unhandled state change', state)
      break
  }
  return 'unknown'
}
