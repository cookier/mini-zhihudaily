//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 10,
    date: "",

    isPopping: false,//是否已经弹出
    animationPlus: {},//旋转动画
    animationcollect: {},//item位移,透明度
    animationTranspond: {},//item位移,透明度
    animationInput: {},//item位移,透明度

    banners: [
      {
        "image": "https:\/\/pic3.zhimg.com\/v2-b544b0cf4a806b45748756b50ea5043e.jpg",
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      },
      {
        "image": "https:\/\/pic3.zhimg.com\/v2-3f48d83498192a7b1616e015087a9ea2.jpg",
        "type": 0,
        "id": 9500142,
        "ga_prefix": "070107",
        "title": "我本是安分守己的妖怪，却被孙悟空灭了全家被逼自杀"
      },
      {
        "image": "https:\/\/pic3.zhimg.com\/v2-024055443fb2976ec60d6d9628bd7c7e.jpg",
        "type": 0,
        "id": 9501973,
        "ga_prefix": "070107",
        "title": "好莱坞要来审计中国电影票房数据了，这是好事吗？"
      },
      {
        "image": "https:\/\/pic2.zhimg.com\/v2-42248794411d1094bf6b2bb829d1e6e1.jpg",
        "type": 0,
        "id": 9500474,
        "ga_prefix": "063018",
        "title": "能写出这篇朋友圈谣言的人，你能从头错到脚也是不容易"
      },
      {
        "image": "https:\/\/pic1.zhimg.com\/v2-80e2cf5a0ef2b870f7fce0a601c01220.jpg",
        "type": 0,
        "id": 9501053,
        "ga_prefix": "063013",
        "title": "10 年前，苹果直营店外被挤得水泄不通：iPhone 上市了"
      }
    ],
    list: [
      { "header": "今日热文" },
      {
        "images": [
          "https:\/\/pic1.zhimg.com\/v2-80d33b0bd5ce6f693304819ba1b1fdb0.jpg"
        ],
        "type": 0,
        "id": 9494694,
        "ga_prefix": "070111",
        "title": "编剧：照着原著写「午时三刻砍头」，怎么我又错了？"
      },
      {
        "images": [
          "https:\/\/pic3.zhimg.com\/v2-bb76d3a1488762bf6ec6f1efdfda5cc6.jpg"
        ],
        "type": 0,
        "id": 9500610,
        "ga_prefix": "070110",
        "title": "- 谁是母系社会的敌人？\r\n- 牛"
      },
      {
        "images": [
          "https:\/\/pic2.zhimg.com\/v2-0c605ca6dde4fafff29b0ca412ee4469.jpg"
        ],
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      },
      {
        "images": [
          "https:\/\/pic2.zhimg.com\/v2-0c605ca6dde4fafff29b0ca412ee4469.jpg"
        ],
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      },
      {
        "images": [
          "https:\/\/pic2.zhimg.com\/v2-0c605ca6dde4fafff29b0ca412ee4469.jpg"
        ],
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      },
      {
        "images": [
          "https:\/\/pic2.zhimg.com\/v2-0c605ca6dde4fafff29b0ca412ee4469.jpg"
        ],
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      },
      {
        "images": [
          "https:\/\/pic2.zhimg.com\/v2-0c605ca6dde4fafff29b0ca412ee4469.jpg"
        ],
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      },
      {
        "images": [
          "https:\/\/pic2.zhimg.com\/v2-0c605ca6dde4fafff29b0ca412ee4469.jpg"
        ],
        "type": 0,
        "id": 9501364,
        "ga_prefix": "070109",
        "title": "乔布斯创造了 iPhone，也放任死神夺走了自己生命"
      }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: app.data.title,
    })
    this.index = 1;    
  }, 
  bindDateChange: function (e) {
    var date = e.detail.value;
    wx.navigateTo({
      url: '../before/before?date=' + date.replace(/-/g, ""),
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var date = this.getNextDate();
    console.log((Number(util.formatDate(date))));
    var that = this;
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(util.formatDate(date))),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: util.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onShow:function(){
    
  },
  //点击弹出
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      takeback.call(this);
      this.setData({
        isPopping: false
      })
    } else {
      //弹出动画
      popp.call(this);
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
  }
})

function currentDate() {
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1;
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
    .getDate();
  var dateStr = year + "-" + month + "-" + day;
  return dateStr;
}

//弹出动画
function popp() {
  //plus顺时针旋转
  var animationPlus = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationcollect = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationTranspond = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationInput = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  animationPlus.step();
  animationcollect.translate(-10, -40).opacity(0.7).step();
  animationTranspond.translate(-40, -10).opacity(0.7).step();
  animationInput.translate(-60, 20).opacity(0.7).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    animationTranspond: animationTranspond.export(),
    animationInput: animationInput.export(),
  })
}

//收回动画
function takeback() {
  //plus逆时针旋转
  var animationPlus = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationcollect = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationTranspond = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  var animationInput = wx.createAnimation({
    duration: 500,
    timingFunction: 'ease-out'
  })
  animationPlus.rotateZ(0).step();
  animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
  animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
  animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
  this.setData({
    animationPlus: animationPlus.export(),
    animationcollect: animationcollect.export(),
    animationTranspond: animationTranspond.export(),
    animationInput: animationInput.export(),
  })
}

