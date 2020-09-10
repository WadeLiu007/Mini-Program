// 为了避免一个数据请求成功，而其他数据为请求成功就已经取消加载动画的情况;
// 定义一个变量用来计算请求数据完成的个数;
let ajaxTimes = 0;
export const request = (params) => {
  // 每调用请求数据的方法就把ajaxTimes++;
  ajaxTimes++;

  // 当数据请求成功之前显示加载动画;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    // 定义公共的url区域,优化请求ajax数据的链接地址;
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete() {
        // 每完成一次请求就把次数--,这样当次数等于0的时候就说明所有请求数据的函数已经全部调用;
        // 就把加载动画取消;
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 在complete()的生命周期方法中取消动画是因为：不管数据请求是否成功都需要取消加载动画
            wx.hideLoading()
        }

      }
    })
  })
}