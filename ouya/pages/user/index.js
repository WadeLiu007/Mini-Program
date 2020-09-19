Page({
  data: {
    userinfo: {},
    // 被收藏的商品梳理;
    collectNums: 0
  },
  onShow() {
    // 从缓存中获取用户信息的值;
    let userinfo = wx.getStorageSync('userInfo');
    let collect = wx.getStorageSync('collect') || [];
    this.setData({
      userinfo,
      collectNums: collect.length
    })
  }
})