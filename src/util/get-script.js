export default (source, callback, target) => {
  const ns = target.split('.')
  const instance = getInstance(ns)
  if (instance) {
    if (callback) callback(instance)
    return
  }
  let script = document.createElement('script')
  const prior = document.getElementsByTagName('script')[0]
  script.async = 1
  prior.parentNode.insertBefore(script, prior)
  script.onload = script.onreadystatechange = function (_, isAbort) {
    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null
      script = undefined
      if (isAbort || !callback) return

      const interval = setInterval(() => {
        const player = getInstance(ns)
        if (!player) return
        clearInterval(interval)
        callback(player)
      }, 10)
    }
  }
  script.src = source
}

const getInstance = (ns) => {
  let instance = window
  for (var i = 0; i < ns.length; i++) {
    if (!instance) return
    instance = instance[ns[i]]
  }
  return instance
}
