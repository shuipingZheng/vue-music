<template>
	<div class="songs">
		<ul class="song-list">
			 <li v-for="(song,index) in songs" @click="playIndex(index)" :data-id="song" >
			 	<span class="song-list-img"><img :src="song.img" width="24" height="24"></span>
			 	<div class="song-list-content">
			 		<h1>{{song.name}}</h1>
			 		<p>{{song.artist}}({{song.album}})</p>
			 	</div>
			</li> 
		</ul>
	</div>

</template>

<script>
	import axios from 'axios'
	import store from '@/store'

	export default{
		name: 'song',
		data(){
			return {
				//songs: ''
			}
		},

		methods: {
			/*getSongs: function() {
				var _self = this;
				axios.get('../../../static/music.json')
				  .then(function (response) {
				    _self.songs = response.data
				    //默认选中歌单与歌曲
				    store.commit('setMusicList', _self.songs);
				    store.commit('setCurrentIndex',0);
				    store.commit('setAudioSrc');
				    
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			},*/
			playIndex: function(index){
				
				store.commit('setMusicList', this.songs); //将音乐放进播放列表

				//store.commit('setCurrentIndex',index); //当前点击音乐下标
				store.commit({
					type: 'playIndex',
					index: index
				})
			}
		},

		/*created: function(){
			this.getSongs();
		},*/

		computed:{
			songs(){
				return this.$store.getters.getBangList
			}
		}
	}
</script>

<style lang="scss">
	.songs{
		position: fixed;
		width: 100%;
		overflow: auto;
		top: 5.5rem;
		bottom: 5rem;
		left: 0;
		padding: .5rem;
		background: #f0f4f3;
	}

	.song-list{

		li{
			display: flex;
			padding: .4rem 0;
			border-bottom: 1px solid #f2f2f2;

			span{
				width: 4rem;
				height: 4rem;

				img{
					width: 4rem;
					height: 4rem;
				}

			}

			.song-list-content{

				flex: 1 1 auto;
				text-align: left;
				line-height: 2rem;
				text-indent: .4rem;

				h1{
					font-size: 1.4rem;
					color: #030303;
					overflow: hidden;
					height: 2rem;
					margin: 0;

				}

				p{
					font-size: 1rem;
					color: #7c7c7c;
				}
			}


		}
	}
</style>