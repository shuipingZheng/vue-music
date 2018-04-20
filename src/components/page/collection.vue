<!-- 收藏音乐 -->
<template>
	<div class="collection">
		<ul class="song-list">
			 <li v-for="(song,index) in songs" @click="playIndex(index)" :data-id="song" >
			 	<span class="song-list-img"><img :src="song.img" width="24" height="24"></span>
			 	<div class="song-list-content">
			 		<h1>{{song.name}}</h1>
			 		<p>{{song.artist}}({{song.album}})</p>
			 	</div>
			</li> 
		</ul>
		<p v-show="isLen">没有收藏的歌曲~</p>
	</div>

</template>

<script>
	import axios from 'axios'
	import store from '@/store'

	export default{
		name: 'song',
		methods: {
			
			playIndex: function(index){
				
				store.commit('setMusicList', this.songs); //将音乐放进播放列表

				//store.commit('setCurrentIndex',index); //当前点击音乐下标
				store.commit({
					type: 'playIndex',
					index: index
				})
			}
		},
		computed:{
			songs(){
				return this.$store.getters.getLoveList
			},
			isLen(){
				return this.$store.getters.getLoveList.length>0 ? false : true 
			}
		},
		/*created(){
			let data = localStorage.getItem("loveList")== null ? [] : JSON.parse(localStorage.getItem("loveList"));
			store.commit("setLoveList",data) 
		}*/
	}
</script>

<style lang="scss">
	.collection{
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
			padding: .4rem .8rem;
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

				}

				p{
					font-size: 1rem;
					color: #7c7c7c;
				}
			}


		}
	}
</style>