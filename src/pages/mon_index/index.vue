
<template>
	<view class="wai" :style="{backgroundImage:bg}"> 
         
        

        <view class='video-play'>
            <video @play='plays' @pause='pauses' class="tpv" :show-center-play-btn=false :object-fit='cover' :controls=iscon  id="myVideo" :src="videourl" :poster="poster" @ended='jies'></video>
          
            <image v-show='dif'  @tap="videoPlay" class='video-btn' :src='ks'/>
           
        </view>


        <image class="mng" :src="mng" mode="widthFix" alt="" srcset=""></image>

        <view class="swb">
            <swiper class="b5" :indicator-dots=false :circular="true"
            :autoplay="false"  interval="5000" duration="500" indicator-color='rgba(3,3,3,1)' indicator-active-color='#c2c2c2' @change="change" :easing-function='easeInCubic'>
                <swiper-item v-for="(item,index) in swiperList" :key="index">
                    <image class="mf" :src="item.url" mode="widthFix" v-if="item.type=='image'"></image>
                </swiper-item>
            
            </swiper>
            <view class="zs_box" v-if='ss'>
                <view  v-for="(val,key) in arr" :key='key' :class="val" ></view>

            </view>

        </view>
        
        <view class="pinbox">
            <image class="mng" :src="pinjian" mode="widthFix" alt="" srcset=""></image>
            <view class="xianfeng" @tap='yuyue()'></view>
            <view class="shidai" @tap='ti("/pages/dna_test/xuanb")'></view>
        </view>
        
        <view class="bot"></view>
        
         <w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
        <dix :imgurl='xiba' />
    </view>
   
</template>


<script>
    import {lujing,lujing_bg,login} from '@/util/common.js'
    import  config from '../../config'
  
    import dix from "../../components/dix.vue";
    export default {
        components:{ 'dix':dix },
        data() {
            return {
                iscon:false,
                bg:lujing_bg('xx.jpg'), 
                videourl:config.jingtai_url+'topvideo.mp4',
                poster: config.jingtai_url+'sp_02.jpg',
                mng:config.jingtai_url+'mng.jpg',
                swiperList: [{
					id: 0,
					type: 'image',
					url: config.jingtai_url+'biao1.jpg',
				}, {
					id: 1,
					type: 'image',
					url: config.jingtai_url+'biao2.jpg'
				}, {
					id: 2,
					type: 'image',
					url: config.jingtai_url+'biao3.jpg'
				}, {
					id: 3,
					type: 'image',
					url: config.jingtai_url+'biao4.jpg'
				}, {
					id: 4,
					type: 'image',
					url: config.jingtai_url+'biao5.jpg'
                }],
                pinjian:config.jingtai_url+'pinjian.jpg',
        
                arr:['zd active','zd','zd','zd','zd'],
                ss:true,
                dif:true,
                xiba:config.jingtai_url+'difix.png',
                ks:config.jingtai_url+'play.png',
            }
        },
        async onLoad(options){
          
          
        },
        async onShow(){
            
        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
            async yuyue(){
              
                uni.showLoading({
                    
                        mask:true
                    });
                let _this=this
                let t=setInterval(async function(){
                    if(_this.$store.state.index.openid){
                        clearInterval(t) 
                        uni.hideLoading()
                        
                        let info=await _this.$WXR.post('/consumer/getAppointmentInfo',{})  
                        if(info.data && info.data.id){
                            //预约过了
                            _this.$store.commit('yuyueinfo_storage',info.data);
                        
                        }
                        uni.navigateTo({
                            url:'/pages/yuyue/tianxie'
                        })
                    }
                },250)
               
                
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
            change(e){
          
                this.ss=false
                this.arr.forEach((item,i)=>{
                    if(i==e.detail.current){
                        console.log(i,'i')
                     
                        this.arr[i]='zd active'
                    
                        this.ss=true
                    }else{
                        this.arr[i]='zd'
                    }
                })
            },
            videoPlay() {
                console.log('开始播放')
                
                var videoplay = wx.createVideoContext('myVideo')
                videoplay.play()
               
            },
            plays(){
                this.dif=false
                this.iscon=true
            },
            pauses(){
                this.dif=true
                this.iscon=false
            },
            ti(path){
                if(path=='/pages/dna_test/xuanb'){
                    uni.showLoading({
                    
                        mask:true
                    });
                  
                    let _this=this
                    let t=setInterval(function(){
                        if(_this.$store.state.index.sd_jieshu){
                
                            clearInterval(t) 
                            uni.hideLoading()
                            uni.navigateTo({
                                url:path
                            })    
                        }
                    },250)
                }else{
                    uni.navigateTo({
                        url:path

                    })
                }
              
   
            }
        },
        async onShow(){
            // 获取全局跟踪器
            var t = getApp().globalData.getTracker();

            // 后续的所有匹配数据都会使用这个屏幕名称。
            t.setScreenName('这是首页');

            // t.send(Hit) 上报数据 
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
        @extend .reset;
	}
    
    .tpv{
        width:100%;
        height:427upx;
       
        @extend .reset;
    }

    .mng{
        width: 100%;
        @extend .reset;
    }

    .b5{
        width: 100%;
        height: 1137upx;
        position: relative;
        @extend .reset;
        .swiper-item{
            width: 100%;
           
        }
    }
    .mf{
        width: 100%;
    }
    .zs_box{
        width: 167upx;
    
        position: absolute;
        left: 50%;
        bottom:0;
        margin-left: -83.5upx;
      
        display: flex;
        justify-content: space-between;
        padding:  26upx 0;
    }
    .zd{
        width: 16upx;
        height: 16upx;
        border-radius: 16upx;
        @extend .reset;
        border: 0.05upx solid #c2c2c2;
        background: rgb(3,3,3);
        align-self:center;
    }
    .zd.active{
        background:#c2c2c2
    }
    .swb{
        position: relative
    }
    .video-play{
        position: relative;
    }
    .video-btn{
        position: absolute;
        width: 90upx;
        height: 90upx;
        top:50%;
        left: 50%;
        margin-left: -45upx;
        margin-top: -45upx;
    }
    
    .bot{
        height: 126upx;
    }
    .pinbox{
        position: relative;
    }
    .shidai{
       position: absolute;
        width: 171upx;
        height: 33upx;
        top:30upx;
        right: 75upx;

    }
    .xianfeng{
        position: absolute;
        width: 171upx;
        height: 33upx;
        top:30upx;
      
        left: 75upx;
    }
   
</style>