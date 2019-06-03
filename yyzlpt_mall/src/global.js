// 这里引用全局js
import '@babel/polyfill';
// 上线注释掉
import { env } from '../config/env';

// if (env.debug) {
// let VConsole = require('vconsole')
// new VConsole()
// localStorage.setItem('debug', 'true')
// }
// 注入jsdk 
function resetWidth() {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute('content', 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=3,user-scalable=no,viewport-fit=cover');
  // 兼容ie浏览器 document.body.clientWidth 
  var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // console.log('屏幕宽度', window.screen.height);
  // console.log('body',document.body.clientWidth);
  // 默认的设置是375px(ip6)的根元素设为100px, 其他的手机都相对这个进行调整 
  console.log(baseWidth / 750 * 100)
  document.documentElement.style.fontSize = baseWidth / 750 * 100 + 'px'
  
}
 resetWidth();
 setTimeout(resetWidth(),500)
document.onreadystatechange = function (){
  if (document.readyState == "complete") {
    resetWidth();
  }
}