export const request = (params) => {
  return new Promise((resolve, reject) => {
    // 定义公共的url区域,优化请求ajax数据的链接地址;
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      url:baseUrl + params.url,
        success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}