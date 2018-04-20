
const starList ={
	state: {
		isShow: false,
		starlistAll: {}, //所有歌手数据信息
		starName: '', //选中歌手
		BangList: [] //榜单所有数据
	},

	getters: { //获取state中的一些状态
		getIsShow: state =>  state.isShow,
		//获取歌手所有数据
		getstarList: state => state.starlistAll,
		//点击歌手进入列表数据
		getStarMusicList: state => state.starlistAll[state.starName],
		//榜单所有数据
		getBangList: state => state.BangList
	},

	mutations: { //修改状态
		//设置starList页显示隐藏
		isShowList: state => state.isShow ? state.isShow = false : state.isShow = true ,
		//设置歌手所有数据
		setStarlistAll: (state,obj) => {
			state.starlistAll = obj;
		},
		//点击歌手
		setStarname: (state, id ) =>{
			state.starName = id
		},
		setBangList: (state,data) =>{
			state.BangList = data
		}
		
	},
	actions: {
		//设置starList页显示隐藏
		set_isShowList ({commit}) {

			commit('isShowList')
		},
		//设置歌手所有数据
		set_starlistAll({commit},obj){

			commit('setStarlistAll',obj)
		},
		//点击歌手
		set_Starname({commit},id){

			commit('setStarname',id)
		}

	}
}

export default starList