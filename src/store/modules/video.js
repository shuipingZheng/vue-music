const video = {
	state: {
		videoList: [],  //所有视频数据
		videoIndex: 0,  //播放视频下标
		showVideo: false  //显示播放页
	},
	getters: {
		getvideoList: state => state.videoList,
		getNowVideo: state => state.videoList[state.videoIndex], //当前播放视频信息
		getShowVideo: state => state.showVideo


	},
	mutations: {
		setVideoList: (state,data) => {
			state.videoList = data
		},
		setVideoIndex: (state,index) => {
			state.videoIndex = index
		},
		setShowVideo: state => state.showVideo ? state.showVideo = false : state.showVideo = true
	},
	actions: {

	}
}

export default video