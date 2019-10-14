<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
		<div class="mohu">
			<image mode='aspectFit'  :src="shou"   alt="" srcset=""></image>
		</div>
		<div class="tanc">
		</div>
		<view class="jjo" :style="{height:jkm}"></view>
		<view class="wb">
		
		
			<rot @addInfo="getAddInfo" :biaourl='biaourl' :ko='ko' :jjowid='jjowid' :jjohei='jjohei' />
		
			<image  class="tou" :src="shou"  alt="" srcset=""></image>
			<view class="tz_box">
				<image   class="tz " :src="tz" mode="widthFix" alt="" srcset=""></image>
			</view>
			<view class="dicao">
				<image   class="cap " :src="cap" mode="widthFix" alt="" srcset=""></image>
				<view @tap='sc' class="sc1"></view>
				<view @tap='ti("/pages/dna_test/sd")' class="zaipai"></view>
			</view>
			<canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
			
			<view class='bs'></view>

			<view class='qr_save'></view>
			<dix :imgurl='xiba' />
		</view>
     
	</view>
</template>

<script>
	import  config from '../../config'
    import dix from "../../components/dix.vue";
	import {lujing,modal,lujing_bg,tobase64} from '@/util/common.js'
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				cap:config.jingtai_url+'mm.png',
				tz:config.jingtai_url+'jk.png',
                biaourl:'',
                // biaourl:'/static/1.png',

                ko:config.jingtai_url+'ko.png',
				jkm:'',
				jkt:'',
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

				qr_save_hei:'',
				qr_save_top:''
			};
		},
		onLoad(){
			this.shou=this.$store.state.index.sd_url
			// this.shou=config.jingtai_url+'bnbn.png',
			this.bg=tobase64(this.$store.state.index.sd_url)

			this.biaourl=this.$store.state.index.xuanz_n
			// this.biaourl=config.jingtai_url+'watch1.gif'
			console.log( this.$store.state.index.img_huan,' state.img_huan')
		
			// this.bg=config.jingtai_url+'jj.png'
			let _this=this

		
			const query = wx.createSelectorQuery()
			query.select('.jjo').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function (res) {
				res[0].top       // #the-id节点的上边界坐标
				res[1].scrollTop // 显示区域的竖直滚动位置
                _this.jjowid=res[0].width
				
				
 			
			})
			const query2 = wx.createSelectorQuery()
			query2.select('.tou').boundingClientRect()
			query2.selectViewport().scrollOffset()
			query2.exec(function (res) {
				res[0].top       // #the-id节点的上边界坐标
				res[1].scrollTop // 显示区域的竖直滚动位置
				_this.dituwid=res[0].width
				_this.dituhei=res[0].height
				_this.jjohei=res[0].top 
 				// _this.$store.commit('canwid_storage',res[0].width);
 				// _this.$store.commit('canhei_storage',res[0].height);
				
			})
			// const query_x = wx.createSelectorQuery()
			// query_x.select('.wb').boundingClientRect()
			// query_x.selectViewport().scrollOffset()
			// query_x.exec(function (res) {
			// 	let hei=(wx.getSystemInfoSync().windowHeight-res[0].height)/2
			// 	console.log(hei,_this.jkt,'_this.jkt')
			// 	_this.jkm=_this.jkt+'px'
			
			// })
			// // console.log(wx.getSystemInfoSync().windowHeight,'ppp')
			// // debugger
		

			const query3 = wx.createSelectorQuery()
			query3.select('.qr_save').boundingClientRect()
			query3.selectViewport().scrollOffset()
			query3.exec(function (res) {
				res[0].top       // #the-id节点的上边界坐标
				res[1].scrollTop // 显示区域的竖直滚动位置
				_this.qr_save_hei=res[0].height
				_this.qr_save_top=res[0].width
 				// _this.$store.commit('canwid_storage',res[0].width);
 				// _this.$store.commit('canhei_storage',res[0].height);
				
			})
			 
		},
		methods: {
			ti(url){
				uni.navigateTo({
					url
				})
			},
			getAddInfo(e){
               
                this.biao_info=e.detail
            },
          
            sc(){
                wx.showLoading({
                    title: '生成中',
                    mask: true
                })
                let _this=this
                let mao=_this.biao_info[0]   
                _this.painting= {
                    width: _this.dituwid,
                    height:  _this.dituhei,
                    clear: true,
                    views: [
                        {
                            type: 'image',
                            url: _this.shou,
                            top: 0,
                            left: 0,
                            width: _this.dituwid,
                            height:  _this.dituhei,
                        },
                        {
                            type: 'image',
                            url: mao.image,
                            top: mao.top,
                            left: mao.left,
                            width:mao.width,
                            height: mao.height,
                            angle:mao.angle, //选择角度
                            scale:mao.scale,
                            x:mao.x, 
                            y:mao.y,
                            num:1,
                            prop:1,
							jiaowid:_this.$store.state.index.jiaowid,
                            jiaohei:_this.$store.state.index.jiaohei
                        },
                        {
                            type: 'image',
                            url: _this.$store.state.index.img_huan.qr_save,
                            top: _this.qr_save_top,
                            left: 0,
                            width: _this.dituwid,
                            height:  _this.qr_save_hei,
                        }
                    ]

                }
                console.log(_this.painting.views[1],'生成的')
                
               
            },
            eventGetImage (event) {
                console.log(event)
                wx.hideLoading()
                const { tempFilePath, errMsg } = event.detail
                console.log(tempFilePath)
                this.dixia=tempFilePath
				this.$store.commit('sheng_storage',tempFilePath);
				uni.navigateTo({
					url:'/pages/dna_test/sd3'
				})
            },
			xiangji(){
				var _this=this
                wx.getSetting({
                    success(res) {  
                    if(res.authSetting['scope.camera']){   //如果之前已经授权过就直接跳去camera组件所在页面
						uni.navigateTo({
							url:'/pages/dna_test/sd'
						})
                    }else{
                        wx.authorize({    //之前没有授权过就弹出授权弹窗
                            scope: 'scope.camera',
                            success() {
                                uni.navigateTo({
									url:'/pages/dna_test/sd'
								})
                            },
                            fail(){

                                _this.sh=true
                            }
                        })
                        
                    }
                    
                    }
                })
			},
			opensetting(res){    //wx.authorize()授权被拒绝后的二次授权设置
                var _this=this
                
                if(res.mp.detail.authSetting['scope.camera']){
                
                    uni.navigateTo({
						url:'/pages/dna_test/sd'
					})
                
                    _this.sh=false
                    
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
			xuanze(){
				uni.navigateTo({
					url:'/pages/dna_test/che_zy'
				})
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			shengc(){

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
		width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: cover;
		// padding-top: 242upx;
       
		position: relative;
        @extend .reset;
    }
	.wb{
        @extend .reset;
        width:100%;
		height: 1206upx;
        position: absolute;
        top:50%;
		margin-top: -603upx;
    }
    .mohu{
        width:100%;
        min-height: 100vh;
        height: 1206upx;
      
        position: absolute;
        left: 0;
        top:0;
		// z-index:10;
        // filter:blur(30upx);
		image{
			// width: 100%;
			// height: 100%;
			filter:blur(4px);
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
        // height: 123rpx;
		background: red;
		position: absolute;
		left:0;
		top:0;
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
		width: 100%;
		background: black;
		position: absolute;
		bottom: 0;
		top:851upx;
		@extend .reset;
		padding-top: 104upx;
	}
	.cap{
		width:100%;
	}
	.sc1{
		position: absolute;
		width: 145upx;
		height: 34upx;
		
		top:102upx;
		right: 81upx;
	}
	.zaipai{
		position: absolute;
		width: 145upx;
		height: 34upx;
		
		top:102upx;
	
		left: 81upx;
	}

	.tanc{
		width:100%;
        min-height: 100vh;
        background: rgba(0,0,0,0.6);
        position: absolute;
        left: 0;
        top:0;
	}
	.bs{
		height:1084upx;
	}
	.qr_save{
		position: absolute;
		height: 245upx;

		width:484upx;
		top: 0;

	}
</style>
