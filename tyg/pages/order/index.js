import {
  request
} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    orders: [],
    tabs: [{
      id: 0,
      value: '全部',
      isActive: true
    }, {
      id: 1,
      value: '待付款',
      isActive: false
    }, {
      id: 2,
      value: '待发货',
      isActive: false
    }, {
      id: 3,
      value: '退款/退货',
      isActive: false
    }],
  },

  // 在小程序中只有onLoad能通过options形参获取跳转的页面参数,如果想要通过ohShow获取,需要以下操作;
  onShow() {

    // 1.判断当页面载入时是否有请求头的参数token
    let token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }



    // 1.获取当前的页面栈（是一个数组）,长度最大时10个页面;
    let pages = getCurrentPages();
    // console.log(pages); 此时可以直接获取到url传递来的参数;

    // 2.获取当前页的索引值：数组中最大的索引值即是当前页面;
    let currentPage = pages[pages.length - 1];
    // console.log(currentPage.options);

    // 3.获取url的type参数;
    const {
      type
    } = currentPage.options;
    this.getOrders(type);

    // 4.因为type值比数组索引值的每一项大1;
    this.changeTitleByIndex(type-1);
  },

  async getOrders(type) {
    let res = await request({
      url: '/my/orders/all',
      data: {
        type
      }
    });
    // console.log(res); //此时就能获取到订单信息;
    this.setData({
      orders: res.orders
    })
  },

  // 封装一个方法,根据标题索引来激活选中 标题数组;
  changeTitleByIndex(index) {
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
  },

  handleTabsItemChange(e) {
    // 1、获取被点击的标题索引
    let {
      index
    } = e.detail;
    
    changeTitleByIndex(index);

    // 2、重新发送请求 type值比索引值大1;
    this.getOrders(index+1);
  }
});