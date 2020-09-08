//Page Object
Page({
  data: {
    tabs:[{
      id:0,
      value:'综合',
      isActive:true
    },{
      id:1,
      value:'销量',
      isActive:false
    },{
      id:2,
      value:'评价',
      isActive:false
    }],
    currentIndex:0
  },

  handleTabsItemChange(e){
    let {index} = e.detail;
    // 修改原数组;
    let {tabs} = this.data;
    tabs.forEach((item,i)=>{
      if(i === index){
        item.isActive = true;
      }else{
        item.isActive = false
      }
    })

    this.setData({
      tabs
    })
  },
  onLoad: function(options){
    console.log(options);
  },
  
});