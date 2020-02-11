(function(window, undefined) {
  var dictionary = {
    "b7be3d8c-a11e-4c80-90e6-1ead0b4d2675": "商品订单列表",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "评论展示",
    "53fc9371-3f6a-4199-b96d-9bf39930bb28": "机构主页",
    "7fa6c50e-a601-47b8-966c-fbe82b25a960": "医生评论展示",
    "8ad5574d-5259-4afd-8ddd-4fcb99f17ddc": "点评入口（个人中心）",
    "4fa72f10-da4d-4000-9862-9d3e33855499": "商品评论详情",
    "9e19d140-aa9a-49da-bf75-7a803f7ad0a1": "预约记录详情",
    "34703ade-7a6d-4bc1-b0e4-159ccbd653d1": "医生评价",
    "0da62eec-8475-4c6f-81f4-6acfaa54f15c": "填写确诊疾病",
    "89f3506a-091d-4aef-ac47-e8ca244d403c": "机构评论展示",
    "f340e6b9-7f11-4748-9109-b832b431e809": "商品详情",
    "a7166f91-6fb2-4e4f-a020-300cf33009e9": "商品评价",
    "a7a6185a-c6a1-4704-b66d-5f99e620a166": "医生主页",
    "4fc61ac5-da93-4a18-aa6c-5ec05b5397e8": "预约记录列表",
    "ac865dfd-7b30-49fc-86a6-9fd15bbd8e88": "医院评论展示",
    "35765aa7-c8ea-4597-bc9b-84c6c22769ff": "医院主页",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);