<template>
	<div class="star">
		<ul class="star-list">
			<li v-for="item in starlist" @click="open(item.name)">
				<img :src="item.img">
				<h2>{{item.name}}</h2>
			</li>
		</ul>

		
	</div>

</template>

<script>
	import axios from 'axios'
	import store from '@/store'
	
	export default {
		name:'star',
		data(){
			return {
			}
		},
		methods:{			
			open: function(id){  //打开歌手歌单列表页面
				
				store.dispatch('set_isShowList');
				store.dispatch('set_Starname',id)
			}
		},
		computed: {
			
			starlist(){
				return this.$store.getters.getstarList;
			}

		}
	}
</script>

<style lang="scss">
	.star{
		position: fixed;
		width: 100%;
		overflow: auto;
		top: 5.5rem;
		bottom: 5rem;
		left: 0;
		padding: .5rem;
		background: #f0f4f3;
	}
	.star-list{
		overflow: auto;

		li{
			width: 25%;
			float: left;
			box-sizing:border-box;
			padding: .4rem .8rem;
			cursor: pointer;

			img{
				width: 100%;
				hight: auto;
			}
			h2{
				font-size: 1.4rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}



</style>