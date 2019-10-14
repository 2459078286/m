<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
	
		<view class="wb">
			<swiper class="card-swiper"  :indicator-dots="false" :circular="true"
			:autoplay="false" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
						
					</view>
				</swiper-item>
			</swiper>
			<image  class="yind" :src="yind" mode="widthFix" alt="" srcset=""></image>
			<image class="zuoy"  :src="zuoy" mode="widthFix" alt="" srcset=""></image>
			<image @tap='xuanze' class="xz"  :src="xz" mode="widthFix" alt="" srcset=""></image>
			

			<button @tap="xiangji" v-show="sh==false" class="hq">调用相机</button>

			<button open-type="openSetting" @opensetting="opensetting" v-show="sh==true" class='hq'>调用相机</button>

			<view class='siis'></view>


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
				sh:false,
				dotStyle: false,
				bg:lujing_bg('op_bg.jpg'), 
				xiba:config.jingtai_url+'ddd_02.png',
				yind:config.jingtai_url+'xb.png',
				xz:config.jingtai_url+'que.jpg',
				zuoy:config.jingtai_url+'zuoy_p.png',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'x1.png',
					class:'zhong',
					yingshe:this.$store.state.index.img_huan.watch1,
					yd:config.jingtai_url+'xuanb_y1.png'
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'x2.png',
					class:'wei',
					yingshe:this.$store.state.index.img_huan.watch2,
					yd:config.jingtai_url+'xuanb_y2.png'
				}, {
					id: 2,
					type: 'image',
					url:config.jingtai_url+'x3.png',
					class:'wei',
					yingshe:this.$store.state.index.img_huan.watch3,
					yd:config.jingtai_url+'xuanb_y3.png'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'x4.png',
					class:'wei',
					yingshe:this.$store.state.index.img_huan.watch4,
					yd:config.jingtai_url+'xuanb_y4.png'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'x5.png',
					class:'wei',
					yingshe:this.$store.state.index.img_huan.watch5,
					yd:config.jingtai_url+'xuanb_y5.png'
				}],
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad() {
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			this.$store.commit('xuanz_n_storage',this.swiperList[0].yingshe);

			this.yind=this.swiperList[0].yd
		},
		methods: {
			
			xiangji(){
				var _this=this
                wx.getSetting({
                    success(res) {  
                    if(res.authSetting['scope.camera']){   //如果之前已经授权过就直接跳去camera组件所在页面
						console.log(_this.swiperList,'swiperList')
						console.log(_this.$store.state.index.xuanz_n,'.xuanz_n')
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

				console.log(e.detail.current)
				this.$store.commit('xuanz_n_storage',this.swiperList[e.detail.current].yingshe);
				this.yind=this.swiperList[e.detail.current].yd
			},
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
	.siis{
		height: 442upx
	}
</style>
