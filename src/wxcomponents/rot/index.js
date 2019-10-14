let index = 0,
  items = [], flag=true,
  itemId=1;
Component({
  properties: {
    biaourl: {
      type: String,
    
      observer (newVal, oldVal) {
          console.log(newVal,222222)
          items= this.data.itemList;
          // this.setDropItem();
          this.setDropItem({
            url: newVal
          });
      }
    },
    ko: {
      type: String,
    
      observer (newVal, oldVal) {
        this.setData({
          kos: newVal
        })
      }
    },
    jjowid:{
      type: String,
    
      observer (newVal, oldVal) {
       
      }
    },
    jjohei:{
      type: String,
    
      observer (newVal, oldVal) {
       
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    kos:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  ready: function(options) {

   
  },
  methods: {
    setDropItem(imgData) {
      let data = {},
        _this = this;
      wx.getImageInfo({
        src: imgData.url,
        success: res => {
          res.width=100
          res.height=119
          // 初始化数据
          data.width = res.width;//宽度
          data.height = res.height;//高度
          data.image = imgData.url;//地址
          data.id = ++itemId;//id
          // data.top = 0;//top定位
          // data.left = 0;//left定位
          data.top = 154;//top定位
          data.left = 30;//left定位
          //圆心坐标
          data.x = data.left + data.width / 2;
          data.y = data.top + data.height/2;
          
          data.scale = 1;//scale缩放
          data.oScale = 1;//方向缩放
          data.rotate = 1;//旋转角度
          data.angle = -30;//旋转角度
        
          data.active = false;//选中状态
          console.log(data)
          items[items.length] = data;
          _this.setData({
            itemList: items
          })
         _this.triggerEvent('addInfo',_this.data.itemList)
        }
      })
    },
    WraptouchStart: function (e) {
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
        if (e.currentTarget.dataset.id == items[i].id) {
          index = i;
          items[index].active = true;
        }
      }
      this.setData({
        itemList: items
      })
      this.triggerEvent('addInfo',this.data.itemList)
      items[index].lx = e.touches[0].clientX-this.data.jjowid;
      items[index].ly = e.touches[0].clientY-this.data.jjohei;
  
      console.log(items[index])
    },
    WraptouchMove: function(e) {
      if (flag) {
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 100)
      }
      // console.log('WraptouchMove', e)
      items[index]._lx = e.touches[0].clientX-this.data.jjowid;
      items[index]._ly = e.touches[0].clientY-this.data.jjohei
  
      items[index].left += items[index]._lx - items[index].lx;
      items[index].top += items[index]._ly - items[index].ly;
      items[index].x += items[index]._lx - items[index].lx;
      items[index].y += items[index]._ly - items[index].ly;
  
      items[index].lx = e.touches[0].clientX-this.data.jjowid;
      items[index].ly = e.touches[0].clientY-this.data.jjohei;
      console.log(items)
      this.setData({
        itemList: items
      })
      this.triggerEvent('addInfo',this.data.itemList)
    },
    oTouchStart: function (e) {
      
      //找到点击的那个图片对象，并记录
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
        if (e.currentTarget.dataset.id == items[i].id) {
          console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
          index = i;
          items[index].active = true;
        }
      }
      //获取作为移动前角度的坐标
      items[index].tx = e.touches[0].clientX-this.data.jjowid;
      items[index].ty = e.touches[0].clientY-this.data.jjohei;
      //移动前的角度
      items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)
  
      //获取图片半径
      items[index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top);
      console.log(items[index])
    }
    ,
    oTouchMove: function (e) {
      if (flag) {
        flag = false;
        setTimeout(()=>{
          flag= true;
        },100)
      }
      //记录移动后的位置
      items[index]._tx = e.touches[0].clientX-this.data.jjowid;
      items[index]._ty = e.touches[0].clientY-this.data.jjohei;
      //移动的点到圆心的距离
      items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx , items[index]._ty - 10)
  
      items[index].scale = items[index].disPtoO / items[index].r; 
      items[index].oScale = 1 / items[index].scale;
  
      //移动后位置的角度
      items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
      //角度差
      items[index].new_rotate = items[index].angleNext - items[index].anglePre;
  
      //叠加的角度差
      items[index].rotate += items[index].new_rotate;
      items[index].angle = items[index].rotate; //赋值
  
      //用过移动后的坐标赋值为移动前坐标
      items[index].tx = e.touches[0].clientX-this.data.jjowid;
      items[index].ty = e.touches[0].clientY-this.data.jjohei;
      items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)
  
      //赋值setData渲染
      this.setData({
        itemList: items
      })
      this.triggerEvent('addInfo',this.data.itemList)
    },
    getDistancs(cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      return Math.sqrt(
        ox * ox + oy * oy
      );
    },
    /*
       *参数1和2为图片圆心坐标
       *参数3和4为手点击的坐标
       *返回值为手点击的坐标到圆心的角度
       */
    countDeg: function (cx, cy, pointer_x, pointer_y) {
      var ox = pointer_x - cx;
      var oy = pointer_y - cy;
      var to = Math.abs(ox / oy);
      var angle = Math.atan(to) / (2 * Math.PI) * 360;
      // console.log("ox.oy:", ox, oy)
      if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
      {
        angle = -angle;
      } else if (ox <= 0 && oy >= 0)//左下角,3象限  
      {
        angle = -(180 - angle)
      } else if (ox > 0 && oy < 0)//右上角，1象限  
      {
        angle = angle;
      } else if (ox > 0 && oy > 0)//右下角，2象限  
      {
        angle = 180 - angle;
      }
      return angle;
    },
 
    WraptouchEnd(){
      console.log(this.data.itemList,'结束')
      this.triggerEvent('addInfo',this.data.itemList)//通过triggerEvent将参数传给父组件



    }

  }
  
})