import {
  request
} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    swiperList: [],
    iconList: [],
    floorList: []
  },
  onLoad: function (options) {
    this.getSwiperList();
    this.getIconList();
    this.getFloorList();
  },
  async getSwiperList() {
    // request({
    //     url: "/home/swiperdata"
    //   })
    //   .then(result => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   })

    // 使用ES7语法解决回调地狱
    let res = await request({
      url: '/home/swiperdata'
    })

    this.setData({
      swiperList: res.data.message
    })

  },
  getIconList() {
    request({
        url: "/home/catitems"
      })
      .then(result => {
        this.setData({
          iconList: result.data.message
        })
      })
  },
  async getFloorList() {
    let res = await request({
        url: "/home/floordata"
      })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }
});