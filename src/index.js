const PACKAGE = require('json-loader!./../package.json')
import module from './module'
import player from 'component/player/player.vue'

export default function install (Vue, options = {}) {
  const { store } = options
  Vue.component(PACKAGE.name, player)
  store.registerModule(PACKAGE.name, module)
}
