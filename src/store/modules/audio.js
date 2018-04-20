const audio = {
	state:{
		audioElement: '', //audio dom
		audio :{   //当前播放音乐信息
			id: 0,
			name: '',
			img: '',
			artist: '', //歌手
			album: '', //专辑
			src: '',

		},
		musicList: [], //播放列表
		//歌单类型  为了区分播放歌单而添加音乐进播放列表
		songSheetType: '',
		// 当前音乐的index索引
		currentIndex: 0,
	
		// 是否正在播放
		playing: false,
		// 是否正在加载
		waiting: false,
		// 播放类型   1是循环播放  2是随机播放  3是单曲播放
		playType: 1,
		// 当前播放的时间
		currentTime: 0,
		// 音乐的播放时长
		musicDuration: 0,
		// 音乐是否在加载
		musicLoadStart: false,
		//音乐时长
		duration: 0, 
		//是否循环播放
		loop: false
	},
	getters:{
		//获取audio元素
		getaudioElement: state => state.audioElement,
		//获取audio信息
		getAudioInfo: state => 	state.musicList[state.currentIndex],
		//获取播放列表
		getMusicList: state => state.musicList,
		//获取当前音乐所有信息
		getMusicInfo: state => state.musicList[state.currentIndex],
		// 是否正在播放
		getPlaying:  state => state.playing,
		//音乐时长
		getDuration: state => state.duration,
		//音乐播放时间
		getcurrentTime: state => state.currentTime,
		//播放类型
		getPlayType: state => state.playType,
		//是否循环播放
		getLoop: state => state.loop



	},
	mutations:{
		//设置audio dom
		setaudioElement: (state, ele) => state.audioElement  = ele,
		//设置audio src
		setAudioSrc: (state) => {
			state.audioElement.setAttribute('src',  state.musicList[state.currentIndex].url);
			state.audioElement.load()
		},
		// 当前音乐的index索引
		setCurrentIndex: (state, index) => state.currentIndex  = index,
		//设置当前播放列表音乐
		setMusicList: (state , data) =>{
			state.musicList  = data
		},
		//设置音乐播放时间
		setCurrentTime: (state, time) => {
			state.currentTime = time
		},
		//设置播放类型
		setPlayType: (state,num) => {
			state.playType = num
		},
		//设置是否循环播放
		setLoop: (state, loop) => {
			state.loop = loop
		},
		//setPlayIng: (state) => state.playing ? state.playing = false : state.playing = true,
		// 设置当前的播放索引
		playIndex (state, obj) {
			state.currentIndex = obj.index
			state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioElement.load()
			state.audioElement.play()
		},
		// play设置
		play (state) {
			state.playing = true
			state.audioElement.play()
		},
		// 暂停设置
		pause (state) {
			state.playing = false
			state.audioElement.pause()
		},
		togglePlay (state) {
			if (state.playing) {
				state.playing = false
				state.audioElement.pause()
			} else {
				state.playing = true
				state.audioElement.play()
			}
		},
		// 设置音乐结束自动播放播放类型的歌曲
		playEnded (state) {

			if(state.playType != 3){
				state.currentIndex ++
				let length = state.musicList.length

				if (state.currentIndex >= length) {
					state.currentIndex = 0
				}
				state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
				state.playing = true
				state.audioElement.load()
				state.audioElement.play()
			}
			
			
			
		},
		//上一首
		playPrev (state){
			state.currentIndex --
			const length = Object.keys(state.musicList).length    //  Object.keys() 方法会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组
			
			if (state.currentIndex < 0) {
				state.currentIndex = length-1
			}
			state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioElement.load()
			state.audioElement.play()
		},
		//下一首
		playNext (state){  //还会加上播放类型 列表循环 单曲 随机

			state.currentIndex ++
			const length = Object.keys(state.musicList).length

			if (state.currentIndex >= length) {
				state.currentIndex = 0
			}
			state.audioElement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioElement.load()
			state.audioElement.play()
		},
		setDuration (state, obj){
			state.duration = obj.duration
		}
		/*// play设置
		play (state) {
			
			
		},*/
	},
	actions:{
		//设置audio dom
		set_audioElement ({commit},ele){
			commit('setaudioElement', ele)
		},
		//设置audio src
		set_audioSrc ({commit},src){
			commit('setAudioSrc', src)
		},
		// 设置音乐结束自动播放播放类型的歌曲
		set_playEnded (commit){
			commit('playEnded')
		},
		//设置音乐时间
		set_duration ({commit},obj){
			commit('setDuration',obj)
		},
		//设置音乐播放时间
		set_CurrentTime ({commit},obj){
			commit('setCurrentTime',obj.time)
		},
		//设置播放类型
		set_playType ({commit},obj){
			commit('setPlayType',obj.num)
		}


	}
}

export default audio