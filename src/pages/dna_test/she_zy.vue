<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
		<view class="wb">
			<!-- <image  class="diang" :src="diang" mode="widthFix" alt="" srcset=""></image> -->
			<swiper class="card-swiper" :indicator-dots="false" :circular="true"
			:autoplay="false" :current='current'  interval="5000" duration="500" @change='cardSwiper'>
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
					</view>
					
				</swiper-item>
			</swiper>
		
			<image  class="yind" :src="yind" mode="widthFix" alt="" srcset=""></image>
			<image class="zuoy"  :src="zuoy" mode="widthFix" alt="" srcset=""></image>
			<image @tap='xuanze' class="xz"  :src="xz" mode="widthFix" alt="" srcset=""></image>
			<view class="she_bu">

			</view>
			
		</view>
		<w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
		<dix :imgurl='xiba' />
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
				diang:config.jingtai_url+'ak.png',
				bg:lujing_bg('s_bg.jpg'), 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'yind_s2.png',
				xz:config.jingtai_url+'xz.png',
				zuoy:config.jingtai_url+'zuoy_s.png',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'x1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'x2.jpg'
				}, {
					id: 2,
					type: 'image',
					url:config.jingtai_url+'x3.jpg'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'x4.jpg'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'x5.jpg'
				}],
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad() {
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			cha(e){
				console.log(e)
				this.current=e.detail.current
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current

				console.log(e.detail.current)
				
				
			},
			xuanze(){
				let arr=this.$store.state.index.test_go
				arr.she_test=this.current+1
				this.$store.commit('test_go_storage',arr);
				
				uni.showLoading({
                    
                        mask:true
                    });
                let _this=this
                let t=setInterval(function(){
                    if(_this.$store.state.index.che_jieshu){
                        clearInterval(t) 
                        uni.hideLoading()
                      
                       	uni.navigateTo({
							url:'/pages/dna_test/che_zy'
						})
                    }
                },250)
				
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
        background-size: 100% 100%;
		position: relative;
        @extend .reset;
	}
	.wb{
        @extend .reset;
        width:100%;
       	padding-top: 242upx;
        position: absolute;
        top:50%;
		margin-top: -603upx;
    }
	.diang{
		position:absolute;
		left:0;
		top:291upx;
		width: 100%;

	}
	swiper-item image{
		width:523upx;
		@extend .reset;
	}
	swiper{
		margin:0 auto;
		width:100%;
		height:523upx;
	}
	.yind{
		position: absolute;
		top:95upx;
		left:80upx;
		width:592upx;
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
		top:908upx;
	}
	// swiper{
	// 	width: 100%;
	// 	height: 716upx;
	// }
	.she_bu{
		height: 442upx;
	}
</style>
