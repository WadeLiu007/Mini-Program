/*1. 从缓存中获取购物车选择为true的值 */
import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    // 1.获取缓存中的地址;
    let address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    
    // 过滤购物车中选择为true的;
    cart = cart.filter(item => item.checked);


    // 计算总价格和总数量：
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
        totalNum += item.num;
        totalPrice += item.num * item.goods_price;
    })

    this.setData({
      cart,
      address,
      totalPrice,
      totalNum
    });
  }

})