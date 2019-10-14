
<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
        <!-- <video :object-fit='fill'    :enable-progress-gesture=false :autoplay=true :controls=false :class="tpvss" :show-center-play-btn=false @timeupdate='timeupdate'  :poster="poster" :style="{opacity:v1opa}"   id="myVideo" :src="video" :initial-time=initial ></video> -->
        
        
        <view class="wb">
            <image class="sm" :src="sm" mode="widthFix" alt="" srcset=""></image>
        
            <view :class="shanl">
                <image v-show='!issao' @longtap='sao'  class="chan " :src="chan" mode="widthFix" alt="" srcset=""></image>
               
                <image  v-show='issao' class="chan " :src="beisao" mode="widthFix" alt="" srcset=""></image>
                
            </view>
    
         
           
        </view> 
         <tui-modal :show="modal8"  :custom="true">
                <view class="tui-modal-custom">
                    <view class="tui-modal-custom-text">提示</view>
                    <view class="tui-modal-custom-text xy">需要获取您的手机号</view>
                    <view class="cc"></view>
                    <button  class="fuchan "  hover-class="stream-effect"  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确定</button>
                </view>
        </tui-modal>
        <dix :imgurl='xiba' />
        <w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
    </view>
   
</template>


<script>
    import {lujing,modal,lujing_bg,login} from '@/util/common.js'
    import  config from '../../config'
    import dix from "../../components/dix.vue";

    import tuiModal from "../../components/modal.vue"
    export default {
        components:{ 'dix':dix ,'tui-modal':tuiModal},
        data() {
            return {
                issao:false,
                tpvss:'tpvdd',
                video:config.jingtai_url+'mmp.mp4',
                bg:lujing_bg('rtrt.gif'),
                xiba:config.jingtai_url+'ddd_02.png',

                sm:config.jingtai_url+'yivi.gif',

                chan:config.jingtai_url+'chan.png',
                beisao:config.jingtai_url+'zhiw2.gif',
                modal8:false,

                shanl:'chan_bo',
                videoplay:'',

                mmp:config.jingtai_url+'td.gif',
            }
        },
        async onLoad(options){
          
            if(!this.$store.state.index.isbgm){
                let innerAudioContext = uni.createInnerAudioContext();
                innerAudioContext.src = config.jingtai_url+'bgm.mp3',
                innerAudioContext.autoplay = true
                innerAudioContext.loop = true

                this.$store.commit('isbgm_storage',true)
                
                this.$store.commit('innerAudioContext_storage',innerAudioContext)
            }
            


         

         
            // this.videoplay=wx.createVideoContext('myVideo')
            // console.log(wx.getSystemInfoSync().screenHeight/wx.getSystemInfoSync().screenWidth)
            // if(wx.getSystemInfoSync().screenHeight/wx.getSystemInfoSync().screenWidth>2){
            //     this.tpvss='tpvss'
            // }

        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
            timeupdate(e){
				if(e.detail.currentTime>4.7){
                    this.videoplay.pause()
				}
			
				console.log('播放到',e.detail.currentTime)
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
                let phone=JSON.stringify(e.detail)
                console.log(phone,'333333333')

                if(phone.indexOf('ok')!=-1){
                    let info=await this.$WXR.post('/consumer/decryptPhone',{
                        phone,
                        sessionKey:this.$store.state.index.session
                    })        
                    
                    this.$store.commit('shouquan_phone_storage',info.data);
                    
                     uni.showLoading({
                    
                        mask:true
                    });
                    let _this=this
                    let t=setInterval(function(){
                        if(_this.$store.state.index.tuan_jieshu){
                            clearInterval(t) 
                            uni.hideLoading()
                        
                            uni.redirectTo({
                                url:'/pages/dna_test/tuan_zy'
                            })
                        }
                    },250)
                }else{
                    uni.showToast({
						title: '请重新授权手机号',
						icon: "none"
					});
                }
               
              
                // if(phone.indexOf("fail") != -1){
                //     phone=''
                // }
                
             
                
                // uni.navigateTo({
                //     url:'/pages/jin_index/index'
                // })
               
            },
            
            sao(){
                
                // this.shanl='chan_bo logo-brand'
                // this.chan=config.jingtai_url+'sao.gif'
                this.issao=true
                let _this=this
                setTimeout(function(){
                    _this.modal8= true
                    // _this.shanl='chan_bo'
                    // _this.chan=config.jingtai_url+'chan.png'
                    _this.issao=false
                },1500)
			

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
        background-size: 100% 96%;
        position: relative;
        @extend .reset;
	}
    .mmp{
        width: 100%;
        height:100%
    }
    .wb{
        @extend .reset;
        width:100%;
        padding-top: 139upx;
        padding-bottom: 269upx;
        position: absolute;
        top:50%;
		margin-top: -603upx;
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

    .tpvdd{
        width: 100%;
        height: 115%;
        position: absolute;
        left: 0;
        top: -214rpx;
    }
    .tpvss{


		width: 100%;
		height: 100%;
		@extend .reset;
		position: absolute;
		left: 0;
		top: 0;
	

    }
   
    .logo-brand{position: relative; overflow: hidden;}
    .logo-brand:before {content: "";position: absolute; width: 330px; height: 70px;  background-color: rgba(255, 255, 255, 0.5); -webkit-transform: rotate(60deg);  transform: rotate(60deg); left: -100px; -webkit-animation: blink 1.5s infinite both; animation: blink 1.5s infinite both;}
    @-webkit-keyframes blink {from {left: -300px;top: 0;} to {left: 330px;top: 0;}}
    @-o-keyframes blink {from {left: -300px;top: 0;} to {left: 330px;top: 0;}}
    @-moz-keyframes blink {from {left: -300px;top: 0;} to {left: 330px;top: 0;}}
    @keyframes blink {from {left: -300px;top: 0;}to {left: 330px;top: 0;}}
</style>