<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 18:31:55
 * @LastEditTime: 2019-08-22 17:59:52
 * @LastEditors: Please set LastEditors
 -->
<template>
	<view >

        <web-view :src="url" @message='getdata' @load='getstatus'></web-view>
        <!-- <button @click='fj'>sasad</button> -->
        <!-- <button open-type="contact" class="service">去小程序客服</button> -->
    </view>
</template>


<script>
    import {login_check} from '@/util/common.js'
    import  config from '../../config'

 

    export default {
        data() {
            return {
                url:''
            }
        },
        onLoad(options){
          
            let xiba=this.$store.state.index.jinbawang


            let _this=this

            let latitude,longitude,loca

            if(xiba.location==''){
                latitude=''
                longitude=''
            }else{
                let loca=JSON.parse(xiba.location)
                latitude=loca.latitude
                longitude=loca.longitude
            }
            
            
            _this.url=config.host2+'/consumer/activity/getParameter.html?phone='+xiba.phone+'&latitude='+latitude+'&longitude='+longitude+'&s='+_this.$store.state.index.platform_s

            // setTimeout(function(){
            //     _this.url='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwODQyOTAyNA==&scene=124#wechat_redirect'
            // },2000)
         
            
        

            console.log(this.url)
          

        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
            fj(){
                // 允许从相机和相册扫码
                uni.scanCode({
                    success: function (res) {
                        console.log(res)
                        console.log('条码类型：' + res.scanType);
                        console.log('条码内容：' + res.result);
                    }
                });

            },
            getdata(e){
                
               
            },
            getstatus(){
             console.log('加载成功')
            },
            cuowu(e){
                console.log(e,99999)
            },
        },
        async onShow(){
            
		}
    }
</script>

<style scoped lang='scss'>
    @import "../../app.scss"; 
    
</style>