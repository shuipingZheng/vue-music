<template>
	<transition name="sideUp">
		<div class="music" v-show="isShowMusic"  transiton="sideUp">
			<div class="musicBg" :style="{backgroundImage:'url('+musicImg+')'}"></div>
			<div class="musiccontainer">
				<!-- 头部 -->
				<div class="musicHeader">
					<div class="musicBack hide" @click="closeMusic"><i class="iconfont icon-left"></i></div>
					<div class="musicTitle" ref="namebox">
						<p class="musicName" ref="musicname" :class="exceed ? 'scroll': '' ">{{musicName}}</p>
					</div>
					<div class="musicShare"><i class="iconfont icon-share"></i></div>
				</div>

				<p class="musicArtist">{{musicArtist}}</p>
				<!-- 旋转CD唱片 -->
				<div class="rotate" ref="rotate">
					<div class="rotateImg" ref="rotateImg" :class="isplaying ? 'active' : ''">
						<img :src="musicImg">
						<div class="rotateImgBg"></div>
					</div>
				</div>
				<!-- 更多 -->
				<div class="more">
					<span class="icon-like" :class="isLove ? 'active' : ''" @click="islove"></span>
					<span class="icon-download"></span>
					<span class="icon-msg"></span>
					<span class="icon-list-circle"></span>
				</div>
				<!-- 进度条 -->
				<div class="range">
					<div class="rangeContent">
						<div class="rangeBtn" :style="'left:'+rangeProgress+'%'"></div>
						<div class="rangeProgress" :style="'width:'+rangeProgress+'%'"></div>
						<div class="rangeRunway"></div>
					</div>
					<div class="currentTime">
						<span class="sTime">{{musicCurrentTime}}</span>
						<span class="eTime">{{musicDuration}}</span>
					</div>
				</div>
				<!-- 底部音乐操作 -->
				<div class="musicfooter">
					<span class="iconfont" :class="musicPalyType" @click.top="playType"></span>
					<span class="iconfont icon-prevdetail" @click.stop="playPrev"></span>
					<span class="iconfont" :class="isplaying ? 'icon-pause-detail' : 'icon-playdetail'" @click.stop="playpause"></span>
					<span class="iconfont icon-nextdetail" @click.stop="playNext"></span>
					<span class="iconfont icon-list-music"></span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import store from '@/store'

	export default{
		name: 'music',
		data() {
			return {
				isplay: false,
				exceed: false,  //长标题添加滚动效果
				name: '',
			}
		},
		methods: {
			closeMusic (){  //关闭当前页面
                store.commit('set_isShowMusic')
            },
            playpause (){  //播放暂停
                store.commit('togglePlay')
            },
            playPrev (){ //上一首
            	store.commit('playPrev')
            },
            playNext (){  //下一首
            	store.commit('playNext')
            },
            playType (){  //播放类型 1是循环播放  2是随机播放  3是单曲播放

            	let n = this.$store.getters.getPlayType;

            	n++;
            	if(n > 3){
            		n = 1;
            	}

            	store.dispatch({
            		type :'set_playType',
            		num: n
            	});
            },
            switchTime (time){
            	let m = Math.floor(time / 60);
            	let s = Math.floor(time % 60);
            	if(m < 10){
            		m = '0'+ m;
            	}

            	if( s < 10){
            		s = '0' + s;
            	}

            	return m+':'+s
            },
            islove (){
            	let data = this.$store.getters.getMusicInfo;

            	if( this.isLove ){
            		store.commit("removeCollection",data)
            		//console.log(this.$store.getters.getLoveList.findIndex(data))

            	}else{

            		store.commit("addloveMusic",data)
            	}
            	
            }
		},

		computed:{
			isLove (){
				/*console.log(localStorage.loveList)
				console.log(this.$store.getters.getLoveList)
				console.log(this.$store.getters.getAudioInfo)
				console.log(this.$store.getters.getLoveList.indexOf(this.$store.getters.getAudioInfo))*/
				return this.$store.getters.getLoveList.indexOf(this.$store.getters.getAudioInfo) == -1 ? false : true;
			},
			isShowMusic (){
				return this.$store.getters.getIsShowMusic
			},
            //图片
            musicImg (){
                return this.$store.getters.getAudioInfo ? this.$store.getters.getAudioInfo.img : ''
            },
            //音乐标题
            musicName (){
            	
                return this.$store.getters.getAudioInfo ? (this.$store.getters.getAudioInfo.name, this.name = this.$store.getters.getAudioInfo.name) : '未知歌名'
            },
            //歌手
            musicArtist (){
                return this.$store.getters.getAudioInfo ? this.$store.getters.getAudioInfo.artist : '未知歌手'
            },
            isplaying (){
				this.isplay = this.$store.getters.getPlaying;
                return this.$store.getters.getPlaying
            },
            //已播放时间
            musicCurrentTime (){
            	
            	return this.$store.getters.getcurrentTime ? this.switchTime(this.$store.getters.getcurrentTime) :'00:00'
            },
            //音乐时长
            musicDuration (){
				return this.$store.getters.getDuration ? this.switchTime(this.$store.getters.getDuration) : '00:00'
            },
            //播放类型
            musicPalyType (){
            	let typeClass = 'icon-music-shunxu'

            	switch( this.$store.getters.getPlayType ){
            		case 1: 
            			typeClass = 'icon-music-shunxu'; 
            			store.commit('setLoop',false);
            			break;
            		case 2: 
            			typeClass = 'icon-music-random'; 
            			store.commit('setLoop',false);
	            		break;
	            	case 3: 
	            		typeClass = 'icon-music-danqu1'; 
	            		store.commit('setLoop',true);
            			break;
            	}
 
            	return typeClass
            },
            rangeProgress (){
            	let c = this.$store.getters.getcurrentTime 
            	let d = this.$store.getters.getDuration
            	let p = (c/d)*100;
            	return p
            }
		},
		watch:{
			isplay: function(newisplay,oldisplay){
			
				if(!newisplay){
					let rotate = getComputedStyle(this.$refs.rotate).transform
					let rotateImg = getComputedStyle(this.$refs.rotateImg).transform
					this.$refs.rotate.style.transform = rotate === 'none' ? rotateImg : rotateImg.concat('', rotate)
				}
				
			},
			//长标题添加滚动效果
			name: function(val,oldval){
				let _this = this;
				this.exceed = false;
				setTimeout(function(){
					let namebox = _this.$refs.namebox.getBoundingClientRect().width
					let musicname = _this.$refs.musicname.getBoundingClientRect().width
					return musicname > namebox ?  _this.exceed = true :  _this.exceed = false
				},1000)
				
			}
		}
	}
</script>

<style lang="scss">
	@keyframes goRotate{
		0%{
			transform: rotate(0)
		}
		50%{
			transform: rotate(180deg)
		}
		100%{
			transform: rotate(360deg)
		}
	}
	@keyframes scroll{
		0%{
			transform: translateX(0%)
		}
		50%{
			transform: translateX(-50%)
		}
		100%{
			transform: translateX(-100%)
		}
	}
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
	.music{
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		top: 0;
		left: 0;
		z-index: 99;
		background: #aaa;
		padding-bottom: 1rem;
		color: #fff;

		.musicBg{
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: -1;
			top: 0;
			left: 0;
			background-size: cover;
			background-position: center center;
			filter: blur(30px);
		}
	}

	.musiccontainer{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.15);

		.musicHeader{
			display: flex;
			height: 3.6rem;
			background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(100, 100, 100, 0.1), transparent);



			.musicBack{
				display: flex;
				width: 3.6rem;
				height: 3.6rem;
				align-items: center;
  				justify-content: center;
			}

			.musicTitle{
				display: flex;
				flex: 1;
				height: 3.6rem;
				line-height: 3.6rem;
				align-items: center;
  				justify-content: center;
  				font-size: 1.6rem;
  				overflow: hidden;
  				position: relative;

  				.musicName{
  					white-space:nowrap;
  					position: absolute;
  					left: 0;
  					top: 0;


  					&.scroll{
  						animation: scroll 18s linear infinite 1s;
  					}
  				}

			}

			.musicShare{
				display: flex;
				width: 3.6rem;
				height: 3.6rem;
				align-items: center;
  				justify-content: center;

				i{
					font-size: 2.5rem;
				    vertical-align: middle;	
				}
			}

		}

		.musicArtist{
			padding: 0 3.6rem;
		}

		.rotate{
			position: relative;
			width: 25rem;
			height: 25rem;
			margin: 5rem auto 0 !important;

			.rotateImg{
				position: relative;
				width: 25rem;
				height: 25rem;
				margin: 0 auto !important;

				img{
					position: absolute;
					width: 20rem;
					height: 20rem;
					top: 2.5rem;
					left: 2.5rem;
					border-radius: 50%;
				}

				.rotateImgBg{
					position: absolute;
					width: 25rem;
					height: 25rem;
					top: 0;
					left: 0;
					background-image: url(/static/image/cd-mine.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}

				&.active{
					animation: goRotate 16s linear infinite 0.1s;
				}
			}
		}
		
		.more{
			position: fixed;
			bottom: 10rem;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			width: 70%;

			span{
				display: flex;
				flex: 1;
				align-items: center;
  				justify-content: center;
  				font-size: 2rem;

  				&.active{
  					color: #ff4081;
  				}

			}
		}

		.range{

			position: fixed;
			width: 100%;
			height: 3rem;
			bottom: 3rem;
			z-index: 90;


			.rangeContent{
				position: relative;


				.rangeRunway{
					position: absolute;
					top: 50%;
				    transform: translateY(-50%);
				    left: 0px;
				    right: -30px;
				    border-top-color: rgb(169, 172, 177);
				    border-top-style: solid;


				}

				.rangeProgress{
					position: absolute;
				    display: block;
				    background-color: #f61461;
				    top: 50%;
				    transform: translateY(-50%);
				    width: 0%;
				    height: 3px;
				    z-index: 9;
				}

				.rangeBtn{
					width: 1rem;
					height: 1rem;
					position: absolute;
					background-color: #ffffff;
				    top: 50%;
				    transform: translateY(-50%);
				    z-index: 99;
				    border-radius: 50%;
				    left: 0%;
				    cursor: pointer;
				    margin-left: -0.5rem !important;

				}
			}

			.currentTime{
				font-size: 1.2rem;
				padding-top: .3rem;

				.sTime{
					float: left;
					padding-left: .25rem;

				}
				.eTime{
					float: right;
					padding-right: .25rem;
				}
			}
		}

		.musicfooter{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 5rem;
			//background: #4c5858;
			display: flex;
			z-index: 99;
			background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);

			span{
				display: flex;
				flex: 1;
				align-items: center;
  				justify-content: center;
  				font-size: 3rem; 

  				&.icon-music-danqu1{
  					font-size: 2.5rem
  				}

  				&.icon-music-shunxu{
  					font-size: 2.8rem
  				}
			}
		}
	}

</style>