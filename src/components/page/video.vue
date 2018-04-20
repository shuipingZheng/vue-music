<template>
	<div class="videoPlay">
		<span class="iconfont icon-close" @click="closeVideo"></span>
		 <video-player  class="vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @ready="playerReadied"
                    @statechanged="playerStateChanged($event)">
        </video-player> 
	</div>

</template>

<script>
import store from '@/store'

	export default{
		name:'videoPlay',
		data() {
		      return {
		        // videojs options
		        playerOptions: {
		          muted: true,
		          language: 'zh-CN',
		          //playbackRates: [0.7, 1.0, 1.5, 2.0],
		          autoplay: true,
		          sources: [{
		            type: "video/mp4",
		            // mp4
		            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm", //http://vjs.zencdn.net/v/oceans.mp4
		          }],
		          poster: "", //https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg
		        }
		      }
		    },
		    mounted() {
		      // console.log('this is current player instance object', this.player)
		      //setTimeout(() => {
		        console.log('dynamic change options', this.player)
		        // change src
		        // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
		        // change item
		        // this.$set(this.playerOptions.sources, 0, {
		        //   type: "video/mp4",
		        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
		        // })
		        // change array
		        // this.playerOptions.sources = [{
		        //   type: "video/mp4",
		        //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
		        // }]
		        this.player.muted(false)
		      //}, 2000)
		    },
		    computed: {
		      player() {
		        return this.$refs.videoPlayer.player
		      }
		    },
		    methods: {
		      // listen event
		      onPlayerPlay(player) {
		        // console.log('player play!', player)
		      },
		      onPlayerPause(player) {
		        // console.log('player pause!', player)
		      },
		      onPlayerEnded(player) {
		        // console.log('player ended!', player)
		      },
		      onPlayerLoadeddata(player) {
		        // console.log('player Loadeddata!', player)
		      },
		      onPlayerWaiting(player) {
		        // console.log('player Waiting!', player)
		      },
		      onPlayerPlaying(player) {
		        // console.log('player Playing!', player)
		      },
		      onPlayerTimeupdate(player) {
		        // console.log('player Timeupdate!', player.currentTime())
		      },
		      onPlayerCanplay(player) {
		        // console.log('player Canplay!', player)
		      },
		      onPlayerCanplaythrough(player) {
		        // console.log('player Canplaythrough!', player)
		      },
		      // or listen state event
		      playerStateChanged(playerCurrentState) {
		        // console.log('player current update state', playerCurrentState)
		      },
		      // player is ready
		      playerReadied(player) {
		        // seek to 10s
		        console.log('example player 1 readied', player)
		        //player.currentTime(10)
		        // console.log('example 01: the player is readied', player)
		      },
		      closeVideo() {
		      	store.commit('setShowVideo');
		      }
		    },
		    created() {
		    	//console.log(this.playerOptions.sources)
		    	//this.playerOptions.sources[0].src = this.$store.getters.getNowVideo.mvUrl
		    	this.playerOptions.poster = this.$store.getters.getNowVideo.img
		    }

		}


</script>

<style lang="scss">
	.videoPlay{
		position: fixed;
		width: 100%;
		height: auto;
		top: 0;
		bottom: 0;
		left: 0;
		background: #000000;

		span.icon-close{
			position: absolute;
			top: 1rem;
			right: 1rem;
			color: #fff;
			cursor: pointer;
			z-index: 9;
		}
	}

	.video-player{
		position: absolute;
		left: 0;
		width: 100%;
		height: auto;
		top: 50%;
		transform: translateY(-50%);
		.video-js{
			width: 100%;
		}

	}

</style>