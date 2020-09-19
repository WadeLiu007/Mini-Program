//Page Object
Page({
  data: {
    collect:[],
    tabs: [{
      id: 0,
      value: '商品收藏',
      isActive: true
    }, {
      id: 1,
      value: '品牌收藏',
      isActive: false
    }, {
      id: 2,
      value: '店铺收藏',
      isActive: false
    }, {
      id: 3,
      value: '浏览足迹',
      isActive: false
    }],
  },
 
  onShow(){
    const collect = wx.getStorageSync('collect');
    this.setData({
      collect
    })
  },
  
  handleTabsItemChange(e) {
    // 1、获取被点击的标题索引
    let {
      index
    } = e.detail;

    let {
      tabs
    } = this.data;
    tabs.forEach((item, i) => {
      if (i === index) {
        item.isActive = true;
      } else {
        item.isActive = false
      }
    })

    this.setData({
      tabs
    })
  }
});