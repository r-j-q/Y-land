//日期格式转换
function dateFormat(date, time, fmt) {
	var Monthe = date.split('-'); //年月日分割
	var times = time.split(':')
	/*
	 * 日期格式转换
	 * fmt   将要转换的格式样式
	 * date  需转换的时间
	 * console.log(YHUtility.dateFormat('YYYY-mm-dd HH-MM-SS', object.value));
	 * */
	let ret;
	const opt = {
		"Y+": Monthe[0], // 年
		"m+": Monthe[1], // 月
		"d+": Monthe[2], // 日
		"H+": times[0], // 时
		"M+": times[1], // 分
		"S+": "00" // 秒
		// 若需要更多其它格式化字符可以继续向下添加，但必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

function navigateTo(url) {
	uni.navigateTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}

//存储
function setStorage(name, data) {
	uni.setStorage({
		key: name, //对应要修改的键名
		data: data, //修改的数据会覆盖之前键名对应的数据
		success(res) {
			return res;
			console.log(res)
		}
	})
}

function showToast(msg) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: 2000,
	})
}

//时间大小对比
function compareTime(startTime, endTime) {
	var start_time = startTime.replace(/-|\s|:|\//g, '');
	var end_time = endTime.replace(/-|\s|:|\//g, '');
	if (start_time < end_time) {
		return 1;
	} else {
		return 2;
	}

}

// 格式化日对象(获取当前时间)
const getNowDate = () => {
	var date = new Date();
	var sign2 = ":";
	var year = date.getFullYear() // 年
	var month = date.getMonth() + 1; // 月
	var day = date.getDate(); // 日
	var hour = date.getHours(); // 时
	var minutes = date.getMinutes(); // 分
	var seconds = date.getSeconds() //秒
	var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
	var week = weekArr[date.getDay()];
	// 给一位数的数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = "0" + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	return {
		"date": year + "-" + month + "-" + day,
		"time": hour + sign2 + minutes + sign2 + seconds
	};
}

function getStorageSync(info) {
	const data = uni.getStorageSync(info);
	return data;
	// uni.getStorage({
	// 	key:info,
	// 	success: function (res) {
	// 		 var res = res.data;
	// 		 console.log(res,"contsres");
	// 		 // return res;
	// 	}
	// });
}

function moneysion(msg) {
	var currprice;
	var len;
	let digith;
	if (/^-?\d+$/.test(msg)) {
		len = 5
	} else {
		len = 8
	};
	digith = msg.toString();
	if (len == 5) {
		if (digith.length >= 5) {
			currprice = msg / 10000 + "万";
		} else {
			currprice = msg + "元";
		}
	} else {
		if (digith.length >= 8) {
			currprice = msg / 10000 + "万";
		} else {
			currprice = msg + "元";
		}
	}
	return currprice;
}


function traverse(obj) {
	for (var a in obj) {
		console.log(a,"obj")
		if (typeof(obj[a]) == "object") {
			// traverse(obj[a]); //递归遍历
			// console.log(obj[a], "递归遍历")
			// return obj[a];
		} else {
			console.log(a + "=" + obj[a], "不显示"); //如果是值就显示
		}
	}
}



export {
	navigateTo,
	showToast,
	dateFormat,
	setStorage,
	compareTime,
	getNowDate,
	getStorageSync,
	moneysion,
	traverse,
}
