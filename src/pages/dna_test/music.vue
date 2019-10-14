<template>
	<view class="wai" :style="{backgroundImage:mu_bg}"> 
		
		<view class="music_box" >
			<image :class="zhenss" :src="zhen" mode="widthFix" ></image>
			<image :class="panss" :src="pan" mode="widthFix" ></image>
		</view>
	
		<image  class="yind" :src="yind" mode="widthFix" alt="" srcset=""></image>
		 <view class="con_box">
			<image @tap='upPlay' class="prev"  :src="prev" mode="widthFix" alt="" srcset=""></image>
			<view @tap='upPlay' class="upplay_d"></view>
			<image v-show="!playState"  @tap='play' class="zant"  :src="ks" mode="widthFix" alt="" srcset=""></image>
			<image  v-show="playState"  @tap='play' class="zant"  :src="zant" mode="widthFix" alt="" srcset=""></image>
			
			<image @tap="nextPlay" class="next"  :src="next" mode="widthFix" alt="" srcset=""></image>
			<view @tap="nextPlay" class="nextplay_d"></view>
			
		 </view>
		 <image @tap='xuanze' class="xz"  :src="xz" mode="widthFix" alt="" srcset=""></image>
		 
		 <view class="cc"></view>
		<dix :imgurl='xiba' />
	</view>
</template>

<script>
 	import {lujing,modal,lujing_bg,tobase64} from '@/util/common.js'
	import  config from '../../config'
	import dix from "../../components/dix.vue";
	let innerAudioContext = ''
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				zhenss:'zhen',
				playState:0,//播放状态
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'music_yind_03.png',
				xz:config.jingtai_url+'xz.png',
				zuoy:config.jingtai_url+'zuoy.png',
				prev:config.jingtai_url+'prev.png',
				zant:config.jingtai_url+'zant.png',
				ks:config.jingtai_url+'play.png',
				next:config.jingtai_url+'next.png',
				cardCur: 0,
				zhenarr:[
					this.$store.state.index.img_huan.c1_zhen,
					// config.jingtai_url+'c1_zhen.png',
					this.$store.state.index.img_huan.c2_zhen,
					this.$store.state.index.img_huan.c3_zhen,
					this.$store.state.index.img_huan.c4_zhen,
					this.$store.state.index.img_huan.c5_zhen,
					
				],
				zhen:this.$store.state.index.img_huan.c1_zhen,
				bgarr:[
					this.$store.state.index.img_huan.c1_bg,
					// config.jingtai_url+'c1_bg.jpg',
					this.$store.state.index.img_huan.c2_bg,
					this.$store.state.index.img_huan.c3_bg,
					this.$store.state.index.img_huan.c4_bg,
					this.$store.state.index.img_huan.c5_bg,
				],
				mu_bg:this.$store.state.index.img_huan.c1_bg,
				panarr:[
					this.$store.state.index.img_huan.c1_pan,
					// config.jingtai_url+'c1_pan.png',
					this.$store.state.index.img_huan.c2_pan,
					this.$store.state.index.img_huan.c3_pan,
					this.$store.state.index.img_huan.c4_pan,
					this.$store.state.index.img_huan.c5_pan,
				],
				pan:this.$store.state.index.img_huan.c1_pan,


				panss:'pan',

				audioList:[
					
					{name:'英雄联盟群雄齐聚',
					 author:'毛不易',
					 src:this.$store.state.index.img_huan.music1,
		
					 },
					{name:'TryEverything',
					 author:'Shakira',
					 src:this.$store.state.index.img_huan.music2,
					
					 },
					{name:'我爱过几个人',
					 author:'邓论',
					 src:this.$store.state.index.img_huan.music3,
				
					 },
					 {name:'浪子回头',
					  author:'辉气*蛋',
					  src:this.$store.state.index.img_huan.music4,
				
					  },
					 {name:'生僻字心动不已',
					  author:'〃°ω°〃',
					  src:this.$store.state.index.img_huan.music5,
				
					  }
				],
				audioPlaySrc:0,//当前播放的歌曲index

				issx:false
			};
		},
		onLoad() {
		
		},
		destroyed(){
		
			innerAudioContext.destroy()
			innerAudioContext = ''

			if(this.$store.state.index.innerAudioContext!=''){
				console.log('bgm开')
				this.$store.state.index.innerAudioContext.play()
			}
			
		
		},
		methods: {
			audioInit(){
				let src = this.audioList[this.audioPlaySrc].src
				let _this=this
				this.mu_bg=tobase64(this.bgarr[this.audioPlaySrc])
				// this.mu_bg=this.bgarr[this.audioPlaySrc]
				this.zhen=this.zhenarr[this.audioPlaySrc]

				this.pan=this.panarr[this.audioPlaySrc]

				
				if(innerAudioContext){
					innerAudioContext.destroy()
					innerAudioContext = ''
					//销毁====================
				}
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = src
				innerAudioContext.autoplay = false
				


				// if(this.issx==false){
				// 	this.zhenss='zhen ding'

				// 	this.panss='pan zhuan'
						
				// 	setTimeout(function(){
				// 		innerAudioContext.play()
						
				// 	},1300)	
				// }else{
					setTimeout(function(){
						_this.zhenss='zhen ding'

						_this.panss='pan zhuan'
					},1200)
					setTimeout(function(){
						innerAudioContext.play()
						
					},2500)	
				// }	
			
					
				
			
				//监听事件
				innerAudioContext.onPlay(()=>{
					this.playFunc()
				})
				innerAudioContext.onPause(()=>{
					this.pauseFunc()
				})
				innerAudioContext.onTimeUpdate((e)=>{
					this.nowmiao = Math.floor(innerAudioContext.currentTime)
				})
				innerAudioContext.onEnded(()=>{
					this.audioInit()
				})
			},
			play(){
				if(this.playState){
					//暂停
					innerAudioContext.pause()

					
				}else{
					//播放
					innerAudioContext.play()
				
				}
			},
			playFunc(){
				this.playState=1
				this.zhenss='zhen ding'

				this.panss='pan zhuan'
				
			},
			pauseFunc(){
				this.playState= 0
				this.panss='pan zhuan aniti'
				
			},
			upPlay(){
				this.zhenss='zhen'
				this.panss='pan'
				this.issx=true
				//顺序
				if(this.audioPlaySrc < 1){
					this.audioPlaySrc = this.audioList.length-1
				}else{
					this.audioPlaySrc = this.audioPlaySrc-1
				}
			
				this.audioInit()
			},
			nextPlay(){
				this.zhenss='zhen'
				this.panss='pan'
				console.log(this.zhenss)
				this.issx=true
				if(this.audioPlaySrc >= (this.audioList.length-1)){
					this.audioPlaySrc = 0
				}else{
					this.audioPlaySrc = this.audioPlaySrc+1
				}
				this.audioInit()
		
			},
			cha(e){
				console.log(e)
			},
			xuanze(){
				let arr=this.$store.state.index.test_go
				arr.music_test=this.audioPlaySrc+1
				this.$store.commit('test_go_storage',arr);

			
				uni.navigateTo({
					url:'/pages/dna_test/she_zy'
				})
			},
			onShow(){
				console.log('显示')
				if(this.$store.state.index.innerAudioContext!=''){
					console.log('bgm停')
					this.$store.state.index.innerAudioContext.pause()
				}
				
				
				this.audioPlaySrc = 0
				this.audioInit()
			},
			onHide(){
				innerAudioContext.destroy()
				innerAudioContext = ''

				if(this.$store.state.index.innerAudioContext!=''){
					console.log('bgm开')
					this.$store.state.index.innerAudioContext.play()
				}
			
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
	page{
		background: black;
	}
	.wai{
		width:100%;
        // min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
	
		position:absolute;
		@extend .reset;
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
		width:574upx;
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
	.con_box{
		width:358upx;
		position: absolute;
		left: 50%;
		margin-left: -179upx;
		top:807upx;
		display: flex;
		justify-content: space-between;
	}
	.prev {
		width: 20upx;
		align-self: center;
		// @extend .reset;
	}
	.upplay_d{
		position: absolute;
		width: 35upx;
		height: 100%;

		top:0;
		left: 0;
	}
	.nextplay_d{
		position: absolute;
		width: 35upx;
		height: 100%;

		top:0;
		right: 0;
	}
	.next {
		width: 20upx;
		align-self: center;
		// @extend .reset;
	}
	.zant{
		width: 51upx;
		align-self: center;
		// @extend .reset;
	}
	.music_box{
		width: 100%;
		height: 1077upx;
		// background-repeat:   no-repeat;
        // background-size: 100% 100%;
		padding-top: 208upx;
		position: relative;
		@extend .reset;
	}
	.pan{
		width: 585upx;
		margin:0 auto;
		@extend .reset;
	}
	.zhuan{
		-webkit-transform: rotate(360deg);
		-webkit-animation: rotation 8s linear infinite;
		animation: rotation 8s linear infinite;
		animation-delay:1.2s;
	}
	.aniti{
		animation-play-state:paused;
	}
	.cc{
		height:127upx;
	}
	.zhen{
		position:absolute;
		top:156upx;
		right:0;
		width:184upx;
		z-index: 10;
		transform: rotate(-14deg);
		transform-origin: top right;
	}
	@keyframes lds-hourglass {
		0% {
			transform: rotate(-14deg);
			transform-origin: top right;
		}
		100% {
			transform: rotate(0deg);
			transform-origin: top right;
			
		}
	}

	.ding{
	
		animation: lds-hourglass 1s linear ;
		animation-fill-mode: forwards;
	}
</style>
