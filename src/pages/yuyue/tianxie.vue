
<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
    	<image  class="st" :src="st" mode="widthFix" alt="" srcset=""></image>

       <form @submit="formSubmit" :class="xibap">
	
			<view class="formg">
				<input placeholder-class='nn' placeholder="姓名" type="text" class="name" name="name" v-model="nas" :disabled="ko">
				<picker name='sex' class="sex" @change="bindPickerChange" :value="index" :range="array" :disabled="ko">
					<view>{{array[index]}}</view>
					<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
				</picker>
			</view>
			<view class="formg" >
				
				<picker name='chengshi' class="chengshi" @tap='xu' @change="bindPickerChange2" :value="index2" :range="array2" :disabled=true>
					<view>{{sheng}}-{{shi}}</view>
					<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
				</picker>
		
				<!-- <picker name='chengshi' class="chengshi" mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
				</picker> -->
			</view>
			<view class="formg">
				<input name="phone" class="sj" placeholder-class='nn' placeholder="手机号码" type="text" v-model="phs" :disabled="ko">
			</view>
			<view class="formg xiugai" v-if="isxiu" @tap="ki()">
				<view>修改</view>
			</view>
			<image @tap='qie' v-show='istongyi'  class="gou" :src="tongyi" mode="widthFix" alt="" srcset=""></image>
			<image @tap='qie' v-show='!istongyi'  class="gou" :src="ll" mode="widthFix" alt="" srcset=""></image>
			
			<image   class="tj" :src="tj" mode="widthFix" alt="" srcset=""></image>
			<button class="btn-primary" hover-class="btn-hover" formType="submit" type="primary">Submit</button>
		</form>

		<view class="ers"></view>
 
		<van-area v-if="vanarea" @confirm='confirm' @cancel='cancel' :area-list=" areaList " :columns-num=" 2 "  />
        <dix :imgurl='xiba' />

      
    </view>
   
</template>


<script>
    import {lujing,modal,lujing_bg} from '@/util/common.js'
    import  config from '../../config'
    import dix from "../../components/dix.vue";

	import tuiModal from "../../components/modal.vue"
	import area from "@/util/area.js";
	const form = require("@/util/formValidation.js")
    export default {
        components:{ 'dix':dix ,'tui-modal':tuiModal},
        data() {
            return {
				sheng:'河北省',
				shi:'石家庄市',
				vanarea:false,
				areaList:{},
				xibap:'',
				ko:true,
				nas:'',
				phs:'',
				xiop:config.jingtai_url+'xiajian.png',
				array:['男','女'],
				index: 0,
				array2:['上海市','北京市'],
				index2: 0,
				tongyi:config.jingtai_url+'t_tong.png',
				ll:config.jingtai_url+'t_bu.png',
				istongyi:true,
				tj:config.jingtai_url+'queren.jpg',
				tin:config.jingtai_url+'tin.png',
                bg:lujing_bg('yb.jpg'),
				// st:config.jingtai_url+'gugu.png',
				st:config.jingtai_url+'tian_new.png',
                xiba:config.jingtai_url+'bak.png',

                sm:config.jingtai_url+'shimao.png',

                chan:config.jingtai_url+'chan.png',

                modal8:false,

                shanl:'chan_bo',
				isxiu:false,

				multiIndex: [0, 0, 0],
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本'],
					['北京', '上海', '广州']
				],
            }
        },
        onLoad(options){
			
			this.areaList=area
			// this.array2 = []
			// for (let i in area.city_list) {
			// 	this.array2.push(area.city_list[i]); //属性
			
			// }
		
			//修改,原信息复制
			let yuyueinfo=this.$store.state.index.yuyueinfo
			if(yuyueinfo!=''){
				this.xibap='xibap'
				this.isxiu=true
				this.index=parseInt(yuyueinfo.sex)-1
				this.array2.forEach((item,i)=>{
					if(item==yuyueinfo.city){
						this.index2=i
					}
				})

				this.nas=yuyueinfo.name
				this.phs=yuyueinfo.phone
			}else{
				this.ko=false

				
				let shp=this.$store.state.index.shouquan_phone
				if(shp!=''){
					this.phs=shp
				}
			}

        },
        computed: {
            session(){
				return this.$store.state
				.index.session
            }
        },
        methods:{
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
				if(this.ko==false){
					this.vanarea=true
				}
				console.log(22222)
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['中国', '日本']
								this.multiArray[2] = ['北京', '上海', '广州']
								break
							case 1:
								this.multiArray[1] = ['英国', '法国']
								this.multiArray[2] = ['伦敦', '曼彻斯特']
								break
						}
						this.multiIndex.splice(1, 1, 0)
						this.multiIndex.splice(2, 1, 0)
						break
					case 1: //拖动第2列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case 0:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['北京', '上海', '广州']
										break
									case 1:
										this.multiArray[2] = ['东京','北海道']
										break
								}
								break
							case 1:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['伦敦', '曼彻斯特']
										break
									case 1:
										this.multiArray[2] = ['巴黎', '马赛']
										break
								}
								break
						}
						this.multiIndex.splice(2, 1, 0)
						break
				}
				this.$forceUpdate()
			},
			ki(){
				this.xibap=''
				this.ko=false
			},
            formSubmit: function(e) {
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
					
					formData.chengshi=this.array2[formData.chengshi]
					formData.sex=parseInt(formData.sex)+1
					this.$store.commit('tianxieinfo_storage',formData);
					uni.navigateTo({
						url:'/pages/yuyue/canyu'
					})		
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
            getdata(e){
                
               
            },
            getstatus(){
             console.log('加载成功')
            },
            getr(){
                // console.log('加载失败')
                // uni.navigateTo({
                //     url: '/pages/error/err3'
                // })
            },
            async getPhoneNumber (e) {
                this.modal8=false;
                console.log(122222)
                let phone=JSON.stringify(e.detail)

                uni.navigateTo({
                    url:'/pages/dna_test/tuan_zy'
                })
                // if(phone.indexOf("fail") != -1){
                //     phone=''
                // }
                
             
                
                // uni.navigateTo({
                //     url:'/pages/jin_index/index'
                // })
               
            },
            
            sao(){
                
                this.shanl='chan_bo logo-brand'
                // this.chan=config.jingtai_url+'sao.gif'
                let _this=this
                setTimeout(function(){
                    _this.modal8= true
                    _this.shanl='chan_bo'
                    // _this.chan=config.jingtai_url+'chan.png'
                },1500)
			

			},
			qie(){
				this.istongyi=!this.istongyi
			},
			bindPickerChange: function(e) {
		
		
				this.index=e.detail.value
			},
			bindPickerChange2: function(e) {
		
		
				this.index2=e.detail.value
			},
        },
        async onShow(){
            
		}
    }
</script>

<style  lang='scss'>
    @import "../../app.scss"; 
	.wai{
		@extend .reset;
		width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
		padding-top: 639upx;
	}
    .sm{
        width: 399upx;
        margin: 0 auto;
        @extend .reset;
    }
    .chan{
        width: 100%;
      
        @extend .reset;

       
    }

    .chan_bo{
        width: 203upx;
        margin: 97upx auto 0;
        position: relative;
        @extend .reset;
    }
    // .fuchan{
    //     width: 100%;
    //     height: 100%;
    //     position:absolute;
    //     top:0;
    //     left:0;
    //     background: none;
    //      @extend .reset;
    //     // opacity: 0;
    // }
    .fuchan{
        // position: absolute;
        // bottom: 0;
        width: 100%;
        @extend .reset;
        
    }
   
    .tui-modal-box{
        border-radius: 0!important;
        padding: 0!important;
        padding-top: 40upx;
        display: flex!important;
        flex-direction: column;
        justify-content: space-between;
    }
    .tui-modal-custom-text{
        text-align: center;
        font-size: 33upx;
    }
    .xy{
        color: #808080;
    }
    .cc{
        height: 40upx;
    }
    .tui-modal-custom{
        padding-top: 40upx;
    }


   
    .logo-brand{position: relative; overflow: hidden;}
    .logo-brand:before {content: "";position: absolute; width: 330px; height: 70px;  background-color: rgba(255, 255, 255, 0.5); -webkit-transform: rotate(60deg);  transform: rotate(60deg); left: -100px; -webkit-animation: blink 1.5s infinite both; animation: blink 1.5s infinite both;}
    @-webkit-keyframes blink {from {left: -300px;top: 0;} to {left: 330px;top: 0;}}
    @-o-keyframes blink {from {left: -300px;top: 0;} to {left: 330px;top: 0;}}
    @-moz-keyframes blink {from {left: -300px;top: 0;} to {left: 330px;top: 0;}}
    @keyframes blink {from {left: -300px;top: 0;}to {left: 330px;top: 0;}}


	.st{
		width: 100%;
		position: absolute;
		top:0;
		left:0;
	}


	form{
		@extend .reset;
		width:356upx;
		margin: 0 auto;
		position: relative;
		z-index:10;
		// margin-top: 55upx;
	
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
	.formg.xiugai{
		flex-direction: column;

	}
	.formg.xiugai view{
		align-self: flex-end;
		font-size: 24rpx;
		width: 48rpx;
		@extend .reset;
		border-bottom: 0.5upx solid black;
	}
	.formg input{
		@extend .reset;
		height: 71upx;
		font-size: 24upx;
		// color: #fff;
		padding-left: 10upx;
		border: 1px solid #4d4d4d;
	}

	.nn{
		font-size: 24upx;
		color: #4d4d4d;
        text-align:center;
		  
	}
	.xibap input{
		background: #ccc;
	}
	.xibap picker{
		background: #ccc;
	}
	.formg picker{
		@extend .reset;
		height: 71upx;
		font-size: 24upx;
		color: #4d4d4d;
		position:relative;
		border: 1px solid #4d4d4d;
	}
	.xiop{
		position:absolute;
		width:13upx;
		right:23upx;
		top:28upx;
	}
	.formg picker view{
		width: 100%;
		height: 71upx;
		text-align: center;
		line-height: 71upx;
	}
	// .formg select option{
	// 	font-size: 24upx;
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
		margin-top:20upx;
	}

	.yisi{
		height: 223upx;
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
	.ers{
		height: 186upx;
	}


	van-area{
		width: 100%;
		position: fixed;
		bottom:0;
		z-index: 100
	}
</style>