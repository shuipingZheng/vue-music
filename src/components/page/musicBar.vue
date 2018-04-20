<template>
    <div class="musicBar" @click="openMusic">
         <div class="footerContent" >
             <div class="songImg">
                <img :src="musicImg"> 
            </div>
            <div class="songInfo">
                <p class="songName">{{musicName}}</p>
                <p class="songRemark">{{musicArtist}}</p>
            </div>
            <div class="operation">
                <span  class="iconfont" :class="isplaying ? 'icon-pause-detail' : 'icon-playdetail'" @click.stop="playpause"></span>
                <span class="iconfont icon-list-music"></span>
            </div> 

        </div>
 
    </div>
</template>

<script>
import store from '@/store'

	export default{
		name: 'musicBar',
        data(){
            return {

            }
        },
        methods:{
            playpause (){
                store.commit('togglePlay')
            },
            openMusic (){

                store.commit('set_isShowMusic')
            }
        },
        computed: {
            isplaying (){
                return this.$store.getters.getPlaying
            },
            musicImg (){
                return this.$store.getters.getAudioInfo ? this.$store.getters.getAudioInfo.img : ''
            },
            musicName (){
                return this.$store.getters.getAudioInfo ? this.$store.getters.getAudioInfo.name : ''
            },
            musicArtist (){
                return this.$store.getters.getAudioInfo ? this.$store.getters.getAudioInfo.artist : ''
            }
        }
	}
</script>

<style lang="scss">
    $mainColor: #d2392b;
    $fontSize: 1rem;

    .musicBar{
        width: 100%;
        height: 5rem;
        position: fixed;
        bottom: 0;
        left: 0;
    }

    .footerContent{
        display: -webkit-flex;
        display: flex;
        padding: 0.5rem;
        height: 5rem;


        .songImg{
            width: 4rem;
            height: 4rem;
           

            img{
                width: 4rem;
                height: auto;
            }
        }

        .songInfo{
            flex: 1;


            p{
                text-align: left;
                text-indent: .5rem;
                line-height: 2rem;
                height: 2rem;
                overflow: hidden;
                
                &.songName{
                    font-size: 1.6rem;
                    color: #313131;
                }

                &.songRemark{
                    font-size: 1.2rem;
                    color: #787878;
                }
            }

        }

        .operation{
            width: 8rem;
            display: flex;

            span{
              display: flex;
              flex: 1;
              align-items: center;
              justify-content: center;

            }

            .iconfont{
                font-size: 2.5rem;
            }
        }
    }
</style>

