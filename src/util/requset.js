/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 15:22:28
 * @LastEditTime: 2019-08-22 09:52:50
 * @LastEditors: Please set LastEditors
 */
// 网络请求工具类
import  config from '../config'
import {sort,encryption,modal,cuowu} from '@/util/common.js'
import Vue from '../main.js'

class WXR{
    static getInstance(){
        if(!WXR.instance){
            WXR.instance=new WXR()
        }
        return WXR.instance
    }
    //get请求
    get(url,query){
        //排序
        return new Promise(async (resolve,reject)=>{
            try{
                query=await sort(query)
                //生产签名
                let sign=await encryption(query)

                //把签名加入参数
                query.sign=sign

                // uni.showLoading({
                //     title: '加载中',
                //     mask:true
                // });
            
                uni.request({
                    url: config.host+url,
                    data:query,
                    success: async (res) => {
                        // uni.hideLoading();
                        if(!res.data){
                            // uni.navigateTo({
                            //     url:'/pages/error/err2'
                            // })
                            resolve(res)
                        }
                        if(res.data.code==200){
                         
                            resolve(res.data)
                        }else{
                            // await cuowu(res)
                           
                            // if(res.data.msg){
                            //     modal(res.data.msg)   

                            // }
                            // uni.navigateTo({
                            //     url:'/pages/error/err2'
                            // })
                            resolve(res)
                        }
                    },
                    fail(res){
                        // uni.hideLoading();
                        // modal(res.errMsg)
                        // uni.navigateTo({
                        //     url:'/pages/error/err2'
                        // })
                        resolve(res)
                    }
                })
            }catch(err){
                
                resolve(err)
            }
        })
    }
  
    //post请求
    post(url,query,conttype='application/x-www-form-urlencoded'){
   
        return new Promise(async (resolve,reject)=>{
            try{
                if(Vue.$store.state.index.openid){
                    query.openId=Vue.$store.state.index.openid
                }
                
                query=await sort(query)
                //生产签名
                let sign=await encryption(query)

                //把签名加入参数
                query.sign=sign
                // uni.showLoading({
                //     title: '加载中',
                //     mask:true
                // });
                
              
                uni.request({
                    url: config.host+url, 
                    data:query,
                    header: {
                        'content-type': conttype
                    },
                    method:'POST',
                    success: async (res) => {
                        // uni.hideLoading();
                        // if(!res.data){
                        //     uni.navigateTo({
                        //         url:'/pages/error/err2'
                        //     })
                        //     resolve(res)
                        // }
                        if(res.data.code==200){
                       
                            resolve(res.data)
                            
                        }else{
                            // await cuowu(res)
                            // if(res.data.msg){
                            //     // modal(res.data.msg)   

                            // }
                            // uni.navigateTo({
                            //     url:'/pages/error/err2'
                            // })
                            resolve(res)
                        }
                    },
                    fail(res){
                        // uni.hideLoading();
                        // // modal(res.errMsg)
                        // uni.navigateTo({
                        //     url:'/pages/error/err2'
                        // })
                        resolve(res)
                    }
                })
             
            }catch(err){
                resolve(err)
            }
        })
    }


    
}
export default WXR.getInstance()
