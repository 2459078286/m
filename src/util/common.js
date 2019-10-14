/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 15:22:28
 * @LastEditTime: 2019-08-22 15:49:52
 * @LastEditors: Please set LastEditors
 */
import md5 from '@/util/md5.js'
import Vue from '../main.js'
import config from '../config'

export function tiao(urls) {
    uni.navigateTo({
        url: urls
    });
}

//登录
export function login(_this) {
    return new Promise((resolve, reject) => {
        try {
           
            //过期了，需要重新登录 getProvider是检验登录的是哪个平台，这个不用管他
            uni.getProvider({
                service: 'oauth',
                success: function(res) {
                    
                    
                    if (~res.provider.indexOf('weixin')) {
                        uni.login({
                            provider: 'weixin',
                            success: async function(loginRes) {

                                // 向后端发送loginRes里的临时code码，后端拿着appid，appsecret，code请求auth.code2Session获取到openid和session_key，然后自定义登录态（登录态就是用openid和session_key加密的字符串，是之后请求api接口要发送的，api接口会校验），把自定义登录态返回给前端
                                let data = await _this.$WXR.post('/consumer/getOpenid', {
                                    // appid: 'wxc93f1cb97a901c13',
                                    // secret:'34c019c6957be966e8121afb44c05e34',
                                    code: loginRes.code,
                                    // grant_type:'authorization_code',
                                })

                                console.log(data,3333333)

                                _this.$store.commit('session_storage', data.data.sessionKey);

                                _this.$store.commit('openid_storage', data.data.openId);



                                if (data.data.haslogin) {
                                    _this.$store.commit('userinfo_storage', data.data)
                                }
                       
                                _this.$store.commit('yanzhneg_storage', data.data.phone)

                                let loca
                                if(data.data.location==null){
                                    loca=''
                                }else{
                                    loca=data.data.location
                                }
                                _this.$store.commit('jinbawang_location_storage',loca);

                            
                                _this.$store.commit('haslogin_storage',data.data.haslogin)
                                resolve(data.data.haslogin);

                            }
                        });
                    }else if(~res.provider.indexOf('alipay')){
                        uni.login({
                            provider: 'alipay',
                            success: async function(loginRes) {
                                
                                // 向后端发送loginRes里的临时code码，后端拿着appid，appsecret，code请求auth.code2Session获取到openid和session_key，然后自定义登录态（登录态就是用openid和session_key加密的字符串，是之后请求api接口要发送的，api接口会校验），把自定义登录态返回给前端
                                // let data = await _this.$WXR.post('/consumer/getOpenid', {
                                //     // appid: 'wxc93f1cb97a901c13',
                                //     // secret:'34c019c6957be966e8121afb44c05e34',
                                //     code: loginRes.code,
                                //     // grant_type:'authorization_code',
                                // })



                                // _this.$store.commit('session_storage', data.data.sessionKey);

                                _this.$store.commit('openid_storage', 'oq9-f4ttEaIz2lVnwNQ1gz3dWPxs');



                                // if (data.data.haslogin) {
                                //     _this.$store.commit('userinfo_storage', data.data)
                                // }
                                
                                resolve(0);
                                
                            }
                        });
                    }
                }
            });

        } catch (err) {

            reject(err)
        }
    })
}
//登录校验
export function login_check(_this) {
    return new Promise((resolve, reject) => {
        //#ifdef MP-WEIXIN
        uni.checkSession({
            success: function(res) {
                if (!_this.$store.state.index.openid) {
                    uni.navigateTo({
                        url: '/pages/login/index'
                    });
                    reject('000')
                }
                resolve('已经登录过');
            },
            fail: function(res) {

                uni.navigateTo({
                    url: '/pages/login/index'
                });
                reject('000')
            }
        })
        //#endif
        
        //#ifdef MP-ALIPAY
        if (!_this.$store.state.index.session) {
            uni.navigateTo({
                url: '/pages/login/index'
            });
            reject('000')
        }else{
            resolve('已经登录过');
        }
        //#endif
    })
}


//json 按key升序
export function sort(obj) {
    return new Promise((resolve, reject) => {
        try {
            var endValue, item, key, keyArray, keyArray2, o, _i, _len;
            endValue = {};
            keyArray = [];
            keyArray2 = [];
            for (key in obj) {
                o = {};
                o[key] = obj[key];
                keyArray.push(key);
            }
            keyArray2 = keyArray.sort();
            for (_i = 0, _len = keyArray2.length; _i < _len; _i++) {
                item = keyArray2[_i];
                endValue[item] = obj[item];
            }
            resolve(endValue)
        } catch (err) {
            reject(err)
        }
    })
}

// json转字符串
export function jsontostring(jsonObj) {
    let arr = [];
    for (var key in jsonObj) {
        arr.push(key)
    }
    arr.sort();
    let str = '';
    for (var i in arr) {

        if (jsonObj[arr[i]] !== '') {
            str += arr[i] + "," + jsonObj[arr[i]] + ","
        }

    }
    return str.substr(0, str.length - 1)
}

//md5加密排序后的json生成签名
export function encryption(obj) {
    return new Promise((resolve, reject) => {
        try {
            let str = jsontostring(obj) + '21Cs39Z^D2!Y8&de*39DX204'
            
            let sign = md5.hex(str)

            resolve(sign)
        } catch (err) {
            reject(err)
        }
    })

}


// 弹窗modal
export function modal(content, type, code) {
    uni.showModal({
        title: '提示',
        content: content,
        showCancel:false,
        success: function(res) {
            if (res.confirm) {
                console.log('用户点击确定');
                if (type == 'shxx') {
                    uni.navigateTo({
                        url: '/pages/quaninfo/shiwu?code=' + code
                    })
                }
            } else if (res.cancel) {
                console.log('用户点击取消');
                if (type == 'shxx') {
                    uni.navigateTo({
                        url: '/pages/quaninfo/shiwu?code=' + code
                    })
                }
            }
        }
    });
}


// 错误跳转
export function cuowu(res) {
    return new Promise(async (resolve, reject) => {

        if (res.data.typeCode == 'no_act') {
            uni.navigateTo({
                url: '/pages/error/no_act'
            })
            reject('000')
        } else if (res.data.typeCode == 'jump_winurl') {
            if (typeof(res.data.data) == "string") {
               
                Vue.$store.commit('datastr_storage', res.data.data)
            }
            uni.navigateTo({
                url: '/pages/index/index?havawin=1&list=' + encodeURIComponent(JSON.stringify(res.data))
            })


            reject('000')
        } else if (res.data.typeCode == 'not_winurl') {
            uni.navigateTo({
                url: '/pages/index/not_winurl'
            })
            reject('000')
        } else if (res.data.typeCode == 'rescan') {
            uni.navigateTo({
                url: '/pages/error/index'
            })
            reject('000')
        } else if (res.data.typeCode == 'location') {
            uni.navigateTo({
                url: '/pages/error/getlocation?targetUrl=' + res.targetUrl
            })

            reject('000')
        } else if (res.data.typeCode == 'need_subcribe') {
            // uni.navigateTo({
            //     url:'/pages/follow/index'
            // })
            uni.navigateTo({
                url: '/pages/error/err2'
            })

            reject('000')
        } else if (res.data.typeCode == 'jump_coupon') {
            uni.navigateTo({
                url: '/pages/list/index'
            })

            reject('000')
        } else if (res.data.typeCode == 'reload') {
            // await Vue.$WXR.post
            uni.navigateTo({
                url: '/pages/login/index'
            })

            reject('000')
        } else if (res.data.typeCode == 'black_list') { //黑名单
            uni.navigateTo({
                url: '/pages/error/black_list'
            })

            reject('000')
        } else if (res.data.typeCode == 'over_times') { //次数超出
            uni.navigateTo({
                url: '/pages/error/black_list'
            })

            reject('000')
        } else if (res.data.typeCode == 'error') {
            uni.navigateTo({
                url: '/pages/error/err2'
            })

            reject('000')
        } else {
            resolve(1)
        }

    })

}


// 判断去哪个页面
export async function panduan(_this) {
    
    let drawlist = await _this.$WXR.post('/activity/luckdraw/getDrawPage', {

        // batchNum: 'TEST1234TEST201907058026',
        isSubcribe: 1,
        // rqcode: '1OIcDq4z6',
        // rqcode: Vue.$store.state.index.platform_s,
        params: Vue.$store.state.index.platform_s
    })



    uni.navigateTo({
        url: '/pages/index/index?list=' + encodeURIComponent(JSON.stringify(drawlist))
    });
}

// 生成支付签名随机串
export function make_nonceStr(len) {
    len = len || 32;　　
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
    var maxPos = $chars.length;　　
    var pwd = '';　　
    for (var i = 0; i < len; i++) {　　　　 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　 }　　
    return pwd;
}
// json转字符串
export function jsontostring2(jsonObj) {
    let arr = [];
    for (var key in jsonObj) {
        arr.push(key)
    }
    arr.sort();
    let str = '';
    for (var i in arr) {

        if (jsonObj[arr[i]] !== '') {
            str += jsonObj[arr[i]] + ","
        }

    }
    return str.substr(0, str.length - 1)
}
// paySign生成
export function make_paySign(data) {
    let str = jsontostring2(data)

    // 拼接上商户支付密钥
    str += '&key=' + config.key
   
        // md5加密
    let sign = md5.hex(str)

    return sign
}

// 红包
export async function redpack() {

    let timeStamp = (new Date()).getTime()
    let nonceStr = make_nonceStr()
    let package_s = 'sendid%3D242e8abd163d300019b2cae74ba8e8c06e3f0e51ab84d16b3c80decd22a5b672%26ver%3D8%26sign%3D4110d649a5aef52dd6b95654ddf91ca7d5411ac159ace4e1a766b7d3967a1c3dfe1d256811445a4abda2d9cfa4a9b377a829258bd00d90313c6c346f2349fe5d%26mchid%3D11475856%26appid%3Dwxd27ebc41b85ce36d'
    let paySign = make_paySign({ appId: config.appid, timeStamp: timeStamp, nonceStr: nonceStr, package: package_s })
    

    wx.sendBizRedPacket({
        timeStamp:'1514363815', // 支付签名时间戳，
        nonceStr:'Ww213sdad', // 支付签名随机串，不长于 32 位
        package: 'sendid%3D242e8abd163d300019b2cae74ba8e8c06e3f0e51ab84d16b3c80decd22a5b672%26ver%3D8%26sign%3D4110d649a5aef52dd6b95654ddf91ca7d5411ac159ace4e1a766b7d3967a1c3dfe1d256811445a4abda2d9cfa4a9b377a829258bd00d90313c6c346f2349fe5d%26mchid%3D11475856%26appid%3Dwxd27ebc41b85ce36d', //扩展字段，由商户传入
        signType: 'MD5', // 签名方式，
        paySign:'70f47031c8e8d4bb78e741f8d0ee45beef65cfcd', // 支付签名
        success: function(res) {
            console.log(res, '成功')
        },
        fail: function(res) {
            console.log(res, '失败11111111')
        }

    })
}





/**
 * @description: 获取url地址中指定的参数
 * @param name{string} 参数名称 
 * @param url{string} url 
 * @return: 参数值
 */
export function gup(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

/**
 * @description: JS获取URL中最后一个斜杠后面的内容
 * @param url{string} url 
 * @return: 最后一个斜杠后面的内容
 */
export function huohou(url){
    
    var index = url.lastIndexOf("\/");
    let str = url.substring(index + 1,url.length);
    return str;
}

export function tobase64(path){
    console.log(path,'path')
    // wx.downloadFile({
    //     url: path,
    //     success(res) {
    //         console.log(res)
    //         wx.getFileSystemManager().readFile({
    //             filePath: res.tempFilePath, //选择图片返回的相对路径
    //             encoding: 'base64', //编码格式
    //             success: res => { //成功的回调
    //                 // resolve('data:image/png;base64,' + res.data)
    //                 let base64 =res.data
                
    //                 return "url(data:image/png;base64," + base64+")"
    //             }
    //         })
           
    //     }
    // })
    let base64 = wx.getFileSystemManager().readFileSync(path, 'base64');
    return "url(data:image/png;base64," + base64+")"
}

// export function liedui(){
    
//     // 尺寸大的放在前面，先下
//     const ziyuan=[
//         {
//             name:'watch1',
//             url:config.jingtai_url+'watch1.gif'
//         },
//         {
//             name:'watch2',
//             url:config.jingtai_url+'watch2.gif'
//         },
//         {
//             name:'watch3',
//             url:config.jingtai_url+'watch3.gif'
//         },
//         {
//             name:'watch4',
//             url:config.jingtai_url+'watch4.gif'
//         },
//         {
//             name:'watch5',
//             url:config.jingtai_url+'watch5.gif'
//         },

//         {
//             name:'dp4', //菊花背景图
//             url:config.jingtai_url+'dp4.jpg'
//         },

//         {
//             name:'ggm',  //二维码
//             url:  config.jingtai_url+'ggm.jpg', 
//         },
//     ]
//     ziyuan.forEach(async (item,i)=>{
//         ziyuan[i]=await xiazia(item)
//     })
//     Vue.$store.commit('ziyuan_storage',ziyuan);
//     console.log(ziyuan,'oooo')
// }

export function xiazai(url){

    return new Promise((resolve, reject) => {
        uni.downloadFile({
            url,
            success(res){
                // console.log(res)
                if (res.statusCode === 200) {
                   
                    resolve(res.tempFilePath)

                }
            }
        })
    })
}

export function lujing(img){
    return config.jingtai_url+img
}

export function lujing_bg(img){
    return "url(" +config.jingtai_url+img+")"
}



export function getDays(day1, day2) {
	// 获取入参字符串形式日期的Date型日期
	var d1 = day1.getDate();
	var d2 = day2.getDate();
 
	// 定义一天的毫秒数
	var dayMilliSeconds  = 1000*60*60*24;
	
	// 获取输入日期的毫秒数
	var d1Ms = d1.getTime();
	var d2Ms = d2.getTime();
	
	// 定义返回值
	var ret;
	
	// 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
	// 每次循环结束，给d1Ms 增加一天
	for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
	
		// 如果ret为空，则无需添加","作为分隔符
		if (!ret) {
			// 将给的毫秒数转换为Date日期
			var day = new Date(d1Ms);
			
			// 获取其年月日形式的字符串
			ret = day.getYMD();
		} else {
		
		// 否则，给ret的每个字符日期间添加","作为分隔符
			var day = new Date(d1Ms);
			ret = ret + ',' + day.getYMD();
		}
    }
    
    ret=ret.split(",")
    ret.forEach((item,i)=>{
        ret[i]=ret[i].slice(5)
        ret[i]= ret[i].replace('-','月');
        ret[i]+='日'
    })
	return ret; // 或可换为return ret;
}
 
// 给Date对象添加getYMD方法，获取字符串形式的年月日
Date.prototype.getYMD = function(){
    var retDate = this.getFullYear() + "-";  // 获取年份。
    retDate += this.getMonth() + 1 + "-";    // 获取月份。          
    retDate += this.getDate();               // 获取日。
    return retDate;                          // 返回日期。
}
 
// 给String对象添加getDate方法，使字符串形式的日期返回为Date型的日期
String.prototype.getDate = function(){
	var strArr = this.split('-');
	var date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
	return date;
}
