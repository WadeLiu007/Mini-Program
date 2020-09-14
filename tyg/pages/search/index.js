import {
  request
} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    goods: [],
    // 取消按钮是否显示;
    isFocus: false,
    // 输入框中的值
    inputValue:""
  },

  // 设置一个全局的防抖动定时器id
  timeId: '',

  // 输入框的值改变了就会触发事件;
  handleInput(e) {
    // 1.获取输入框的值
    const {
      value
    } = e.detail;

    // 2.检测合法性;
    if (!value.trim()) {
      // 当值不合法的时候不显示列表,并且取消按钮隐藏;
      this.setData({
        goods: [],
        isFocus:false
      })
      // 值不合法;
      return;
    }

    // 3.当输入框中输入了值的时候,把按钮显示;
    this.setData({
      isFocus: true
    })


    // 清除定时器
    clearTimeout(this.timeId);

    // 通过定时器实现防抖动;
    this.timeId = setTimeout(() => {
      // 3.发送请求接收后台数据;
      this.qsearch(value);
    }, 1000)
  },

  // 点击取消列表清空;
  handleCancel(){
    this.setData({
      goods: [],
      isFocus:false,
      inputValue:''
    })
  },

  // 发送请求获取搜索建议 数据;
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    this.setData({
      goods: res.data.message
    });
  }


})