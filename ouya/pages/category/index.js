import {
  request
} from '../../request/index'
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex:0,
    scrollTop:0
  },
  Cates: [],

  onLoad: function (options) {
    /* 
      1.先判断一下本地存储中有没有旧的数据{time:Date.now(),data:[...]}
      2.没有旧数据 直接发送新的请求;
      3.有旧数据并且旧数据没有过期就使用本地存储的旧数据即可;
    */

    // 当页面挂载时验证本地存储是否有旧的数据;
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      // 如果没有获取到存储的旧数据,就执行请求接口的函数;
      this.getCates();
    }else{
      // 判断时间是否有过期 暂定五分钟;
      if(Date.now()-Cates.time>1000*10*300){
        // 超过五分钟就重新请求
        this.getCates()
      }else{
        // 使用旧数据;
        // 先获取旧数据,并渲染左右两侧列表;
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(item => {
          return item.cat_name
        })
        
        let rightContent = this.Cates[0].children
        
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  getCates() {
    request({
        url: '/categories'  
      })
      .then(result => {
        this.Cates = result.data.message;
        // console.log(this.Cates);
        // 当请求到数据时,就存储到本地存储中;
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})

        // 接收左侧的菜单栏
        let leftMenuList = this.Cates.map(item => {
          return item.cat_name
        })
        
        let rightContent = this.Cates[0].children
        
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },

  handleItemTap(e){
    //1. 获取对应左侧列表菜单的索引;
    //2. 将其赋值给currentIndex;
    //3. 渲染对应索引的内容; 
    let {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children

    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置scroll-view标签的到顶部的高度为0;
      scrollTop:0
    })
  }
});