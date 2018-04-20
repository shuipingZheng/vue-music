const collection={
	state:{
		loveList: []  //收藏音乐列表
		
	},
	getters:{
		getLoveList: state => state.loveList,
		getIsLove: (state,id) => {
			return state.isLove
		}
	},
	mutations:{
		setLoveList: (state,data) => {
			
			state.loveList = data;
			
		},
		addloveMusic: (state,data) =>{
			state.loveList.push(data);
			localStorage.setItem('loveList',JSON.stringify(state.loveList))
		},
		removeCollection: (state,data) =>{
			state.loveList.splice(state.loveList.indexOf(data),1);
			localStorage.setItem('loveList',JSON.stringify(state.loveList))
		}
	},
	actions:{

	}
}

export default collection