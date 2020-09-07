import {
  request
} from '../../request/index'
Page({
  data: {
    swiperList: [],
    iconList: [],
    floorList:[]
  },
  onLoad: function (options) {
    this.getSwiperList();
    this.getIconList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
      })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  getIconList() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
      })
      .then(result => {
        this.setData({
          iconList: result.data.message
        })
      })
  },
  getFloorList(){
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    })
    .then(result => {
      console.log(result);
      this.setData({
        floorList: result.data.message
      })
    })
  }
});