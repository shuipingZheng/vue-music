<template>
	<transition name="sideUp">
		<div class="starList" v-show="isShow" transiton="sideUp">
			<div class="starListcontainer">
				<div class="mu-appbar">
					<div @click="hide" class="hide"><i class="iconfont icon-left"></i><span>歌手</span></div>				
				</div>

				<div class="star-list-header">
					
					<div class="lazyLoad">
						<img :src="songlist.img">
					</div>
					<div class="star-info">
						<h3>{{songlist.name}}</h3>
						<p><span class="badge">歌手</span></p>
						<p>标签：华语/流行</p>
					</div>

				</div>

				<div class="star-list-content">
					<ul>
						<li >
							<i></i>
							<span class="name tab">音乐标题</span>
							<span class="album tab">专辑</span>
						</li>
						<li v-for="(item,index) in songlist.data" :data-id="songlist.name" @click="playmusic(songlist.name,index)">
							<i>{{index+1}}</i>
							<span class="name">{{item.name}}</span>
							<span class="album">{{item.album}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
 	import store from '@/store'

	export default{
		name: 'starList',
		data(){
			return {
				
			}
		},
		/*props:{ //接收父组件数据
			star:{
				type: Object,
                default: 0
			},
			isShow:{
				type: Boolean,
                default: false
			}
		},*/
		methods:{
			hide: function(){
				store.dispatch('set_isShowList');
			},
			playmusic: function(name,index){
				
				store.commit('setMusicList', this.songlist.data); //将音乐放进播放列表

				store.commit({
					type: 'playIndex',
					index: index
				})
				//console.log(this.$store.getters.getStarMusicList.data)
				//store.commit('setMusicList', this.$store.getters.getStarMusicList);
			}
		},
		
		computed: {
			isShow(){
				return this.$store.getters.getIsShow
			},
			songlist(){

				return  this.$store.getters.getStarMusicList
			}

		}
	}
</script>

<style lang="scss">

	.sideUp-enter-to, .sideUp-leave-to {
        transition: all .2s
    }
    .sideUp-enter{
    	transform:translate3d(0,100%,0);
    	opacity: 0
    }
    .sideUp-leave-to {
       transform:translate3d(100%,0,0);
       opacity: 0
    }

	.starListcontainer{
		padding-top: 5.5rem;

		.mu-appbar{
			position: fixed;
			top: 0px;
		}
	}

	.hide{
		
		i{
			
			vertical-align: middle;
		}
		span{
			font-size: 1.6rem;
			vertical-align: middle;
		}
	}


	.starList{
		position: fixed;
		width: 100%;
		overflow: auto;
		top: 0;
		bottom: 5rem;
		left: 0;
		background: #f2f2f2;
		padding-bottom: 1rem;
	}

	.star-list-header{
		display: flex;
		border-bottom: 1px solid #ff4081;
		margin-bottom: .8rem !important;

		.lazyLoad{
			width: 10rem;
			padding: .8rem;

			img{
				width: 100%;
				height: auto;
			}
		}

		.star-info{
			flex: 1 1 auto;
			padding: .8rem;
			text-align: left;

			h3{
				margin: 0;
			}

			span{
				padding: .04rem .4rem;
    			display: inline-block;
				background: #ff4081;
				color: #fff;
				border-radius: 10%;
			}
		}
	}
	.star-list-content{

		ul{
			overflow: hidden;

			li{
				display: flex;
				text-align: left;
				padding: .2rem .4rem;
				cursor: pointer;

				i{
					flex: .1 1 0;
					text-align: center;
				}
				.name{
					flex: .5 1 0;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					vertical-align: middle;

				}


				.album{
					flex: .4 1 0;
					font-size: 1rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					align-items: center;
  					justify-content: center;
				}

				.tab{
					font-size: 1.4rem;
				}
				&:nth-child(odd){
					background: #e1e2e4;
				}

			}
		}
	}
</style>