<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 18:31:55
 * @LastEditTime: 2019-08-22 17:59:52
 * @LastEditors: Please set LastEditors
 -->
<template>


    <view class="difb">
        <image class="difix" :src="imgurl" mode="widthFix" alt="" srcset=""></image>

        <view class="yy ind" @tap='ti("/pages/mon_index/index")'></view>
        <view class="yy test" @tap='zhiwen()'></view>
        <view class="yy yu" @tap='yuyue()'></view>
         <w-loading text="加载中.." mask="true" click="true" ref="loading"></w-loading>
    </view>
        

  
</template>


<script>
    import {login_check,login} from '@/util/common.js'
    import  config from '../config'
    

    export default {
        props:['imgurl'],
        data() {
            return {
               
            }
        },
        onLoad(options){
   
          

        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
            async zhiwen(){
              
                if(this.$store.state.index.haslogin || this.$store.state.index.shouquan_phone!=''){
                   
                    uni.showLoading({
                    
                        mask:true
                    });
                    let _this=this
                    let t=setInterval(function(){
                        if(_this.$store.state.index.tuan_jieshu){
                            clearInterval(t) 
                            uni.hideLoading()
                        
                            uni.reLaunch({
                                url:'/pages/dna_test/tuan_zy'
                            })
                        }
                    },100)

                }else{
                    uni.reLaunch({
                        url:'/pages/dna_test/index'
                    })
                }

            },
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
                        uni.reLaunch({
                            url:'/pages/yuyue/tianxie'
                        })
                    }
                },250)
               
                
            },
            ti(path){
                uni.reLaunch({
                    url:path
                })
            }
        },
        async onShow(){
            
		}
    }
</script>

<style scoped lang='scss'>
    @import "../app.scss"; 
    .difix{
        width: 100%;
         @extend .reset;
    }
    .difb{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 20;

    }
    .yy{
        position: absolute;
        width: 69upx;
        height: 75upx;
      
        top: 59upx;

    }
    .ind{
        left: 138upx;
    }
    .test{
        left: 341upx;
    }
    .yu{
        right: 138upx;
    }
</style>