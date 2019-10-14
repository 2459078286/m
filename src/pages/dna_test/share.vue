<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
		<div class="mohu" v-show='nima'>
			<image   :src="cc1" mode="widthFix" alt="" srcset=""></image>
		</div>
		<view class="tanc" v-show='nima'>
			<view class="bbb">
				<image  @tap='guans'  class="guan " :src="guan" mode="widthFix" alt="" srcset=""></image>
				<image class="yun " :src="yun" mode="widthFix" alt="" srcset=""></image>
				<view class="cao_box">
					<image   class="ccaoc " :src="ccaoc" mode="widthFix" alt="" srcset=""></image>
					<!-- <view class="baocun"></view> -->
					<button @tap="bao" v-show="sh_bao==false" class="baocun">保存图片</button>

					<button open-type="openSetting" @opensetting="opensetting" v-show="sh_bao==true" class="baocun">保存图片</button>
					<!-- <view class="fenxiang"></view> -->
					<button class="fenxiang" type="primary" open-type="share">分享</button>
				</view>
			</view>
		
			
		</view>
		<view class="ccc">
			<image   class="cc1 " :src="cc1" mode="widthFix" alt="" srcset=""></image>
			<image   class="csign " :src="csign" mode="widthFix" alt="" srcset=""></image>

			
			<view class="dicao" v-show='!nima'>
				<image    class="cap " :src="cap" mode="widthFix" alt="" srcset=""></image>
				<view @tap='sc' class="zaipai"></view>
				<view  class="sc1" @tap='ti("/pages/dna_test/xuanb")'></view>
				<view  class="sc2" @tap='zhiwen()'></view>
			</view>
		</view>
	
		<canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
		<view class="jiu"></view>
        <view class="jjo"></view>
        <view class="qr"></view>
        <view class="csign_ri"></view>
        <view class="qr_ri"></view>
		<w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
		<dix :imgurl='xiba' />
	</view>
</template>

<script>
	import  config from '../../config'
    import dix from "../../components/dix.vue";
	import {lujing,modal,lujing_bg,tobase64,login,jsontostring2} from '@/util/common.js'
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				sh_bao:false,
				yun:'',
				nima:false,
				ccaoc:config.jingtai_url+'lplp_03.png',
				guan:config.jingtai_url+'guan.png',
				csign:'',
				cc1:'',
				yuan1:'',
				juhua:this.$store.state.index.img_huan.ggm,
				cap:config.jingtai_url+'jiecao.png',
				tz:config.jingtai_url+'jk.png',
                biaourl:'',
                // biaourl:'/static/1.png',

                ko:config.jingtai_url+'ko.png',

                // ko:config.jingtai_url+'o.png',
                sh:false,
                shou:'',
				dotStyle: false,
				bg:'', 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'xb.png',
				xz:config.jingtai_url+'que.jpg',
                zuoy:config.jingtai_url+'zuoy_p.png',
                biao_info:'',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'x1.png',
					class:'zhong'
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'x2.png',
					class:'wei'
				}, {
					id: 2,
					type: 'image',
					url:config.jingtai_url+'x3.png',
					class:'wei'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'x4.png',
					class:'wei'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'x5.png',
					class:'wei'
                }],
                jjowid:'',
				jjohei:'',
				painting:{},
				dituwid:'',
				dituhei:'',
				qrinfo:{
					width:'',
					height:'',
					left:'',
					top:'',
				},
				csigninfo:{
					width:'',
					height:'',
					left:'',
					top:'',
				}
			};
		},
		onShareAppMessage() {
			return {
				title: '泰格豪雅',
				path: '/pages/mon_index/index',
				imageUrl:this.yun
			}
		},
		onLoad(){
			let meiuf=this.$store.state.index
		
			let str=jsontostring2(meiuf.test_go)
	
			this.cc1=config.jingtai_url+'dom2.png'
			this.bg=lujing_bg('dp_bg2.jpg')
            this.yuan1=meiuf.img_huan.dp2
            if(meiuf.test_go.tuan_test==2 && meiuf.test_go.music_test==1 && meiuf.test_go.she_test==1){
				this.cc1=config.jingtai_url+'dom2.png'
				this.bg=lujing_bg('dp_bg2.jpg')
				this.yuan1=meiuf.img_huan.dp2
            }
            if(meiuf.test_go.tuan_test==3 && meiuf.test_go.music_test==1){
				this.cc1=config.jingtai_url+'dom3.png'
				this.bg=lujing_bg('dp_bg3.jpg')
                this.yuan1=meiuf.img_huan.dp3
            }
            if(meiuf.test_go.tuan_test==4 ){
				this.cc1=config.jingtai_url+'dom4.png'
				this.bg=lujing_bg('dp_bg4.jpg')
                this.yuan1=meiuf.img_huan.dp4
			}
			if(str=='1,1,1,1'){
				
				this.cc1=config.jingtai_url+'dom'+meiuf.rand+'.png'
				let name='dp_bg'+meiuf.rand+'.jpg'
				this.bg=lujing_bg(name)
				let arr=[
					meiuf.img_huan.dp1,
					meiuf.img_huan.dp2,
					meiuf.img_huan.dp3,
					meiuf.img_huan.dp4,
					meiuf.img_huan.dp5
				]
                this.yuan1=arr[meiuf.rand-1]
			}
			// this.shou=this.$store.state.index.sd_url
			// // this.shou=config.jingtai_url+'jj.png',
			// this.bg=tobase64(this.$store.state.index.sd_url)

			// this.biaourl=this.$store.state.index.xuanz_n
			// // this.bg=config.jingtai_url+'jj.png'


			// this.csign=this.$store.state.index.sign_url
			// this.csign=config.jingtai_url+'ww.png'
			
			this.csign=this.$store.state.index.sign_url
			
			console.log(this.$store.state.index.img_huan,'缓存情况')
		},
		methods: {
			async zhiwen(){
              
           
                if(this.$store.state.index.haslogin || this.$store.state.index.shouquan_phone!=''){
                   uni.showLoading({
                    
                        mask:true
                    });
                    let _this=this
                    let t=setInterval(function(){
                        if(_this.$store.state.index.tuan_jieshu){
                            clearInterval(t) 
                            uni.hideLoading()
                        
                            uni.reLaunch({
                                url:'/pages/dna_test/tuan_zy'
                            })
                        }
                    },250)

                }else{
                    uni.reLaunch({
                        url:'/pages/dna_test/index'
                    })
                }
            },
			getjjo(){
				let _this=this
				return new Promise((resolve, reject) => {
					const query = wx.createSelectorQuery()
					query.select('.jjo').boundingClientRect()
					query.selectViewport().scrollOffset()
					query.exec(function (res) {
						res[0].top       // #the-id节点的上边界坐标
						res[1].scrollTop // 显示区域的竖直滚动位置
						_this.jjowid=res[0].width
						_this.jjohei=res[0].height
						resolve(1)
					})
				})
			},	
			getcc1(){
				let _this=this
				return new Promise((resolve, reject) => {
					//底图
					const query2 = wx.createSelectorQuery()
					query2.select('.cc1').boundingClientRect()
					query2.selectViewport().scrollOffset()
					query2.exec(function (res) {
						res[0].top       // #the-id节点的上边界坐标
						res[1].scrollTop // 显示区域的竖直滚动位置
						_this.dituwid=res[0].width
						_this.dituhei=res[0].width*1.29
						
						resolve(2)
						
					})
				})

			},	
			getcsign(){
				let _this=this
				return new Promise((resolve, reject) => {
					// 签名
					const query3 = wx.createSelectorQuery()
					query3.select('.csign').boundingClientRect()
					query3.selectViewport().scrollOffset()
					query3.exec(function (res) {
						res[0].top       // #the-id节点的上边界坐标
						res[1].scrollTop // 显示区域的竖直滚动位置
						// _this.dituwid=res[0].width
						// _this.dituhei=res[0].width*1.29
						console.log(res,'要right')
						_this.csigninfo.width=res[0].width
						_this.csigninfo.height=res[0].height
						resolve(3)
						
					})
				})

			},	
			getqr(){
				let _this=this
				return new Promise((resolve, reject) => {
					// 菊花图
					const query4 = wx.createSelectorQuery()
					query4.select('.qr').boundingClientRect()
					query4.selectViewport().scrollOffset()
					query4.exec(function (res) {
						res[0].top       // #the-id节点的上边界坐标
						res[1].scrollTop // 显示区域的竖直滚动位置
						// _this.dituwid=res[0].width
						// _this.dituhei=res[0].width*1.29
						_this.qrinfo.width=res[0].width
						_this.qrinfo.height=res[0].height
						resolve(4)
						
					})

				})

			},		

			getcsign_ri(){
				let _this=this
				return new Promise((resolve, reject) => {
						
					// csgin的top，left，right
					const query5 = wx.createSelectorQuery()
					query5.select('.csign_ri').boundingClientRect()
					query5.selectViewport().scrollOffset()
					query5.exec(function (res) {
						res[0].top       // #the-id节点的上边界坐标
						res[1].scrollTop // 显示区域的竖直滚动位置
						// _this.dituwid=res[0].width
						// _this.dituhei=res[0].width*1.29
						_this.csigninfo.top=res[0].height
						
						_this.csigninfo.left=res[0].width
					
						resolve(5)
						
					})
				})

			},		

			getqr_ri(){
				let _this=this
				return new Promise((resolve, reject) => {
					// qr的top，left，right
					const query6 = wx.createSelectorQuery()
					query6.select('.qr_ri').boundingClientRect()
					query6.selectViewport().scrollOffset()
					query6.exec(function (res) {
						res[0].top       // #the-id节点的上边界坐标
						res[1].scrollTop // 显示区域的竖直滚动位置
						// _this.dituwid=res[0].width
						// _this.dituhei=res[0].width*1.29
						_this.qrinfo.top=res[0].height
						
						_this.qrinfo.left=res[0].width
					
						resolve(6)
						
					})
				})

			},			


				
			
			ti(url){
				uni.reLaunch({
					url
				})
			},
			 getAddInfo(e){
                // console.log(e.detail,'获取到')//{title:'测试',money:8,category:'吃饭'} 
                this.biao_info=e.detail
            },
          
            async sc(){
              
                wx.showLoading({
                    title: '生成中',
                    mask: true
				})
				await this.getjjo()
				await this.getcc1()
				await this.getcsign()
				await this.getqr()
				await this.getcsign_ri()
				await this.getqr_ri()

                let _this=this
                _this.painting= {
                    width: _this.dituwid,
                    height:  _this.dituhei,
                    clear: true,
                    views: [
                        {
                            type: 'image',
                            url: _this.yuan1,
                            top: 0,
                            left: 0,
                            width: _this.dituwid,
                            height:  _this.dituhei,
						},
						{
                            type: 'image',
                            url: _this.juhua,
                            top: _this.qrinfo.top,
                            left: _this.qrinfo.left,
                            width: _this.qrinfo.width,
                            height:  _this.qrinfo.height,
                        },
						{
                            type: 'image',
                            url: _this.csign,
                            top: _this.csigninfo.top,
                            left: _this.csigninfo.left,
                            width: _this.csigninfo.width,
                            height:  _this.csigninfo.height,
                        }
                    ]

				}
				console.log(_this.painting,'拍死你')
            },
            eventGetImage (event) {
                console.log(event)
                wx.hideLoading()
                const { tempFilePath, errMsg } = event.detail
              
                this.yun=tempFilePath
			
				this.nima=true
                if (errMsg === 'canvasdrawer:ok') {
                    // this.setData({
                    //     shareImage: tempFilePath
                    // })
                    // this.shareImage=tempFilePath
                }
            },
		
			bao(){
                var _this=this
                wx.getSetting({
                    success(res) {  
                    if(res.authSetting['scope.writePhotosAlbum']){   //如果之前已经授权过就直接调用
                        wx.saveImageToPhotosAlbum({
                            filePath: _this.yun,
                            success (res) {
                                console.log(res,'保存地址')
									wx.showToast({
									title: '保存图片成功',
									icon: 'success',
									duration: 2000
                                })
							},
							fail(res){
								console.log(res)
							}
                        })
                    }else{
                        wx.authorize({    //之前没有授权过就弹出授权弹窗
                            scope: 'scope.writePhotosAlbum',
                            success() {
                                wx.saveImageToPhotosAlbum({
                                    filePath:_this.yun,
                                    success (res) {
                                        console.log(res,'保存地址')
                                        wx.showToast({
                                        title: '保存图片成功',
                                        icon: 'success',
                                        duration: 2000
                                        })
                                    }
                                })
                            },
                            fail(){

                                _this.sh_bao=true
                            }
                        })
                        
                    }
                    
                    }
                })
            },
            opensetting(res){    //wx.authorize()授权被拒绝后的二次授权设置
                var _this=this
                
                if(res.mp.detail.authSetting['scope.writePhotosAlbum']){
                
                    wx.saveImageToPhotosAlbum({
                        filePath: _this.yun,
                        success (res) {
                            console.log(res,'保存地址')
                            wx.showToast({
                            title: '保存图片成功',
                            icon: 'success',
                            duration: 2000
                            })
                        }
                    })
                
                    _this.sh_bao=false
                    
                }
            },
			cha(e){
				console.log(e)
				this.swiperList.forEach((item,i)=>{
					if(e.detail.current==i){
						item.class='zhong'
					}else{
						item.class='wei'
					}
				})
			},
		
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			shengc(){

			},
			guans(){
				this.nima=false
				uni.reLaunch({
					url:'/pages/dna_test/share'
				})
			}
			// DotStyle(e) {
			// 	this.dotStyle = e.detail.value
			// },
			// // cardSwiper
			// cardSwiper(e) {
			// 	this.cardCur = e.detail.current
			// },
			// // towerSwiper
			// // 初始化towerSwiper
			// TowerSwiper(name) {
			// 	let list = this[name];
			// 	for (let i = 0; i < list.length; i++) {
			// 		list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
			// 		list[i].mLeft = i - parseInt(list.length / 2)
			// 	}
			// 	this.swiperList = list

			
			// },

			// // towerSwiper触摸开始
			// TowerStart(e) {
			// 	this.towerStart = e.touches[0].pageX
			// },

			// // towerSwiper计算方向
			// TowerMove(e) {
			// 	this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			// },

			// // towerSwiper计算滚动
			// TowerEnd(e) {
			// 	let direction = this.direction;
			// 	let list = this.swiperList;
			// 	if (direction == 'right') {
			// 		let mLeft = list[0].mLeft;
			// 		let zIndex = list[0].zIndex;
			// 		for (let i = 1; i < this.swiperList.length; i++) {
			// 			this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
			// 			this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
			// 		}
			// 		this.swiperList[list.length - 1].mLeft = mLeft;
			// 		this.swiperList[list.length - 1].zIndex = zIndex;
			// 	} else {
			// 		let mLeft = list[list.length - 1].mLeft;
			// 		let zIndex = list[list.length - 1].zIndex;
			// 		for (let i = this.swiperList.length - 1; i > 0; i--) {
			// 			this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
			// 			this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
			// 		}
			// 		this.swiperList[0].mLeft = mLeft;
			// 		this.swiperList[0].zIndex = zIndex;
			// 	}
			// 	this.direction = ""
			// 	this.swiperList = this.swiperList

			// 	console.log(this.swiperList)
			// },
		}
	}
</script>

<style lang='scss'>
	 @import "../../app.scss"; 
	@import "../../static/main.css"; 
	.wai{
		@extend .reset;
		width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
		// padding-top: 242upx;
       
		position: relative;
        
    }
    .mohu{
        width:100%;
        min-height: 100vh;
        height: 1206upx;
      
        position: absolute;
        left: 0;
        top:0;
        // filter:blur(70upx);
		z-index:10;
		image{
			width: 100%;
			
			filter:blur(4px);
		 	position: absolute;
			top: 50%;
			margin-top: -587upx;
		}
    }
	.zhong{
		width:521upx;
		@extend .reset;
	}
	.wei{
		width:auto!important;
		height:404upx;
	}
	swiper{
		margin:0 auto;
		width:100%;
		height:523upx;
	}
	.yind{
		position: absolute;
		top:95upx;
		left:111upx;
		width:402upx;
	}
	// 523
	.zuoy{
		position: absolute;
		width: 363upx;
		left: 50%;
		margin-left: -181.5upx;
		top:832upx;
	}
	.xz{
		position: absolute;
		width: 356upx;
		left: 50%;
		margin-left: -178upx;
		top:911upx;
	}
	.hq{
		position: absolute;
		width: 356upx;
		left: 50%;
		margin-left: -178upx;
		top:911upx;
		opacity: 0;
	}
	// swiper{
	// 	width: 100%;
	// 	height: 716upx;
    // }
    .tou{
        position: absolute;
        width: 602rpx;
        height: 729rpx;
        top: 123rpx;
        left: 50%;
        @extend .reset;
        margin-left: -301rpx;
   
    }
    .jjo{
        width: 74rpx;
        height: 123rpx;
		// display: none;
    }
	.tz_box{
		position: absolute;
		width: 602rpx;
		height: 76rpx;
		top:778rpx;
		margin-left: -301rpx;
		left: 50%;
		background:rgba(0,0,0,0.6);
		display: flex;
		justify-content: center;
		z-index:100

	}
	.tz{
		width: 238upx;
		align-self: center;
	}
	.dicao{
		@extend .reset;
		width: 100%;
		background: black;
		position: absolute;
		bottom: 0;
		// top:954upx;
		
	
	}
	.cap{
		width:100%;
	}
	.sc1{
		position: absolute;
		width: 145upx;
		height: 34upx;
		// border: 2px solid red;
		top:0upx;
		right: 81upx;
	}
	.sc2{
		position: absolute;
		width: 145upx;
		height: 34upx;
		// border: 2px solid red;
		top:0upx;
		right: 302rpx;

	}
	.zaipai{
		position: absolute;
		width: 145upx;
		height: 34upx;
		// border: 2px solid red;
		top:0upx;
		left: 81upx;
	}
	.ccc{
		position: absolute;
		width: 100%;
		height:982upx;
		top: 50%;
		margin-top: -587upx;
	}
	
	.cc1{
		@extend .reset;
		width: 100%;
	}
	.csign{
		position: absolute;
		width: 140upx;
		height: 140upx;
		top:759upx;
		right:87upx
	}
	.qr{
		width:293upx;
		height: 140upx;
		top:759upx;
		left:87upx;
		opacity: 0;
		position: absolute;
		z-index: -2;
		left:0;
		top:0;
		// display: none;
	}
	.csign_ri{
		width:479upx;
		height:759upx;
		position: absolute;
		z-index: -2;
		left:0;
		top:0;
		// display: none;
	}
	.qr_ri{
		width:87upx;
		height:759upx;
		position: absolute;
		z-index: -2;
		left:0;
		top:0;
		// display: none;
	}
	.tanc{
		@extend .reset;
		position: absolute;
		left:0;
		top:0;
		z-index: 20;
		background: rgba(0,0,0,0.6);
	
		// padding-top: 63upx;
		width:100%;
		min-height: 100vh;
	
	}
	.bbb{
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		height: 930rpx;
		margin-top: -481rpx;

	}

	.guan{
		margin-left:600upx;
		width: 45upx;
		@extend .reset;
	}

	.yun{
		@extend .reset;
		margin:0 auto;
		margin-top: 29upx;
		width: 538upx;
	}
	.cao_box{
		padding-top: 58upx;
		position: relative;
	}
	.ccaoc{
		@extend .reset;
		margin:0 auto;
		width: 538rpx;

	}
	.jiu{
		height: 92upx;;
	}

	.baocun{
		position: absolute;
		width:167upx;
		height: 27upx;
		opacity: 0;
	
		top:58upx;
		left:80upx
	}

	.fenxiang{
		position: absolute;
		width:167upx;
		height: 27upx;
		opacity: 0;
		
		top:58upx;
		right:80upx
	}
</style>

