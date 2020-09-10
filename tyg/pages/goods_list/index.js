import {
  request
} from '../../request/index'
Page({
  data: {
    tabs: [{
      id: 0,
      value: '综合',
      isActive: true
    }, {
      id: 1,
      value: '销量',
      isActive: false
    }, {
      id: 2,
      value: '评价',
      isActive: false
    }],
    currentIndex: 0,
    goodsList: [],

  },
  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  totalPages: 1,


  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  getGoodsList() {
    request({
      url: '/goods/search',
      data:this.QueryParams
    }).then(result => {
      // 获取总条数;
      let {
        total
      } = result.data.message
      // 计算总页数;
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
      let {
        goods
      } = result.data.message;
      this.setData({
        // 做一个数组拼接,并不是把前十条数据删除替换,而是在页面触底的时候拼接上新的第二页请求数据
        goodsList: [...this.data.goodsList,...goods]
      });
    })
  },

  // 页面触底时加载新的数据请求;
  onReachBottom: function () {
    // 判断当前页码是否大于等于总页数,如果大于等于则说明没有数据了,反则继续请求数据;
    if(this.QueryParams.pagenum >= this.totalPages ){
        wx.showToast({
          title: '已经没有更多商品了哦~',
          icon: 'none'
        });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },


  // 监听用户下拉刷新事件;
  onPullDownRefresh(){
    // 1.重置数组;
    this.setData({
      goodsList:[]
    });

    // 2.加载的数据放在第一页;(即重置页数)
    this.QueryParams.pagenum = 1;

    // 3.请求数据;
    this.getGoodsList();

    // 4.数据请求成功时,停止加载动画效果;
    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e) {
    let {
      index
    } = e.detail;
    // 修改原数组;
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