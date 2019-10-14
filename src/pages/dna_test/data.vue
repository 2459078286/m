<template>
	<view class="wai" > 
		<view class="wb">
			<video :autoplay=true :loop=true class="tpv" :object-fit='cover' :show-center-play-btn=false :controls=false  id="myVideo" :src="video" ></video>
			<form @submit="formSubmit">
				<image  class="tin" :src="tin" mode="widthFix" alt="" srcset=""></image>
				
				<view class="formg">
					<input placeholder-class='nn' placeholder="姓名" type="text" class="name" name="name">
					<picker  name='sex' class="sex" @change="bindPickerChange" :value="index" :range="array">
						<view>{{array[index]}}</view>
						<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
					</picker>
				</view>
				<view class="formg" >
					
					<picker name='chengshi' :disabled=true   @tap='xu' class="chengshi" @change="bindPickerChange2" :value="index2" :range="array2">
						<view>{{sheng}}-{{shi}}</view>
						<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
					</picker>
				</view>
				<view class="formg">
					<input name="phone" class="sj" placeholder-class='nn' placeholder="手机号码" type="text" v-model="phs">
				</view>
				<image @tap='qie' v-show='istongyi'  class="gou" :src="tongyi" mode="widthFix" alt="" srcset=""></image>
				<image @tap='qie' v-show='!istongyi'  class="gou" :src="ll" mode="widthFix" alt="" srcset=""></image>
				<image   class="tj" :src="tj" mode="widthFix" alt="" srcset=""></image>
				<button class="btn-primary" hover-class="btn-hover" formType="submit" type="primary">Submit</button>
			</form>
			
			<div class="yisi"></div>
			<dix :imgurl='xiba' />
		</view>
		<w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
		<van-area v-if="vanarea" @confirm='confirm' @cancel='cancel' :area-list=" areaList " :columns-num=" 2 "  />
        <dix :imgurl='xiba' />
	</view>
</template>

<script>
	import  config from '../../config'
    import dix from "../../components/dix.vue";
	
	import area from "@/util/area.js";
	
	const form = require("@/util/formValidation.js")
	export default {
		components:{ 'dix':dix },
		data() {
			return {
				sheng:'河北省',
				shi:'石家庄市',
				vanarea:false,
				areaList:{},
				phs:'',
				xiop:config.jingtai_url+'bai_03.png',
				video:this.$store.state.index.img_huan.datavideo,
				array:['男','女'],
				index: 0,
				array2:['上海市','北京市'],
				index2: 0,
				tongyi:config.jingtai_url+'tongyi.png',
				ll:config.jingtai_url+'ll.png',
				istongyi:true,
				tj:config.jingtai_url+'tj.jpg',
				tin:config.jingtai_url+'tin.png',
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
				// dotStyle: false,
				// towerStart: 0,
				// direction: 'top'
			};
		},
		onLoad() {
			this.areaList=area
			// this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			let shp=this.$store.state.index.shouquan_phone
			if(shp!=''){
				this.phs=shp
			}
		

			this.array2 = []
			for (let i in area.city_list) {
				this.array2.push(area.city_list[i]); //属性
			
			}

		
		},
		methods: {
			cancel(){
				this.vanarea=false
			},
			confirm(e){
				console.log(e,'eeeee')
				this.sheng=e.detail.values[0].name
				this.shi=e.detail.values[1].name

				this.vanarea=false
			},
			xu(){
			
				this.vanarea=true
			
				console.log(22222)
			},
			formSubmit:async  function(e) {
				//表单规则
				let rules = [{
					name: "name",
					rule: ["required"], //可使用区间，此处主要测试功能
					msg: ["请输入姓名"]
				},{
					name: "phone",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					console.log(formData,'formData')
			
					let info=await this.$WXR.post('/consumer/saveConsumerInfo',{
						name:formData.name,
						phone:formData.phone,
						city:this.array2[formData.chengshi],
						sex:parseInt(formData.sex)+1,
						sessionKey:this.$store.state.index.session,
					
						dnaAnswer:this.$store.state.index.test_go.tuan_test,
						musicAnswer:this.$store.state.index.test_go.music_test,
						lifeStyleAnswer:this.$store.state.index.test_go.she_test,
						carTypeAnswer:this.$store.state.index.test_go.che_test,
					})     


				
					 uni.showLoading({
                    
                        mask:true
                    });
					let _this=this
					let t=setInterval(function(){
						if(_this.$store.state.index.share_jieshu){
							clearInterval(t) 
							uni.hideLoading()
						
							uni.navigateTo({
								url:'/pages/dna_test/share'
							})	
						}
					},250)
					
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			bindPickerChange: function(e) {
		
		
				this.index=e.detail.value
			},
			bindPickerChange2: function(e) {
		
		
				this.index2=e.detail.value
			},
			cha(e){
				console.log(e)
			},
			xuanze(){
				uni.navigateTo({
					url:'/pages/dna_test/music'
				})
			},
			qie(){
				this.istongyi=!this.istongyi
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
	 .tpv{
        width:100%;
        height:1350upx;
	
        @extend .reset;
		position: absolute;
		left: 0;
		top:-160upx;
    }
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
		padding-top: 495upx;
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

	form{
		width:356upx;
		margin: 0 auto;
		position: relative;
		z-index:10;
		@extend .reset;
	}
	.tin{
		width:100%;
		margin-bottom: 65upx;
		@extend .reset;
	}

	.formg{
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 12upx;
	}

	.formg input{
		border: 0.05upx solid #4d4d4d;
		height: 71upx;
		font-size: 22upx;
		color: #fff;
		padding-left: 10upx;
		@extend .reset;
	}

	.nn{
		font-size: 22upx;
		color: #4d4d4d;
        text-align:center    
	}
	
	.formg picker{
		border: 0.05upx solid #4d4d4d;
		height: 71upx;
		font-size: 22upx;
		color: #fff;
		position:relative;
	}
	.formg picker view{
		width: 100%;
		height: 71upx;
		text-align: center;
		line-height: 71upx;
	}
	// .formg select option{
	// 	font-size: 22upx;
	// 	color: #fff;
	// }
	.name{
		width:172upx
	}
	.sex{
		width:172upx	
	}
	.chengshi{
		width:100%;
	}
	.gou{
		width: 218upx;
		@extend .reset;
		margin: 15upx auto 0;
	
	}

	.tj{
		width: 100%;
		@extend .reset;
		margin-top:30upx;
	}

	.yisi{
		height: 235upx;
	}

	.sj{
		width: 100%;
	}
	.btn-primary{
		position:absolute;
		bottom:0;
		width:100%;
		height: 72upx;
		@extend .reset;
		opacity: 0;
	}
	.xiop{
		position:absolute;
		width:13upx;
		right:23upx;
		top:28upx;
	}

	
	van-area{
		width: 100%;
		position: fixed;
		bottom:0;
		z-index: 100
	}
</style>
