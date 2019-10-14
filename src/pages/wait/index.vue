<!--
 * @Description: In User Settings Edit
 * @Author: chenyang
 * @LastEditTime: 2019-08-22 18:01:04
 * @LastEditors: Please set LastEditors08 10:25:34
 * @LastEditors: Please set LastEditors
 -->
<template>
	<view class="mds" >
        
    </view>
</template>


<script>
    import {login_check,panduan,gup,login,lujing,lujing_bg} from '@/util/common.js'
    import uniPopup from '@/components/uni-popup/uni-popup.vue'
    import config from '../../config'
    export default {
        components: {uniPopup},
        data() {
            return {
                bg:lujing_bg('jin_bg.jpg'),  
                logo:lujing('o.png')                         
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
            },
            gets(scan_url){
                return new Promise(async (resolve,reject)=>{
					let data=await this.$WXR.post('/consumer/scanEntrance',{
						shortPath:scan_url,
					})
					resolve(data.data)
				})
            } 
        },
        async onLoad(e){    
                if(this.$store.state.index.haslogin==''){
               
                    await login(this)    
                }
                    
                if(!this.$store.state.index.iszhixing){
                    this.$store.commit('img_huan_storage',1)
                    this.$store.commit('iszhixing_storage',true)

                }
                
                if(this.$store.state.index.haslogin || this.$store.state.index.shouquan_phone!=''){
                    console.log(2)
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

    //         let cishu= uni.getStorageSync('cishu_2');
    //         if(cishu==''){
    //             uni.setStorageSync('cishu_2', '1');
    //         }
                
           
    //         e.q='http://deva.mcodesaas.cn/Qb2q2uXAAI'
    //         if(e.q!=undefined){
            
    // 　　        let scan_url = decodeURIComponent(e.q);

    //             let platform_s=await this.gets(scan_url)
    //             let nn = gup('s', platform_s);
                
    //             this.$store.commit('platform_s_storage', nn);
                
    //             let islogin=await login(this)

    //             if(islogin){
                    
                    
    //                 uni.navigateTo({
    //                     url:'/pages/jin_index/index'
    //                 })
    //             }else{
    //                 uni.navigateTo({
    //                     url:'/pages/login/phone'
    //                 })
    //             }
            
    //         }else{
    //             uni.navigateTo({
    //                 url: '/pages/error/err2'
    //             })
    //         }
           
        },
        async onShow(){
           
        }
    }
</script>

<style scoped lang='scss'>
    @import "../../app.scss"; 
    .cheng{
        height: 400upx;
    }
    .mds{
        width:100%;
        min-height: 100vh;
        background-repeat:   no-repeat;
        background-size: 100% 100%;
        position: relative;
        background: black;
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
        
        // display: block;
    }

    .jg{
        height:103upx ;
    }
    .zjm{
        width: 600upx;
    }
    .ma{
        position: absolute;
        width: 300upx;
        top:187upx;
        left:50%;
        margin-left: -150upx;
    }
   
    // official-account{
    //     // width: 300upx;
    //     // height: 300upx;
    //     // display: block;
    //     // position: relative;
    //     // z-index:100
    // }
</style>