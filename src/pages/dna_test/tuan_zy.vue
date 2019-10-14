<template>
	<view class="wai" > 
	
		<view class='dangban' v-show="iszhengzi"></view>
		
		<video    :enable-progress-gesture=false :controls=false class="tpvss" :show-center-play-btn=false  :poster="poster" :style="{opacity:v1opa}"   id="myVideo" :src="video" :initial-time=initial ></video>
		
		<video  :style="{opacity:v2opa}"   :enable-progress-gesture=false :controls=false 	 class="tpvss2" :show-center-play-btn=false     id="myVideo2" :src="video2" :initial-time=initial ></video>
		
		<swiper :current="current" :indicator-dots="false" :circular="false"
		 :autoplay="false"   @change='cha' >
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<view class="bnm">

		</view>
		 <image  class="yind" :src="yind" mode="widthFix" alt="" srcset=""></image>
		 <image class="zuoy"  :src="zuoy" mode="widthFix" alt="" srcset=""></image>
		 <image @tap='xuanze' class="xz"  :src="xz" mode="widthFix" alt="" srcset=""></image>
		<w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
        <dix :imgurl='xiba' />
		<dix :imgurl='xiba' />
	</view>
</template>

<script>
              
	import  config from '../../config'
	import dix from "../../components/dix.vue";
	import {login_check,panduan,gup,login,lujing,lujing_bg,modal} from '@/util/common.js'

	export default {
		components:{ 'dix':dix },
		data() {
			return {
				isdao:false,
				noo:true,
				// duration
				iszhengzi:false,
				initial:0,
				video:this.$store.state.index.img_huan.tuan_video,
				// video:config.jingtai_url+'xs4.mp4',
				video2:this.$store.state.index.img_huan.tuan_video_dao,
				// video2:config.jingtai_url+'dao.mp4',
				bg:config.jingtai_url+'sq_bg.jpg', 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'tuan_yind_03.png',
				xz:config.jingtai_url+'xz.png',
				zuoy:config.jingtai_url+'zuoy.png',
				cardCur: 0,
				poster:this.$store.state.index.img_huan.fengmian,
				v1opa:1,
				v2opa:0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'tu2.png'
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'tu2.png'
				}, {
					id: 2,
					type: 'image',
					url:config.jingtai_url+'tu2.png'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'tu2.png'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'tu2.png'
				}],
				videoplay:'',
				videoplay2:'',
				current:0,
				tp:0
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad() {
			// var timestamp = Date.parse(new Date());  
    		// timestamp = timestamp / 1000; 
			// this.video=this.video+'?key='+timestamp
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			
			this.videoplay=wx.createVideoContext('myVideo')
			this.videoplay2=wx.createVideoContext('myVideo2')
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask:true
			// });
			console.log('ppppppp')
		},
		methods: {
			timeupdate(e){
				// if(e.detail.currentTime>9.6){
				// 	this.videoplay.seek(0)

				// 	uni.showLoading({
				// 		title: '加载中',
				// 		mask:true
				// 	});
				// }
			
				// console.log('播放到',e)
			},
		
			ended(){
			// 	var that = this;
			// 	wx.getSystemInfo({
			// 	success:function(res){
				
			// 		if(res.platform == "devtools"){
			//             PC
			// 		}else if(res.platform == "ios"){
			//             IOS
			// 		}else if(res.platform == "android"){
			//              uni.showLoading({
			// 			 	title: '加载中',
			// 			 	mask:true
			// 			 });
			// 		}
			// 	}
			// 	})
			
				this.videoplay.seek(0)
				this.videoplay.pause()
			

				// setTimeout(function(){
				// 	uni.hideLoading()
				// },1000)
				
			
			
			},
			progress(e){
				// console.log('进度',e)
			
				// if(e.detail.buffered==100){
				// 	uni.hideLoading()
				// }else{
				// 	uni.showLoading({
				// 		title: '加载中',
				// 		mask:true
				// 	});
				// }

			},

			ka(e){
				
				if(this.iszhengzi==false){
				
					this.videoplay.play()
					this.iszhengzi=true
				}
			
			},
			ting(e){
				
				this.videoplay.pause()
				this.iszhengzi=false
			},
			cha(e){
				console.log(e)
				// console.log(this.current,e.detail.current)
				if(e.detail.current>this.current){
					
					// this.isdao=false
					// this.videoplay=wx.createVideoContext('myVideo')
					if(e.detail.current==1){
				
						this.playaction(2560,0)
					}else if(e.detail.current==2){

						this.playaction(2530,2.56)
					}else if(e.detail.current==3){
					
						this.playaction(2530,5.09)
					}else if(e.detail.current==4){
					
						this.playaction(2200,7.62)
					}
					
				}

				if(e.detail.current<this.current){
					// this.isdao=true
					// this.videoplay2=wx.createVideoContext('myVideo2')
					if(e.detail.current==0){
						console.log('倒放')
						this.playaction2(2860,7)
					}else if(e.detail.current==1){

						this.playaction2(2530,5.09)
					}else if(e.detail.current==2){
					
						this.playaction2(2530,2.56)
					}else if(e.detail.current==3){
					
						this.playaction2(2530,0)
					}
					
				}

				// if(e.detail.current<this.current){
				// 	console.log(e.detail.current,this.current)
				// 	if(e.detail.current==0){
				
				// 		this.playaction(0,0)
				// 	}else if(e.detail.current==1){
					
				// 		this.playaction(2000,1)
				// 	}else if(e.detail.current==2){
						
				// 		this.playaction(2530,3)
				// 	}else if(e.detail.current==3){
					
				// 		this.playaction(2000,5.8)
				// 	}
			
				// }

				// if(e.detail.current>this.current){
				// 	this.tp=this.tp+1
				// 	if(this.tp>4){
				// 		this.tp=0
				// 	}

				// }else if(e.detail.current<this.current){
				// 	this.tp=this.tp-1
				// 	if(this.tp<0){
				// 		this.tp=0
				// 	}
				// }

				// console.log(this.tp)
				// if(this.tp==1){
				// 	this.videoplay.seek(0)
				// 	this.playaction(2560)
				// }else if(this.tp==2){
				// 	this.videoplay.seek(2.56)
				// 	this.playaction(2530)
				// }else if(this.tp==3){
				// 	this.videoplay.seek(5.09)
				// 	this.playaction(2490)
				// }else if(this.tp==4){
				// 		this.videoplay.seek(7.56)
				// 	this.playaction(2470)
				// }else if(this.tp==0){
					
				// 	this.videoplay.seek(0)
				// }
				

				this.current=e.detail.current
			
				
			
			
			
			},
			playaction(jian,seek,bo){
				if(seek!=undefined){
					this.videoplay.seek(seek)
				}
				let _this=this
				_this.iszhengzi=true
				setTimeout(function(){
					_this.v1opa=1
					_this.v2opa=0
					_this.videoplay.play()
				
					setTimeout(function(){
						_this.videoplay.pause()
						_this.iszhengzi=false
					},jian)
				},900)
				// if(seek!=0 || bo){
					
					
				// }
				
			},
			playaction2(jian,seek,bo){
				if(seek!=undefined){
					this.videoplay2.seek(seek)
				}
				let _this=this
				_this.iszhengzi=true
				setTimeout(function(){
					_this.v1opa=0
					_this.v2opa=1
					_this.videoplay2.play()
				
					setTimeout(function(){
						_this.videoplay2.pause()
						_this.iszhengzi=false
					},jian)
				},900)
				
			},
			xuanze(){
				// console.log(this.current,'222')
				let arr=this.$store.state.index.test_go
				arr.tuan_test=this.current+1
				this.$store.commit('test_go_storage',arr);

				uni.showLoading({
                    
                        mask:true
                    });
                let _this=this
                let t=setInterval(function(){
                    if(_this.$store.state.index.music_jieshu){
                        clearInterval(t) 
                        uni.hideLoading()
                      
                       	uni.navigateTo({
							url:'/pages/dna_test/music'
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
	page{
		background: black;
		
	}
	.wai{
		width:100%;
        // min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
		padding-top: 172upx;
		background: black;
		position: absolute;
		@extend .reset;
		top:50%;
		margin-top: -603upx;
		overflow: hidden;
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
	.tpvss{


		width: 100%;
		height: 1354rpx;
		@extend .reset;
		position: absolute;
		left: 0;
		top: -147rpx;
	

    }
	.tpvss2{


		width: 1920rpx;
		height: 1354rpx;
		@extend .reset;
		position: absolute;
		left: -586rpx;
		top: -147rpx;
		overflow: hidden;

    }
	.dangban{
		position: absolute;
		left:0;
		top:0;
		width:100%;
        min-height: 100vh;
		// background: red;
		z-index:2
	}
	.bnm{
		height: 318upx;
	}
</style>
