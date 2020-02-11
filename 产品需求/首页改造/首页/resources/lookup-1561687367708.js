(function(window, undefined) {
  var dictionary = {
    "1d7be38b-e7fb-425d-940d-51c9dd0f190d": "科室医生列表",
    "56736e3c-a79b-4a41-9c3e-695b7e7ca796": "按科室找医生",
    "80fda642-afd2-47a6-856b-fc8158e23749": "医生筛选",
    "bb83fc11-93dd-482e-9d99-352538d35b0f": "首页优化（方案二）",
    "aba38ce9-adbc-4f69-80ed-084a660d1066": "找医生首页",
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