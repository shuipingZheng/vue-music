<template>
	<div class="mv">
		<ul class="mv-list">
			<li v-for="(video,index) in mvList" @click="playVideo(index)">
				<div class="mask"></div>
				<div class="playdetail icon-playdetail"></div>
				<img :src="video.img">
				<h1>{{video.title}}</h1>
				<h1 class="videoName">{{video.name}}</h1>
			</li>
		</ul>

	</div>

</template>

<script>
import axios from 'axios'
import store from '@/store'

export default{
	name: 'mv',
	data(){
		return {
			mvList: {}
		}
	},
	methods:{
		getData: function(){
			let self = this;
			axios.get('../../../static/mv.json')
			.then(function(res){
				self.mvList = res.data;
				store.commit('setVideoList',res.data);
			})
			.catch(function(error){
				console.log(error)
			})
		},
		playVideo (index){
			store.commit('setVideoIndex',index);
			store.commit('setShowVideo');
			store.commit('pause')
		}
		
	},
	created: function(){
		this.getData();
	},
	computed: {
		
		

	}
}
</script>


<style lang="scss">
	.mv{
		position: fixed;
		width: 100%;
		overflow: auto;
		top: 5.5rem;
		bottom: 5rem;
		left: 0;
		padding: .5rem;
		background: #f0f4f3;
	}
	.mv-list{
		overflow: auto;

		li{
			width: 100%;
			float: left;
			box-sizing:border-box;
			cursor: pointer;
			position: relative;
			margin-bottom: 2rem !important;

			.mask{
				width: 100%;
				height: 5rem;
				position: absolute;
				top: 0;
				left: 0;
				background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent);

			}

			.playdetail{
				width: 4rem;
				height: 4rem;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -2rem !important;
				margin-top: -3rem !important;
				background: rgba(0,0,0,0.2);
				color: #fff;
				border-radius: 50%;
				font-size: 5rem;

				&:hover{
					color: #ff4081;
				}
			}

			img{
				width: 100%;
				hight: auto;
			}
			h1{
				font-size: 1.4rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				text-align: left;

				&.videoName{
					position: absolute;
					width: 100%;
					top: 1rem;
					color: #fff;
					
					text-indent: 2rem;
				}
			}
		}
	}
</style>