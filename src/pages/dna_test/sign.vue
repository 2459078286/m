<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
		<view class="wb">
			<view class="kuang_box">
				<image  class="kuang" :src="kuang" mode="widthFix" alt="" srcset=""></image>
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
				@touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>
			</view>
			<image  class="yind" :src="yind" mode="widthFix" alt="" srcset=""></image>
		
			<image @tap='xuanze' class="xz"  :src="xz" mode="widthFix" alt="" srcset=""></image>
			<view class="xiaosi"></view>
			
		</view>
		<w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
		<dix :imgurl='xiba' />
	</view>
</template>

<script>
	import  config from '../../config'
    import dix from "../../components/dix.vue";
	import {lujing,modal,lujing_bg} from '@/util/common.js'

	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	//获取系统信息
	uni.getSystemInfo({
		success: function(res) {
			canvasw = res.windowWidth;
			canvash = canvasw * 9 / 16;
		},
	})
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				bg:lujing_bg('sign_bg.jpg'), 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'yind_q2.png',
				xz:config.jingtai_url+'xz.png',
				zuoy:config.jingtai_url+'zuoy.png',
				kuang:config.jingtai_url+'kuang.png',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'s1.png'
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'s2.png'
				}, {
					id: 2,
					type: 'image',
					url:config.jingtai_url+'s3.png'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'s4.png'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'s5.png'
				}],
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad: function(options) {
			//获得Canvas的上下文
			content = uni.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#fff")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润

content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
		},
		methods: {
			cha(e){
				console.log(e)
			},
		
	
			 xuanze:function() {
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',

					success: async  function(res) {
						//打印图片路径
						console.log(res.tempFilePath)
						//设置保存的图片
						that.signImage = res.tempFilePath
						


						that.$store.commit('sign_url_storage',res.tempFilePath);
						



						let info=await that.$WXR.post('/consumer/getInformation',{})   
						console.log(info)
						if(info.data!=null && info.data.count){
							uni.showLoading({
                    
								mask:true
							});
							
							let t=setInterval(function(){
								if(that.$store.state.index.share_jieshu){
									clearInterval(t) 
									uni.hideLoading()
								
								
									uni.navigateTo({
										url:'/pages/dna_test/share'
									})
								}
							},250)
						}else{
							uni.showLoading({
                    
								mask:true
							});
							
							
							let t=setInterval(function(){
								if(that.$store.state.index.data_jieshu){
									clearInterval(t) 
									uni.hideLoading()
								
									uni.navigateTo({
										url:'/pages/dna_test/data'
									})
								}
							},250)
						
						}
						
					}
				})

			},
			// 画布的触摸移动开始手势响应
			start: function(e) {
				console.log(e)
				// console.log("触摸开始" + event.changedTouches[0].x)
				//                 console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
				// console.log(touchs)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},

			error: function(e) {
				console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
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
	.wai{
		width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;

		position: relative;
        @extend .reset;
	}
	.wb{
        @extend .reset;
        width:100%;
       	padding-top: 262upx;
        position: absolute;
        top:50%;
		margin-top: -603upx;
    }
	swiper-item image{
		width:523upx;
		@extend .reset;
	}
	swiper{
		margin:0 auto;
		width:523upx;
		height:523upx;
	}
	.yind{
		position: absolute;
		top:98upx;
		left:80upx;
		width:491upx;
	}
	// 523
	.zuoy{
		position: absolute;
		width: 363upx;
		left: 50%;
		margin-left: -181.5upx;
		top:827upx;
	}
	.xz{
		position: absolute;
		width: 356upx;
		left: 50%;
		margin-left: -178upx;
		top:910upx;
	}
	// swiper{
	// 	width: 100%;
	// 	height: 716upx;
	// }
	.kuang_box{
		width:550upx;
		margin: 0 auto;
		position: relative;
		@extend .reset;
		padding-top: 90upx;
	}
	.kuang{
		position: absolute;
		width:550upx;
		@extend .reset;
		left: 0;
		top:0;
	}
	.firstCanvas{
		width: 393upx;
		height: 393upx;
		margin: 0 auto;
		margin-left: 86rpx;

	
	}
	.xiaosi{
		height: 462upx;
	}
	
</style>
