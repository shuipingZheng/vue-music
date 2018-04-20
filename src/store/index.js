import Vue from 'vue'
import Vuex from 'vuex'
import songList from './modules/songList.js'
import Audio from './modules/audio.js'
import Music from './modules/music.js'
import Video from './modules/video.js'
import Collection from './modules/collection.js'
/*import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'
import Reconmmed from './modules/reconmmend.js'*/

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /*allInfo: []*/
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },

  modules: {
    songList: songList,
    Audio: Audio,
    Music: Music,
    Video: Video,
    Collection: Collection

  }
})

export default store
