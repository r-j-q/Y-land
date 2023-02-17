const baseUrl = "https://tdpm.shningmi.com/applet/";
function request(params){
	var arg = "";
	var token = uni.getStorageSync('token');
	if(params.url != "authorization" && params.url != "login" && params.url != "getBanner" && params.url != "getAuctionStatus" && params.url != "getLandLst" && params.url != "getRegionList"){
		if(!token){
			uni.navigateTo({
				url:"../signin/signin",
				animationType: 'pop-in',
				animationDuration: 300
			})
			return;
		}else{
			params.header.token = token;
		}
	}
	uni.showLoading({
		title: '加载中'
	});
	if (params && params.data) {
		arg = {
			method: params.method,
			header: params.header,
			data: params.data,
			url: baseUrl + params.url,
		}
	} else {
		arg = {
			method: params.method,
			header: params.header,
			url: baseUrl + params.url,
		}
	}
	
	return new Promise(function(resolve, reject){
		uni.request({
			...arg,
			success:(res) =>{
				if(res.data.code == 209){
					uni.navigateTo({
						url:"../signin/signin",
						animationType: 'pop-in',
						animationDuration: 300
					})
					uni.hideLoading();
					return;
				}
				resolve(res);
			uni.hideLoading();
			}
		})
	})
}

export {
	request,
}