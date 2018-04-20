
//打开音乐播放页面
const openMusic={
	state: {
		isShowMusic: false
		
	},
	getters: {
		getIsShowMusic: state => state.isShowMusic
	},
	mutations: {
		//打开关闭音乐播放页面
		set_isShowMusic: state => state.isShowMusic ? state.isShowMusic = false : state.isShowMusic = true
	},
	actions: {

	}
}

export default openMusic