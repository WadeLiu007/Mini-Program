import {
  request
} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },

  // 定义一个全局对象,用来接收数据中的pics
  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {

    // 为了性能优化  onshow可以频繁的来回切换;
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;

    let {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);

  },

  getGoodsDetail(goods_id) {
    request({
      url: '/goods/detail',
      data: {
        goods_id
      },
    }).then(result => {
      console.log(result);
      this.goodsInfo = result.data.message;

      // 1、获取缓存中的商品收藏的数组;
      let collect = wx.getStorageSync('collect') || [];
      // 2.判断当前商品是否被收藏了;使用some方法：只要有一个值为true则返回true;
      let isCollect = collect.some(item => item.goods_id === this.goodsInfo.goods_id);


      this.setData({
        goodsObj: {
          // 只获取这四个数据是因为太多数据没有用到,会造成小程序性能降低;
          goods_name: result.data.message.goods_name,
          goods_price: result.data.message.goods_price,
          pics: result.data.message.pics,
          // webp格式的图片iPhone识别不了,可以简单的先做一个正则转换成jpg格式,但最终还是需要后端人员修改
          goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
          goods_id: result.data.message.goods_id,
          goods_small_logo: result.data.message.goods_small_logo,
        },
        isCollect
      });

    }, )
  },

  // 点击图片放大预览效果;
  previewImage(e) {
    // console.log(e);

    // urls需要接收一个图片的url列表,通过map映射出一个符合要求的数组;
    let urls = this.goodsInfo.pics.map(item => {
      return item.pics_mid
    });
    // 接收点击的当前图片的url地址;
    let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: urls,
    });
  },

  // 加入购物车功能;
  // 1.获取缓存中的购物车 数组
  handleCartAdd() {
    // 转成数组的格式
    let cart = wx.getStorageSync('cart') || [];
    // 2.判断商品是否已经存在于购物车的数组中;
    let index = cart.findIndex(item => item.goods_id === this.goodsInfo.goods_id);

    if (index === -1) {
      // 如果index 为-1,说明cart数组里没有对应的商品
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      // 否则购物车对应的商品数量+1;
      cart[index].num++;
    }

    // 把购物车重新添加到缓存中;
    wx.setStorageSync('cart', cart);

    // 弹窗提示;
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // mask:true防止用户手抖,疯狂点击按钮;
      // 改为true,1.5s才能再次添加;
      mask: true,
    });
  },

  handleCollect() {
    let isCollect = false;
    // 1.获取缓存中的收藏数组;
    let collect = wx.getStorageSync('collect') || [];
    // 2.查找收藏的数组中是否有商品;
    let index = collect.findIndex(item => item.goods_id === this.goodsInfo.goods_id);
    // 3.如果index不等于-1 说明当前商品已经被收藏了;
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏',
        icon: "success",
        mask: true
      })
    } else {
      // 否则说明商品还没有被收藏;
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: "success",
        mask: true
      })
    }

    // 4.把数组存入到缓存中;
    wx.setStorageSync('collect', collect);
    // 5.修改data中isCollect的值;
    this.setData({
      isCollect
    })
  }

})