import {
  request
} from '../../request/index';
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  login
} from '../../utils/asyncWx';
Page({
  data: {

  },
  async handleGetUserInfo(e) {
    // console.log(e);
    try {
      //1、 获取用户信息：
      const {
        encryptedData,
        rawData,
        signature,
        iv
      } = e.detail;
      //2、 获取小程序登陆后的code;
      // 在封装的函数中调用;
      const {
        code
      } = await login();

      // 3、获取用户token值;
      // let loginParams = {
      //   encryptedData,
      //   rawData,
      //   signature,
      //   iv,
      //   code
      // };


      // 只有企业账号才能获取到token值;所以先暂时赋值一下
      // let res = await request({
      //   url: "/users/wxlogin",
      //   data: loginParams,
      //   method: "post"
      // });
      // console.log(res);

      let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      // 把token值存到缓存中
      wx.setStorageSync("token", token);
      // 返回上一层;
      wx.navigateBack({
        delta: 1 //值为几就是返回上几层
      });
    } catch (error) {
      console.log(error);
    }

  }
});