(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/signin/signin"],{"3c20":function(e,t,n){"use strict";(function(e){n("2277");o(n("66fd"));var t=o(n("de9c"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"4b0b":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var i=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"4f82":function(e,t,n){"use strict";n.r(t);var o=n("b8f1"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},"502f":function(e,t,n){},b8f1:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{visible:!1,getApp:"",geturl:"",deid:""}},onLoad:function(){},onShow:function(){var e=getCurrentPages();console.log(e,"routes");var t=e[e.length-2].route;this.geturl=t,this.deid=e[e.length-2].options.deid},methods:{getPhoneNumber:function(t){var n=this;"getPhoneNumber:ok"==t.detail.errMsg&&e.login({provider:"weixin",onlyAuthorize:!0,success:function(o){n.$http.request({url:"login",method:"POST",header:{"Content-Type":"applicktion/json"},data:{code:o.code,encryptedData:t.detail.encryptedData,iv:t.detail.iv}}).then((function(t){200==t.data.code?(n.$common.showToast(t.data.info),n.$common.setStorage("token",t.data.data.token),console.log(n.geturl,"that.geturl"),"pages/index/details"==n.geturl?(console.log("走了一"),e.reLaunch({url:"/pages/index/details?deid="+n.deid})):(console.log("走了二"),e.switchTab({url:"/pages/index/index"}))):n.$common.showToast(t.data.info)}))}}),"getPhoneNumber:fail user deny"==t.detail.errMsg&&this.$common.showToast("您拒绝了请求，无法正常使用小程序"),console.log(t,"this.e")},getUserProfile:function(){var t=this;e.getUserProfile({desc:"登录",success:function(n){console.log(n,"getuserinfo9999"),e.login({provider:"weixin",success:function(e){var o={code:e.code,userInfo:n.userInfo};t.$http.request({url:"authorization",method:"POST",header:{"Content-Type":"applicktion/json"},data:o}).then((function(e){t.visible=!0}))}})},fail:function(e){t.$common.showToast("您拒绝了请求,不能正常使用小程序")}})}}};t.default=n}).call(this,n("543d")["default"])},ce27:function(e,t,n){"use strict";var o=n("502f"),i=n.n(o);i.a},de9c:function(e,t,n){"use strict";n.r(t);var o=n("4b0b"),i=n("4f82");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("ce27");var a,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=c.exports}},[["3c20","common/runtime","common/vendor"]]]);