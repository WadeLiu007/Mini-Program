/*1. 从缓存中获取购物车选择为true的值 */
import {
  getSetting,
  chooseAddress,
  openSetting,
  requestPayment
} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from '../../request/index.js';

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
  },


  // 点击支付
  async handleOrderPay() {
    try {
      // 1.先判断缓存中是否有token值,如果有直接支付,如果没有跳转到授权页面;
      const token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
      };
      console.log('已经有token了');

      // 2.创建订单;
      // 2.1 准备请求头参数;
      const header = {
        Authorization: token
      };
      // 2.2 准备请求体参数：
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(item => {
        goods.push({
          goods_id: item.goods_id
        }, {
          goods_number: item.num
        }, {
          goods_price: item.goods_price
        })
      })

      /*  // 3.创建订单;(因为要企业微信号才能获取,所以这边只是把代码记下来;)
         // 获取订单编号
       let orderParams = {order_price,consignee_addr,goods}
       let {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams,header});
       // console.log(order_number);

       // 4.发起预支付接口;调用api wx-requestPayment方法(在utils封装好的方法);
       const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"post",header,data:{order_number}});
       // console.log(res); res中会有个pay参数;

       // 5.发起微信支付;
       await requestPayment(pay);
        

       // 6.查询后台订单状态
       // const res = await request({url:"/my/orders/chkOrder",method:"post",header,data:{order_number}});
       // console.log(res);

      //  await showToast({title:"支付成功"})

       */

      //  7.手动删除缓存中  已经支付了的商品;
      let newCart = wx.getStorageSync('cart');
      // 过滤掉选中的商品,留下未选中的商品
      newCart.filter(item=>item.checked);
      wx.setStorageSync('cart', newCart);
      console.log(newCart);

      // 8.跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'
      });

      

    } catch (error) {
      //  await showToast({title:"支付失败"})
      console.log(error);
    }

  }


})