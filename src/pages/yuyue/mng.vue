
<template>
	<view class="wai" > 
    	<image  class="anhei" :src="anhei" mode="widthFix" alt="" srcset=""></image>
		<view class="tanc" v-show='issuc'>
			<view class="tancg">
				<view class="wuzhuan" @tap='gsuc'></view>
				<image   class="suc" :src="suc" mode="widthFix" alt="" srcset=""></image>
			</view>
		</view>
       <form @submit="formSubmit">
		   
			<view class="pc"></view>
			<view class="formg" >
				
				<picker class="chengshi" @change="bindPickerChange" :value="index" :range="array">
					<view>{{array[index]}}</view>
					<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
				</picker>
			</view>
			<view  class="formg liyifeng" >
				
				<!-- <picker class="chengshi" mode="date" :value="date" :start="starts" fields='day' :end="ends" @change="bindDateChange">
					<view>{{date}}</view>
					<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
				</picker> -->

				<picker class="chengshi" @change="bindPickerChange4" :value="index4" :range="array4">
					<view>{{ces}}</view>
					<image  class="xiop" :src="xiop" mode="widthFix" alt="" srcset=""></image>
				</picker>
			</view>
			
			<image @tap='qie' v-show='istongyi'  class="gou" :src="tongyi" mode="widthFix" alt="" srcset=""></image>
			<image @tap='qie' v-show='!istongyi'  class="gou" :src="ll" mode="widthFix" alt="" srcset=""></image>
			<image   class="tj" :src="tj" mode="widthFix" alt="" srcset=""></image>
			<button class="btn-primary" hover-class="btn-hover" formType="submit" type="primary">Submit</button>
		</form>
		<view class='aoli'></view>
        <dix :imgurl='xiba' />

      
    </view>
   
</template>


<script>
    import {lujing,modal,lujing_bg,getDays} from '@/util/common.js'
    import  config from '../../config'
    import dix from "../../components/dix.vue";

	import tuiModal from "../../components/modal.vue"
	const form = require("@/util/formValidation.js")
    export default {
        components:{ 'dix':dix ,'tui-modal':tuiModal},
        data() {
            return {
				ces:'',
				starts:'2019-11-8',
				ends:'2019-11-12',
				date: '2019-11-8',
				issuc:false,
				suc:config.jingtai_url+'tjcg.jpg',
				plogo:config.jingtai_url+'pinlogo.png',
				anhei:config.jingtai_url+'mng_logo.jpg',
				xiop:config.jingtai_url+'bai_03.png',
				array:['摩纳哥巡展成都站','成都站李易峰见面会'],
				index: 0,
				array2:['11/8','11/9','11/10','11/11','11/12'],
				array3:['携带一名亲友'],
				array4:[],
				index4:0,
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
          
			
         
          	this.array4=getDays('2015-11-8', '2015-11-12')
          
			this.ces=this.array4[this.index4].slice(0,this.array4[this.index4].length-1)
			
			this.ces=this.ces.replace('月','/');
            

        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
			bindDateChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				
				this.date=e.detail.value
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

				if(this.index==0){
					this.array4=getDays('2015-11-8', '2015-11-12')
				}else{
					this.array4=['11月9日']
				}
				this.index4=0
				this.ces=this.array4[this.index4].slice(0,this.array4[this.index4].length-1)
				this.ces=this.ces.replace('月','/');
			},
			bindPickerChange2: function(e) {
		
		
				this.index2=e.detail.value
			},
			bindPickerChange3: function(e) {
		
		
				this.index3=e.detail.value
			},
			bindPickerChange4: function(e) {
		
		
				this.index4=e.detail.value

				this.ces=this.array4[this.index4].slice(0,this.array4[this.index4].length-1)
				this.ces=this.ces.replace('月','/');
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
	.wai{
		width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
		background:black;
	
        @extend .reset;
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
		// padding-top:94upx;
		width:100%;
        min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.wuzhuan{
		position: absolute;
		width: 80upx;
		height:80upx;
		top:0upx;
		right:0upx;

		z-index:10
	}
	.tancg{
		width:499upx;
		@extend .reset;
		margin:0 auto;
		margin-top: -128upx;
		position: relative;
		align-self: center;
	}
	.suc{
		width:100%
	}
	.aoli{
		height:210upx;
	}
</style>
