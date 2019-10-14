
<template>
	<view class="wai" >

		<view class="bo">
			<image  class="mo" :src="mo" mode="aspectFit" alt="" srcset=""></image>
			<view @tap='can("/pages/yuyue/mng",2)' class="can_mng"></view>
		</view> 
    	
		<view class="bo">
			<image  class="pin" :src="pin" mode="aspectFit" alt="" srcset=""></image>
			<view @tap='can("/pages/yuyue/pinjian",1)' class="can_pin"></view>
		</view> 

		
		
		
		<!-- <view class="yibai"></view> -->
        <dix :imgurl='xiba' />

      
    </view>
   
</template>


<script>
    import {lujing,modal,lujing_bg} from '@/util/common.js'
    import  config from '../../config'
    import dix from "../../components/dix.vue";

	import tuiModal from "../../components/modal.vue"
	const form = require("@/util/formValidation.js")
    export default {
        components:{ 'dix':dix ,'tui-modal':tuiModal},
        data() {
            return {
				issuc:false,
				suc:config.jingtai_url+'yinhun.png',
				mo:config.jingtai_url+'mo.jpg',
				pin:config.jingtai_url+'pin.jpg',
				plogo:config.jingtai_url+'pinlogo.png',
				anhei:config.jingtai_url+'canyu.jpg',
				xiop:config.jingtai_url+'xiajian.png',
				array:['腕表品鉴会','赛车品鉴会'],
				index: 0,
				array2:['重庆站','西安站'],
				array3:['携带一名亲友'],
				index3:0,
				index2: 0,
				tongyi:config.jingtai_url+'tongyi.png',
				ll:config.jingtai_url+'ll.png',
				istongyi:true,
				tj:config.jingtai_url+'queren.jpg',
				tin:config.jingtai_url+'tin.png',
                bg:lujing_bg('yb.jpg'),
				st:config.jingtai_url+'gugu.jpg',
                xiba:config.jingtai_url+'bak.png',

                sm:config.jingtai_url+'shimao.png',

                chan:config.jingtai_url+'chan.png',

                modal8:false,

                shanl:'chan_bo'

            }
        },
        onLoad(options){
          
			console.log(this.$store.state.index.tianxieinfo)
         
          
            const query2 = wx.createSelectorQuery()
			query2.select('.wai').boundingClientRect()
			query2.selectViewport().scrollOffset()
			query2.exec(function (res) {
				console.log(res)
				
			})

        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
			async can(url,type){
			
				let tian=this.$store.state.index.tianxieinfo
				let yuyueinfo=this.$store.state.index.yuyueinfo

				let info=await this.$WXR.post('/consumer/saveAppointmentInfo',{
					id:yuyueinfo!=''?yuyueinfo.id:0,
					activityType:type,
					phone:tian.phone,
					city:tian.chengshi,
					isAppointment:1,
					name:tian.name,
					sex:tian.sex,
				})     
				uni.navigateTo({
					url
				})
			},
			
            formSubmit: function(e) {
				//表单规则
				let rules = [];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					this.issuc=true		
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
			bindPickerChange3: function(e) {
		
		
				this.index3=e.detail.value
			},
			gsuc(){
				this.issuc=false
			}
        },
        async onShow(){
            
		}
    }
</script>

<style  lang='scss'>
    @import "../../app.scss"; 
	page{
		height: 100%;
		@extend .reset;
		overflow: hidden;
	}
	.wai{
		width:100%;
        height: 100%;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
		background:black;
		position: relative;
        @extend .reset;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}
	.can_mng{
		position: absolute;
		top:60%;
		right: 10%;
		width:134upx;
		height: 43upx;
	
		z-index:10
	}
	.can_pin{
		position: absolute;
		top:56%;
		right: 10%;
		width:134upx;
		height: 43upx;
	
		z-index:10
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
		border: 0.025upx solid #4d4d4d;
		color: #fff;
		height: 71upx;
		font-size: 24upx;
		// color: #fff;
		padding-left: 10upx;
		@extend .reset;
	}

	.nn{
		font-size: 24upx;
		color: #fff;
        text-align:center;
		  
	}
	
	.formg picker{
		border: 0.025upx solid #4d4d4d;
		height: 71upx;
		font-size: 24upx;
		color: #fff;
		position:relative;
		@extend .reset;
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
		margin-top:34upx;
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
	.anhei{
		width:100%;
	
	}

	.plogo{
		width: 235upx;
		@extend .reset;
		margin:0 auto;
	}

	.pc{
		height:82upx;
	}

	.tanc{
		position: absolute;
		left:0;
		top:0;
		z-index: 20;
		background: rgba(0,0,0,0.6);
		@extend .reset;
		padding-top:94upx;
		width:100%;
        min-height: 100vh;
	}
	.wuzhuan{
		position: absolute;
		width: 45upx;
		height:45upx;
		top:94upx;
		right:73upx;
		
		z-index:10
	}
	.suc{
		width:598upx;
		@extend .reset;
		margin:0 auto;
	}
	.yibai{
		height: 120upx;
	}
	.bo{
		position: relative;
		height: 50%;
		image{
			min-width: 100%!important;
			height: 100%;
		}
	}
</style>
