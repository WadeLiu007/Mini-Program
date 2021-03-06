//1. 获取 用户对向程序所授予获取地址的权限状态 scope.address;
/* 1.假设 用户 点击获取收获地址的提示框,当点击确定的时候调用wx.getSetting({})方法中的authSetting为true;
      scope.address 值为true 直接调用 获取收获地址;

      
    2. 假设 用户 从来没有调用过  收获地址的api;
    scope.address 为 undefined 直接调用 获取收货地址;

    3.假设 用户 点击获取收获地址的提示框 取消;
    scope.address 值 false;
      1.如果用户取消了获取收获地址,就诱导用户自己打开授权设置;
      2.再执行获取收货地址的代码

    4.把获取到的地址信息,存到本地存储中;
*/

// 2.页面加载完毕;
// 使用onLoad 或 onShow
/* 1.获取本地存储中的数据地址;
   2.把数据设置给data中的一个变量;
*/

// 3.给购物车页面提供数据;
/* 
在onShow中;
  1.获取缓存中的购物车数组;
  2.把购物车数据填充到data中;
 */

import {
  getSetting,
  chooseAddress,
  openSetting
} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    // 1.获取缓存中的地址;
    let address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];

    // 执行下面封装的代码：
    this.setCart(cart);

    this.setData({
      address
    });
    // 全选功能
    // 利用数组every方法实现全选功能;every()的特性：便利数组,当每一项为true时则返回true,有一项为false则返回false;
    // 因为当cart为空数组时，系统也会判断为true;全选按钮会被勾选上;所有判断cart里面是否有值;
    // if (cart.length > 0) {
    //   var allChecked = cart.every(item => {
    //     // console.log(item);
    //     return item.checked;
    //   })
    // } else {
    //   allChecked = false;
    // }

    // // 计算总价格和总数量：
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(item => {
    //   // 判断被选中的商品的总额和总数;
    //   if (item.checked) {
    //     totalNum += item.num;
    //     totalPrice += item.num * item.goods_price;
    //   }
    // })


    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // });


  },

  // 用ES7语法封装后记得加async
  async handleChooseAddress() {

    // 一、封装前的代码
    // // 1.获取权限状态;
    // wx.getSetting({
    //   success: (result) => {
    //     // 因为scope.address作为key值系统会分开来看,所以用['']形式来写
    //     let scopeAddress = result.authSetting['scope.address'];
    //     if (scopeAddress === true || scopeAddress === undefined){
    //       wx.chooseAddress({
    //         success: (res) => {
    //           console.log(res);
    //         },
    //       })
    //     }else{
    //       // 因为用户以前拒绝过授予权限, 先诱导用户打开授权页面;
    //       wx.openSetting({
    //         success: (res2) => {
    //           // 授权成功后执行获取收货地址代码;
    //           wx.chooseAddress({
    //             success: (res3) => {
    //               console.log(res3);
    //             },
    //           })
    //         },
    //       })
    //     }
    //   },
    // })





    // 二、封装后：
    // 1.获取权限状态;
    // const res1 = await getSetting();
    // const scopeAddress = res1.authSetting['scope.address'];

    // 2.判断权限状态
    // if (scopeAddress === true || scopeAddress === undefined) {
    //   // 3.调用收获地址的api
    //   const res2 = await chooseAddress();
    //   console.log(res2);
    // } else {
    //   // 诱导用户打开授权页面;
    //   await openSetting();
    //   const res2 = await chooseAddress();
    //   console.log(res2);
    // }

    // 再次优化代码;因为res2在调用了两次;所以可以改成：
    // if (scopeAddress === false) {
    //   // 诱导用户打开授权页面;
    //   await openSetting()
    // }
    // // 调用收获地址api
    // const res2 = await chooseAddress();
    // console.log(res2);

    // },

    // 为了避免点击取消的时候报错,用try...catch的方法接收
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      if (scopeAddress === false) {
        // 诱导用户打开授权页面;
        await openSetting()
      }
      // 调用收获地址api
      const address = await chooseAddress();
      // console.log(address);
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },

  // 商品的选中;
  handleItemChange(e) {
    let goods_id = e.currentTarget.dataset.id;
    // console.log(goods_id);
    // 获取购物车的数组;
    let {
      cart
    } = this.data;

    // 找到被修改的商品;
    for (let i = 0; i < cart.length; i++) {
      if (goods_id === cart[i].goods_id) {
        // 选中状态取反;
        cart[i].checked = !cart[i].checked;
      }

      // if(cart[i].checked == false){
      //   this.data.allChecked = false;
      // }

    }


    // 把cart数据重新设置回data中和缓存中;
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart);

    this.setCart(cart);

    // if (cart.length > 0) {
    //   var allChecked = cart.every(item => {
    //     // console.log(item);
    //     return item.checked;
    //   })
    // } else {
    //   allChecked = false;
    // }

    // // 计算总价格和总数量：
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(item => {
    //   // 判断被选中的商品的总额和总数;
    //   if (item.checked) {
    //     totalNum += item.num;
    //     totalPrice += item.num * item.goods_price;
    //   }
    // })

    // this.setData({
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // });
  },

  /* 为了避免上述代码多次重复执行,进行一次封装 */
  setCart(cart) {
    if (cart.length > 0) {
      var allChecked = cart.every(item => {
        // console.log(item);
        return item.checked;
      })
    } else {
      allChecked = false;
    }

    // 计算总价格和总数量：
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      // 判断被选中的商品的总额和总数;
      if (item.checked) {
        totalNum += item.num;
        totalPrice += item.num * item.goods_price;
      }
    })

    wx.setStorageSync("cart", cart);
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
  },

  // 商品全选功能
  handleItemAllCheck() {
    // 1.获取data中的数据;
    let {
      cart,
      allChecked
    } = this.data;
    // 2.全选按钮取反;
    allChecked = !allChecked;
    // 3.遍历购物车中的数组，让其选中状态跟着全选按钮改变;
    cart.forEach(item => {
      return item.checked = allChecked;
    })
    // 调用上面的setCart函数;执行计算操作;
    this.setCart(cart);
  },

  // 编辑购物车商品数量;
  handleItemNumEdit(e) {
    // 1、获取自定义属性;
    let {
      id,
      operation
    } = e.currentTarget.dataset;
    // 2、获取购物车的数组;
    let {
      cart
    } = this.data;
    // 3、找到需要修改商品的索引;
    let index = cart.findIndex(item => item.goods_id === id)

    // 4、判断是否要执行删除;
    if (cart[index].num === 1 && operation === -1) {
      // operation===-1表示执行的是减法;
      wx.showModal({
        title: '提示',
        content: '您确定要删除该商品吗？',
        success: (res) => {
          // 这边一定要使用箭头函数,否则this指向的是showModal这个对象;
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
            // console.log(cart);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 5、进行商品数量修改;
      cart[index].num += operation;
      // 6、调用封装好的计算函数;
      this.setCart(cart);
    }
  },

  // 结算;
  handlePay() {
    // 1.判断用户是否有添加收货地址;
    let {
      address,
      totalNum
    } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '您还没有添加收货地址',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: (result) => {
          console.log(result);
        },
      });
      return ;
    }

    // 2.判断用户是否选购了商品;
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品哦',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: (result) => {
          console.log(result);
        },
      });
      return ;
    }

    // 3.如果以上两种情况都操作完了 就跳转到支付页面;
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})