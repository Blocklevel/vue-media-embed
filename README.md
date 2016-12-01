 vue media embed
Embed for YouTube, Vimeo and SoundCloud
This plugin requires [Vuex](https://www.npmjs.com/package/vuex)
### Features
- Auto pause players
- Restore previous state from store

### Installation
```
npm install vue-media-embed
```
### Usage
```
import Vue from 'vue'
import VueMediaEmbed from 'vue-media-embed'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({ ... })

Vue.use(VueMediaEmbed, { store })
```
### Example
In this example we embed 3 players
```
<vue-media-embed source="soundcloud://295067272" :auto-play="1" :allow-fullscreen="0"/>
<vue-media-embed source="youtube://C6vinrXWxls" :auto-play="0" :allow-fullscreen="1"/>
<vue-media-embed source="vimeo://70114668" :auto-play="0" :allow-fullscreen="0" />
```
sources like http://vimeo.com/190613094 and https://www.youtube.com/watch?.. or https://youtu.be/{ID} are fine too

### Overall props
| Property | Description | Default| Example |
| -------- | -------- | -------- | -------- |
| source | Platform and ID of the media | required | vimeo://70114668 |
| auto-play | Start playing automatically when player is loaded | 0 | 1 |
| auto-pause | Pause player when another player starts playing | 1 | 0 |
| related | Show related content | 0 | 1 |

### SoundCloud

see [docs](https://developers.soundcloud.com/docs/api/html5-widget#resources)

| Property | Description| Default | Options |
| -------- | -------- | -------- | -------- |
| show-buying | Show/hide buy buttons | 0 | 1 |
| show-liking | Show/hide like buttons | 0 | 1 |
| show-download | Show/hide download buttons | 0 | 1 |
| show-sharing | Show/hide share buttons/dialogues | 0 | 1 |
| show-artwork | Show/hide artwork | 0 | 1 |
| show-comments | Show/hide comments | 0 | 1 |
| show-play-count | Show/hide number of sound plays | 0 | 1 |
| show-user | Show/hide the uploader name | 0 | 1 |
| start-track | Preselects a track in the playlist, given a number between 0 and the length of the playlist. | 0 | positive integer |

### Vimeo
see [docs](https://developer.vimeo.com/player/embedding)

| Property | Description| Default | Options |
| -------- | -------- | -------- | -------- |
| show-badge | enable or disable badge on the video | 0 | 1 |
| byline | Show the user’s byline on the video | 0 | 1 |
| color | Specify the color of the video controls. Defaults to 00adef. Make sure that you don’t include the #. | 00adef |
| loop |	Play the video again when it reaches the end | 0 | 1 |
| show-portrait | Show the user’s portrait on the video | 0 | 1 |
| show-title | Show the title on the video | 0 | 1 |

### YouTube
see [docs](https://developers.google.com/youtube/player_parameters)

| Property | Description| Default | Options |
| -------- | -------- | -------- | -------- |
| color | Color theme | 'red' | 'white' |
| controls | video player controls | 1 | 0 2
| disable-keyboard | Keyboard controls | 0 | 1 |
| start | Starts playing video in seconds | -1 | p ositive integer |
| end | Stop playing video from start in seconds | -1 | positive integer |
| allow-fullscreen | Displays fullscreen button | 1 | 0 |
| locale | Sets the player's interface language | '' | 'fr', 'fr-ca',.. |
| annotations | 1 causes video annotations to be shown by default, whereas setting to 3 causes video annotations to not be shown by default. | 3 | 1, 2 |
| loop | Loop a video | 0 | 1 |
| modest-branding | Minimize YouTube logo | 1 | 0 |
| plays-inline | plays video inline for iOS. | 0 | 1 |
| show-info | Displays information | 0 | 1 |
...
