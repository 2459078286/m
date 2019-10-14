<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
		<view class="wb">
			<swiper :current='current' :indicator-dots="false" :circular="true"
			:autoplay="false"  interval="5000" duration="500" @change='cha'>
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<!-- <image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image> -->
					<video :autoplay=false :loop=false @timeupdate='timeupdate'  class="tpv" :show-center-play-btn=false :controls=false  :id="item.id" :src="item.video" ></video>
				</swiper-item>
			</swiper>
		
			<image  class="yind" :src="yind" mode="widthFix" alt="" srcset=""></image>
			<image class="zuoy"  :src="zuoy" mode="widthFix" alt="" srcset=""></image>
			<image @tap='xuanze' class="xz"  :src="xz" mode="widthFix" alt="" srcset=""></image>
			
			<dix :imgurl='xiba' />
		</view>
		
	</view>
</template>

<script>
	import  config from '../../config'
    import dix from "../../components/dix.vue";
	import {lujing,modal,lujing_bg} from '@/util/common.js'
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				current:0,
				bg:lujing_bg('xx.jpg'), 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'yindao_che2.png',
				xz:config.jingtai_url+'xz.png',
				zuoy:config.jingtai_url+'zuoy_che.png',
				cardCur: 0,
				swiperList: [{
					id: 'myVideo1',
					type: 'image',
					url: config.jingtai_url+'s1.png',
					video:this.$store.state.index.img_huan.che1,
					shili:wx.createVideoContext('myVideo1')
				}, {
					id: 'myVideo2',
					type: 'image',
					url: config.jingtai_url+'s2.png',
					video:this.$store.state.index.img_huan.che2,
					shili:wx.createVideoContext('myVideo2')
				}, {
					id: 'myVideo3',
					type: 'image',
					url:config.jingtai_url+'s3.png',
					video:this.$store.state.index.img_huan.che3,
					shili:wx.createVideoContext('myVideo3')
				}, {
					id: 'myVideo4',
					type: 'image',
					url: config.jingtai_url+'s4.png',
					video:this.$store.state.index.img_huan.che4,
					shili:wx.createVideoContext('myVideo4')
				}, {
					id: 'myVideo5',
					type: 'image',
					url: config.jingtai_url+'s5.png',
					video:this.$store.state.index.img_huan.che5,
					shili:wx.createVideoContext('myVideo5')
				}],
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad() {
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			this.swiperList[0].shili.play()
		},
		methods: {
			timeupdate(e){
				if(e.detail.currentTime>2.4){
                    this.swiperList[this.current].shili.pause()
				}
			
				console.log('播放到',e.detail.currentTime)
			},
			cha(e){
				console.log(e)
			
				this.current=e.detail.current
				this.swiperList[this.current].shili.play()
			
			},
			xuanze(){
				let arr=this.$store.state.index.test_go
				arr.che_test=this.current+1
				this.$store.commit('test_go_storage',arr);

				uni.navigateTo({
					url:'/pages/dna_test/sign'
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
		// padding-top: 242upx;
		
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
		width:523upx;
		@extend .reset;
	}
	swiper{
		width: 100%;
		height: 1206upx;
	}
	.tpv{
        width:100%;
        height:92%;
       
        @extend .reset;
    }
	.yind{
		position: absolute;
		top:76upx;
		left:80upx;
		width:592upx;
	}
	// 523
	.zuoy{
		position: absolute;
		width: 363upx;
		left: 50%;
		margin-left: -181.5upx;
		top:770upx;
	}
	.xz{
		position: absolute;
		width: 356upx;
		left: 50%;
		margin-left: -178upx;
		top:908upx;
	}
	// swiper{
	// 	width: 100%;
	// 	height: 716upx;
	// }
</style>
