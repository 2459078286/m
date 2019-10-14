/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 15:22:28
 * @LastEditTime: 2019-08-20 10:18:04
 * @LastEditors: Please set LastEditors
 */
import config from '../config'
import {xiazai,jsontostring2} from '@/util/common.js'

const indexstore = {
    state:{
        img_huan:{
            watch1:'',
            watch2:'',
            watch3:'',
            watch4:'',
            watch5:'',

            dp1:'',
            dp2:'',
            dp3:'',
            dp4:'',
            dp5:'',
            ggm:'',
            
            tuan_video:'',
            fengmian:'',
            
            c1_zhen:'',
            c2_zhen:'',
            c3_zhen:'',
            c4_zhen:'',
            c5_zhen:'',
            
            c1_pan:'',
            c2_pan:'',
            c3_pan:'',
            c4_pan:'',
            c5_pan:'',
           
            c1_bg:'',
            c2_bg:'',
            c3_bg:'',
            c4_bg:'',
            c5_bg:'',
          
            music1:'',
            music2:'',
            music3:'',
            music4:'',
            music5:'',

            che1:'',
            che2:'',
            che3:'',
            che4:'',
            che5:'',

            datavideo:''
        },
        session:'',
        openid:'',
        userinfo:'',
        isjiazai:0,
        giftinfo:'',
        datastr:'',
        platform_s:'',
        jinbawang:{
            phone:'',
            location:''
        },
        jinbawang_url:'',
        sd_url:'',
        canwid:'',
        canhei:'',
        jiaowid:'',
        jiaohei:'',
        jjowid:'',
        jjohei:'',
        sheng:'',
        xuanz_n:'',
        sign_url:'',
        ziyuan:'',
        iszhixing:false,
     
        iszhixing:false,
        test_go:{
            tuan_test:'',
            music_test:'',
            she_test:'',
            che_test:'',
        },
        jieguo_dom:'',
        jieguo_dp:'',
        
        sd_jieshu:false,
        tuan_jieshu:false,
        music_jieshu:false,
        che_jieshu:false,
        data_jieshu:false,
        share_jieshu:false,
        haslogin:'',
        rand:Math.floor(Math.random()*5 + 1),
        yuyueinfo:'',
        tianxieinfo:'',

        shouquan_phone:'',

        yanzhneg:'',

        isbgm:false,

        innerAudioContext:''
    },
    mutations:{ //添加mutations
        async img_huan_storage(state, data ) {
          

      
            
            
            state.img_huan.fengmian=config.jingtai_url+'tu1.jpg'
            state.img_huan.tuan_video=config.jingtai_url+'xs4.mp4'
            
            state.img_huan.tuan_video_dao=config.jingtai_url+'dao.mp4'
            let ss=wx.getSystemInfoSync()

            if(ss.platform == "ios"){
                state.img_huan.fengmian=await xiazai(config.jingtai_url+'tu1.jpg')
            }
            // if(ss.platform == "android"){
                
                state.img_huan.tuan_video=await xiazai(config.jingtai_url+'xs4.mp4')
                state.img_huan.tuan_video_dao=await xiazai(config.jingtai_url+'dao.mp4')
            // }
            
            state.tuan_jieshu=true;

            state.img_huan.watch1=await xiazai(config.jingtai_url+'watch1.png')
            state.img_huan.watch2=await xiazai(config.jingtai_url+'watch2.png')
            state.img_huan.watch3=await xiazai(config.jingtai_url+'watch3.png')
            state.img_huan.watch4=await xiazai(config.jingtai_url+'watch4.png')
            state.img_huan.watch5=await xiazai(config.jingtai_url+'watch5.png')
            state.img_huan.qr_save=await xiazai(config.jingtai_url+'qr_save.png')
            state.sd_jieshu=true;  

            state.img_huan.music1=await xiazai(config.jingtai_url+'70.mp3')
            state.img_huan.music2=await xiazai(config.jingtai_url+'80.mp3')
            state.img_huan.music3=await xiazai(config.jingtai_url+'90.mp3')
            state.img_huan.music4=await xiazai(config.jingtai_url+'00.mp3')
            state.img_huan.music5=await xiazai(config.jingtai_url+'10.mp3')

            state.img_huan.c1_zhen=await xiazai(config.jingtai_url+'c1_zhen.png')
            state.img_huan.c2_zhen=await xiazai(config.jingtai_url+'c2_zhen.png')
            state.img_huan.c3_zhen=await xiazai(config.jingtai_url+'c3_zhen.png')
            state.img_huan.c4_zhen=await xiazai(config.jingtai_url+'c4_zhen.png')
            state.img_huan.c5_zhen=await xiazai(config.jingtai_url+'c5_zhen.png')

            // state.img_huan.c2_zhen=config.jingtai_url+'c2_zhen.png'
            // state.img_huan.c3_zhen=config.jingtai_url+'c3_zhen.png'
            // state.img_huan.c4_zhen=config.jingtai_url+'c4_zhen.png'
            // state.img_huan.c5_zhen=config.jingtai_url+'c5_zhen.png'
     

            state.img_huan.c1_pan=await xiazai(config.jingtai_url+'c1_pan.png')
            state.img_huan.c2_pan=await xiazai(config.jingtai_url+'c2_pan.png')
            state.img_huan.c3_pan=await xiazai(config.jingtai_url+'c3_pan.png')
            state.img_huan.c4_pan=await xiazai(config.jingtai_url+'c4_pan.png')
            state.img_huan.c5_pan=await xiazai(config.jingtai_url+'c5_pan.png')

            // state.img_huan.c2_pan=config.jingtai_url+'c2_pan.png'
            // state.img_huan.c3_pan=config.jingtai_url+'c3_pan.png'
            // state.img_huan.c4_pan=config.jingtai_url+'c4_pan.png'
            // state.img_huan.c5_pan=config.jingtai_url+'c5_pan.png'


            state.img_huan.c1_bg=await xiazai(config.jingtai_url+'c1_bg.jpg')
            state.img_huan.c2_bg=await xiazai(config.jingtai_url+'c2_bg.jpg')
            state.img_huan.c3_bg=await xiazai(config.jingtai_url+'c3_bg.jpg')
            state.img_huan.c4_bg=await xiazai(config.jingtai_url+'c4_bg.jpg')
            state.img_huan.c5_bg=await xiazai(config.jingtai_url+'c5_bg.jpg')
            // state.img_huan.c2_bg=config.jingtai_url+'c2_bg.jpg'
            // state.img_huan.c3_bg=config.jingtai_url+'c3_bg.jpg'
            // state.img_huan.c4_bg=config.jingtai_url+'c4_bg.jpg'
            // state.img_huan.c5_bg=config.jingtai_url+'c5_bg.jpg'
      
            
            

            // state.img_huan.music2=config.jingtai_url+'music2.aac'
            // state.img_huan.music3=config.jingtai_url+'music3.aac'
            // state.img_huan.music4=config.jingtai_url+'music4.aac'
            // state.img_huan.music5=config.jingtai_url+'music5.aac'
         
            state.music_jieshu=true; 


            state.img_huan.che1=await xiazai(config.jingtai_url+'70s.mp4')
            state.img_huan.che2=await xiazai(config.jingtai_url+'80s.mp4')
            state.img_huan.che3=await xiazai(config.jingtai_url+'90s.mp4')
            state.img_huan.che4=await xiazai(config.jingtai_url+'00s.mp4')
            state.img_huan.che5=await xiazai(config.jingtai_url+'10s.mp4')

            
            
            state.che_jieshu=true;

            state.img_huan.datavideo=await xiazai(config.jingtai_url+'shn.mp4')

            state.data_jieshu=true; 
           
            state.img_huan.dp1=await xiazai(config.jingtai_url+'dp1.jpg')
            state.img_huan.dp2=await xiazai(config.jingtai_url+'dp2.jpg')
            state.img_huan.dp3=await xiazai(config.jingtai_url+'dp3.jpg')
            state.img_huan.dp4=await xiazai(config.jingtai_url+'dp4.jpg')
            state.img_huan.dp5=await xiazai(config.jingtai_url+'dp5.jpg')
         
            state.img_huan.ggm=await xiazai(config.jingtai_url+'ggm.jpg')
         
            state.share_jieshu=true; 
            // state.img_huan={
            //     watch1:await xiazai(config.jingtai_url+'watch1.gif'),
            //     watch2:await xiazai(config.jingtai_url+'watch2.gif'),
            //     watch3:await xiazai(config.jingtai_url+'watch3.gif'),
            //     watch4:await xiazai(config.jingtai_url+'watch4.gif'),
            //     watch5:await xiazai(config.jingtai_url+'watch5.gif'),
            //     tuan_video:await xiazai(config.jingtai_url+'test1.mp4',true),
            

            //     dp1:await xiazai(config.jingtai_url+'dp1.jpg'),   //菊花背景
            //     dp2:await xiazai(config.jingtai_url+'dp2.jpg'),   //菊花背景
            //     dp3:await xiazai(config.jingtai_url+'dp3.jpg'),   //菊花背景
            //     dp4:await xiazai(config.jingtai_url+'dp4.jpg'),   //菊花背景
            //     dp5:await xiazai(config.jingtai_url+'dp5.jpg'),   //菊花背景
           
              
            //     ggm:await xiazai(config.jingtai_url+'ggm.jpg'), //菊花妈

            //     music1:await xiazai(config.jingtai_url+'music1.aac'),
            //     music2:await xiazai(config.jingtai_url+'music2.aac'),
            //     music3:await xiazai(config.jingtai_url+'music3.aac'),
            //     music4:await xiazai(config.jingtai_url+'music4.aac'),
            //     music5:await xiazai(config.jingtai_url+'music5.aac'),
            // }
           
        },
        session_storage(state, data ) {
            state.session=data
        },
        openid_storage(state, data ) {
            state.openid=data
        },
        userinfo_storage(state, data ) {
            state.userinfo=data
        },
        isjiazai_storage(state, data ) {
            state.isjiazai=data
        },
        giftinfo_storage(state, data ) {
            state.giftinfo=data
        },
        datastr_storage(state, data ) {
            state.datastr=data
        },
        platform_s_storage(state, data ){
            state.platform_s=data
        },
        jinbawang_phone_storage(state, data ){
            state.jinbawang.phone=data
        },
        jinbawang_location_storage(state, data ){
            state.jinbawang.location=data
        },
        jinbawang_url_storage(state, data ){
            state.jinbawang_url=data
        },
        sd_url_storage(state, data ){
            state.sd_url=data
        },
        canwid_storage(state, data ){
            state.canwid=data
        },
        canhei_storage(state, data ){
            state.canhei=data
        },
        jiaowid_storage(state, data ){
            state.jiaowid=data
        },
        jiaohei_storage(state, data ){
            state.jiaohei=data
        },
        jjowid_storage(state, data ){
            state.jjowid=data
        },
        jjohei_storage(state, data ){
            state.jjohei=data
        }
        ,
        sheng_storage(state, data ){
            state.sheng=data
        },
        xuanz_n_storage(state, data ){
            state.xuanz_n=data
        },
        sign_url_storage(state, data ){
            state.sign_url=data
        },
        iszhixing_storage(state, data ){
            state.iszhixing=data
        },
        jieshu_storage(state, data ){
            state.jieshu=data
        },
        test_go_storage(state, data ){
            state.test_go=data

        },
        haslogin_storage(state, data ){
            state.haslogin=data
        },
        yuyueinfo_storage(state, data ){
            state.yuyueinfo=data
        },
        tianxieinfo_storage(state, data ){
            state.tianxieinfo=data
        },
        shouquan_phone_storage(state, data ){
            state.shouquan_phone=data
        },
        yanzhneg_storage(state, data ){
            state.yanzhneg=data
        },
        isbgm_storage(state, data ){
            state.isbgm=data
        },
        innerAudioContext_storage(state, data ){
            state.innerAudioContext=data
        },
    },
    actions:{ //添加actions
        
    }
}

module.exports= indexstore
