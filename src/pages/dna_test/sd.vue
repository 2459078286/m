<template>
	<view class="wai" > 
		<view class="wb">
			<camera   class="xj" device-position="back" flash="auto" @error="error" @initdone="done" >
				<cover-image :src="shou" class="scan-img-shou"></cover-image>
				<cover-image :src="text" class="scan-img-text"></cover-image>
			</camera>
			<image @click="takePhoto"  class="pai" :src="pai" mode="widthFix" alt="" srcset=""></image>
			<div class="jiaozhun"></div>
			<view class="hongs"></view>
			<dix :imgurl='xiba' />	
		</view>
		
	</view>
</template>

<script>
	import  config from '../../config'
    import dix from "../../components/dix.vue";
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				src: "",
				sh:false,
				isinit:true,
				pai:config.jingtai_url+'pai.png',
				shou:config.jingtai_url+'shou.png',
				bg:config.jingtai_url+'sq_bg.jpg', 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'yind.png',
				xz:config.jingtai_url+'xz.png',
				zuoy:config.jingtai_url+'zuoy.png',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'tu1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'tu1.jpg'
				}, {
					id: 2,
					type: 'image',
					url:config.jingtai_url+'tu1.jpg'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'tu1.jpg'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'tu1.jpg'
				}, {
					id: 5,
					type: 'image',
					url: config.jingtai_url+'tu1.jpg'
				}, {
					id: 6,
					type: 'image',
					url: config.jingtai_url+'tu1.jpg'
				}],
				text:config.jingtai_url+'qingpao.png'
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad(){
			
			let _this=this

	
	

			//校准圆心位置X，y所用的偏差值
			const query1 = wx.createSelectorQuery()
			query1.select('.jiaozhun').boundingClientRect()
			query1.selectViewport().scrollOffset()
			query1.exec(function (res) {
				res[0].top       // #the-id节点的上边界坐标
				res[1].scrollTop // 显示区域的竖直滚动位置
				
 				_this.$store.commit('jiaowid_storage',res[0].width);
 				_this.$store.commit('jiaohei_storage',res[0].height);
				
			})


			 
		},
		methods: {
			takePhoto() {
				if(this.isinit==true){
					const ctx = uni.createCameraContext();
					ctx.takePhoto({
						quality: 'high',
						success: (res) => {
							this.src = res.tempImagePath


							this.$store.commit('sd_url_storage',this.src);
							uni.navigateTo({
								url:'/pages/dna_test/sd2'
							})
							
						}
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '相机未初始化完成',
						success: function(res) {
						
						}
					})
				}
				
			},
			error(e) {
				console.log(e.detail);
			},
			done(e){
				console.log(e,'相机初始化完成')
				this.isinit=true
			},
			cha(e){
				console.log(e)
			},
			xuanze(){
				uni.navigateTo({
					url:'/pages/dna_test/music'
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
	.wai{
		width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
	
		background: black;
		position: relative;
        @extend .reset;
	}
	.wb{
        @extend .reset;
        width:100%;
	
        position: absolute;
        top:50%;
		margin-top: -603upx;
    }
	swiper-item image{
		width:100%;
	}
	.yind{
		position: absolute;
		top:100upx;
		left:80upx;
		width:489upx;
	}

	.zuoy{
		position: absolute;
		width: 363upx;
		left: 50%;
		margin-left: -181.5upx;
		top:773upx;
	}
	.xz{
		position: absolute;
		width: 356upx;
		left: 50%;
		margin-left: -178upx;
		top:910upx;
	}
	swiper{
		width: 100%;
		height: 716upx;
	}
	.xj{
		width: 100%;
		height: 922upx;

	}
	.scan-img-shou{
		width: 639upx;
		height: auto;
		margin-top: 212upx;

	}
	.scan-img-text{
		width: 214upx;
		height: auto;
		@extend .reset;
		margin:0 auto;
	}
	.pai{
		width: 74upx;
		height: auto;
		@extend .reset;
		margin:43upx auto 0;
	}
	.jiaozhun{
		width: 4upx;
		height: 12upx;
	}
	.hongs{
		height:156upx;
	}
</style>
