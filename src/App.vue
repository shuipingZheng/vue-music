<template>
  <div id="app">
  <audio id="myaudio" ref="audio" src="" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @ended="musicEnded" @error="musicError" @paused="paused" :loop="isLoop"></audio>
    <div class="header">
      <router-link v-for="(n,index) in navList" :to="n.link" active-class="active" exact>{{n.name}}</router-link>
    </div>


    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    
    <music-bar></music-bar>

    <music></music>

    <!-- 播放视频 -->
    <videoPlay v-if="showVideo"></videoPlay>

    <star-list v-if="showList"></star-list>
  </div>
</template>

<script>
import song from '@/components/page/song.vue'
import star from '@/components/page/star.vue'
import mv from '@/components/page/mv.vue'
import starList from '@/components/page/starList.vue'
import musicBar from '@/components/page/musicBar.vue'
import music from '@/components/page/music.vue'
import videoPlay from '@/components/page/video.vue'
import axios from 'axios'
import store from './store'

export default {
  name: 'App',
  data () {
    return {
      navList:[{
        name: '榜单',
        link: '/'
      },{
        name: '歌手',
        link: '/star'
      },{
        name: 'MV',
        link: '/mv'
      },{
        name: '发现',
        link: '/discover'
      }]
    }
  },
  methods: {
  
    //播放结束
    musicEnded (){
      store.commit('playEnded')
    },
    //文件加载错误
    musicError (){
     // alert("请检查网络是否可用");
    },
    paused (){
      store.commit('pause')
    },
    //可以播放
    musicCanPlay (){
      store.dispatch({
        type: 'set_duration',
        duration: Math.floor(this.$refs.audio.duration)
      })
    },
    // 音乐播放时间更新事件
    musicTimeUpdate () {
      store.dispatch({
        type: 'set_CurrentTime',
        time: Math.floor(this.$refs.audio.currentTime)
      })
    }
  },
  components:{
    song: song,
    star: star,
    starList: starList,
    musicBar: musicBar,
    music: music,
    mv: mv,
    videoPlay: videoPlay
  },
  created (){
    //audio 存在store
    var _this = this;
    //setTimeout(function(){
      
     
    //},10)
    //榜单
    axios.get('../static/music.json')
      .then(function (response) {
      store.commit('setBangList',response.data)
      /*if(localStorage.getItem('appMusic')){

      }else{*/
        //默认选中歌单与歌曲
        store.commit('setMusicList', response.data);
      //}
      
      
      store.dispatch('set_audioElement',_this.$refs.audio);
      store.commit('setCurrentIndex',0);
      store.commit('setAudioSrc');
    })
    .catch(function (error) {
      console.log(error);
    });
    //歌手
    axios.get('../static/star.json')
    .then(function(res){
      store.dispatch('set_starlistAll', res.data);
      //this.starlist = res.data;
    })
    .catch(function(error){
      console.log(error)
    })
    //获取缓存中的收藏
    let data = localStorage.getItem("loveList")== null ? [] : JSON.parse(localStorage.getItem("loveList"));
    store.commit("setLoveList",data) 
   
  },
  computed:{
    showList(){  //点击歌手才加载歌手歌曲列表，防止刚加载没有参数出现报错
      return this.$store.getters.getIsShow
    },
    playing(){  //是否在播放
      return this.$store.getters.getPlaying
    },
    //是否循环播放
    isLoop (){
      return this.$store.getters.getLoop
    },
    showVideo (){
      return this.$store.getters.getShowVideo
    }
  }
}
</script>

<style>

div,h1,h2,h3,h4,ul,p{
  margin: 0px;
  padding: 0px;
}
html{
  font-size: 10px;
}
ul{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;

}
.header{
  position: fixed;
  top: 0;
  width: 100%;
  height: 5.5rem;
  background-color: #7e57c2;
  display: flex;

}

.header a{
  color: #fff;
  font-size: 1.6rem;
  display: flex;
  flex:1;
  align-items: center;
  justify-content: center;
}
.header a.active{
  color: #ff4081;
}

.iconfont{
  font-size: 2rem;
}
</style>
