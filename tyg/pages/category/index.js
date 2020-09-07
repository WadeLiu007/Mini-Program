import {
  request
} from '../../request/index'
Page({
  data: {
    leftMenuList: [],
    rightContent: []
  },
  Cates: [],

  onLoad: function (options) {
    this.getCates();
  },

  getCates() {
    request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
      })
      .then(result => {
        this.Cates = result.data.message;
        console.log(this.Cates);

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
  }
});