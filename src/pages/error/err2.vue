<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 18:31:55
 * @LastEditTime: 2019-08-22 17:59:52
 * @LastEditors: Please set LastEditors
 -->
<template>
	<view >

        <web-view :src="url" @message='getdata' @load='getstatus' @error='getr'></web-view>

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
          
            this.url=config.host2+'/consumer/common/debug.html?page=/audit/jinbawang/loading_jinbawang'
            
       

            console.log(this.url)
          

        },
        computed: {
            session(){
                return this.$store.state.index.session
            }
        },
        methods:{
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
            }
            
        },
        async onShow(){
            
		}
    }
</script>

<style scoped lang='scss'>
    @import "../../app.scss"; 
   
</style>