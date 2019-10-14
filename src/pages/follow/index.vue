<template>
	<view class="mds">
        <div class="cheng"></div>

        
        
        <uni-popup ref="popup" type="center" custom="true" :maskClick=false>
	
            <official-account @load='offiload' @error='offierror'></official-account>
		</uni-popup>

        <!-- <view class="gbox">
            <image class="masyou" src="../../static/yibeisao.png" mode="widthFix"></image>
        </view>
      -->
        <!-- <official-account @load='offiload' @error='offierror'></official-account> -->
        <!-- <view class="jg"></view> -->
    </view>
</template>


<script>
    import {login_check,panduan} from '@/util/common.js'
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    export default {
        components: {uniPopup},
        data() {
            return {
                isjiazai:0
            }
        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
            offiload(rev){
                console.log('加载成功')
                console.log(rev)
              
            },
            offierror(rev){
                console.log('加载失败')
                console.log(rev)
            },
            tiao(urls){
                uni.navigateTo({
                    url: urls
                });
            },
            previewImage(){
                uni.previewImage({
                    current: 0,//需要预览的图片链接列表
                    urls: ['https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHl8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyWkVTTkVueWhjNjExMDAwMDAwM0gAAgQRdvdcAwQAAAAA']  //当前显示图片的链接
                })
            }
             
        },
        async onShow(){
			//检查是否已经登录
         	// await login_check(this)
                    
			this.$refs.popup.open()
            

            if(this.isjiazai==1){
      
                uni.navigateTo({
                    url:'/pages/wait/index'
                })
                
                this.isjiazai=0
            }
            
         

        },

        onHide(){
            this.isjiazai=1
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../app.scss"; 
    .cheng{
        height: 1344upx;
    }
    .mds{
        width:100%;
        min-height: 100vh;
        background: url('http://res.mcodesaas.cn/images/cjbg.png')  no-repeat;
        background-size: 100% 100%;
        position: relative;
        border-top:0.01upx solid yellow;
        @extend .reset;    
    }
    .gbox{
        margin: 0 auto;
        margin-top:567upx;
        width: 533upx;
        position: relative;
    }
    .masyou{
        width: 100%;
        display: block;
    }

    .jg{
        height:103upx ;
    }

    .ma{
        position: absolute;
        width: 300upx;
        top:187upx;
        left:50%;
        margin-left: -150upx;
    }
    official-account{
        width: 100vw;
        height: 100vh;
        // display: block;
        // position: relative;
        // z-index:100
        opacity: 0;
    }
</style>