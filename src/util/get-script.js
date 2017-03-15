const queue = {}

export default (source, callback, target) => {
  const ns = target.split('.')
  const instance = getInstance(ns)
  if (instance) {
    if (callback) callback(instance)
    return
  }

  if (!queue[source])queue[source] = []
  queue[source].push({ callback, target, ns })

  // is currently loading so prevent extra loads
  if (queue[source].length > 1) {
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
        for (let i = 0; i < queue[source].length; i++) {
          const current = queue[source][i]
          const player = getInstance(current.ns)
          if (!player) continue
          current.callback(player)
          queue[source].splice(i, 1)
          i = Math.max(i - 1, 0)
        }
        if (!queue[source].length) {
          delete queue[source]
          clearInterval(interval)
        }
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
