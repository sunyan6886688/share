export default [
  {
    path: '/',
    routes: [
      { path: '/', component: './Home/Home', title: '健康圈' },
      { path: '/scrollDemo', component: './scrollDemo/index', title: '滚动测试页面', },
      { path: '/chooseCity', component: './Home/ChooseCity', title: '选择地区' },
      { path: '/storeList', component: './StoreList/StoreList', title: '商家列表' },
      { path: '/moreHomeStoreList', component: './Home/MoreHomeStoreList', title: '精选机构' },
      { path: '/rankingList', component: './RankingList/RankingList', title: '排行榜详情', },
      { path: '/search', component: './Search/Index', title: '搜索页', },
      { path: '/storeHome', component: './StoreInfo/StoreHome', title: '商家主页', },
      { path: '/storeInfo', component: './StoreInfo/StoreInfo', title: '商家详情', },
      { path: '/brandInfo', component: './StoreInfo/BrandInfo', title: '品牌信息', },
      { path: '/productList', component: './StoreInfo/ProductList', title: '门店所有商品', },
      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          { path: '/exception/403', title: '无权限', component: './exception/403' },
          { path: '/exception/500', title: '服务器出错了', component: './exception/500' },
        ],
      },
      { path: '/ProductOrder', component: './ProductOrder/OrderDetails', title: '订单详情' },
      { path: '/appointResult/appointSuccess', component: './appointResult/appointSuccess', title: '' },
      { path: '/appointResult/appointDefeated', component: './appointResult/appointDefeated', title: '' },
      { path: '/ProductOrder/AffirmOrder', component: './ProductOrder/AffirmOrder', title: '确认订单' },
      { path: '/ProductOrder/MyOrder', component: './ProductOrder/MyOrder', title: '我的订单' },
      { path: '/ProductOrder/ProductInfo', component: './ProductOrder/ProductInfo', title: '商品详情' },
      { path: '/ProductOrder/ProductPriew', component: './ProductOrder/ProductPriew', title: '商品详情预览' },
      // 分享页面
      { path: '/share/login', component: './WechatShare/User/Login', title: '登录' },
      {
        path: '/share',
        component: '../layouts/HomeAndUser',
        routes: [
          { path: '/share', redirect: '/share/home' },
          { path: '/share/home', component: './WechatShare/Home/Home' },
          { path: '/share/chooseCity', component: './WechatShare/Home/ChooseCity', title: '选择地区' },
      { path: '/share/storeList', component: './WechatShare/StoreList/StoreList', title: '商家列表' },
      { path: '/share/moreHomeStoreList', component: './WechatShare/Home/MoreHomeStoreList', title: '精选机构' },
      { path: '/share/rankingList', component: './WechatShare/RankingList/RankingList', title: '排行榜详情', },
      { path: '/share/search', component: './WechatShare/Search/Index', title: '搜索页', },
      { path: '/share/storeHome', component: './WechatShare/StoreInfo/StoreHome', title: '商家主页', },
      { path: '/share/storeInfo', component: './WechatShare/StoreInfo/StoreInfo', title: '商家详情', },
      { path: '/share/brandInfo', component: './WechatShare/StoreInfo/BrandInfo', title: '品牌信息', },
      { path: '/share/productList', component: './WechatShare/StoreInfo/ProductList', title: '门店所有商品', },
      { path: '/share/ProductOrder', component: './WechatShare/ProductOrder/OrderDetails', title: '订单详情' },
      { path: '/share/appointResult/appointSuccess', component: './WechatShare/appointResult/appointSuccess', title: '' },
      { path: '/share/appointResult/appointDefeated', component: './WechatShare/appointResult/appointDefeated', title: '' },
      { path: '/share/ProductOrder/AffirmOrder', component: './WechatShare/ProductOrder/AffirmOrder', title: '确认订单' },
      { path: '/share/ProductOrder/MyOrder', component: './WechatShare/ProductOrder/MyOrder', title: '我的订单' },
      { path: '/share/ProductOrder/ProductInfo', component: './WechatShare/ProductOrder/ProductInfo', title: '商品详情' },
      { path: '/share/ProductOrder/ProductPriew', component: './WechatShare/ProductOrder/ProductPriew', title: '商品详情预览' },
      
        ],
      },
      { component: '404', title: '页面没找到' },
      
    ],
  },
];
