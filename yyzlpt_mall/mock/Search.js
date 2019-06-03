export default {
  // 获取搜索热门字段
  'POST /web/opt/getAppKeyWordList': (req, res) => {
    res.send(
      {
        "code": "200",
        "message": "success",
        "errorType": null,
        "result": {
          "keyWords": [
            "洗牙",
            "健身2",
            "美白",
            "美容",
            "健身"
          ]
        }
      }
    )
  },
  'POST /web/es/search': (req, res) => {
    res.send(
      {
        "code": "200",
        "message": "success",
        "result": {
          "storeInfoList": [
            {
              "storeName":"门店名称哦哈哈",
              "address": "string",
              "distance": 0,
              "feedbackRate": 0,
              "hotGoodsId": 0,
              "hotGoodsName": "热门商品名称",
              "commodityLabelName": "商品标签名称",
              "labels": [
                {
                  "labelId": 0,
                  "labelName": "string"
                }
              ],
              "pricePerPerson": 0,
              "storeId": 0,
              "storeLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://91.gdown.baidu.com/img/0/512_512/18729e28e99d6f2d82c1ed118731d9d4.png",
                "type": "string"
              }
            },{
              "storeName":"门店名称哦哈哈",
              "address": "string",
              "distance": 0,
              "feedbackRate": 0,
              "hotGoodsId": 0,
              "hotGoodsName": "热门商品名称",
              "commodityLabelName": "商品标签名称",
              "labels": [
                {
                  "labelId": 0,
                  "labelName": "string"
                }
              ],
              "pricePerPerson": 0,
              "storeId": 0,
              "storeLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://91.gdown.baidu.com/img/0/512_512/18729e28e99d6f2d82c1ed118731d9d4.png",
                "type": "string"
              }
            },{
              "storeName":"门店名称哦哈哈",
              "address": "string",
              "distance": 0,
              "feedbackRate": 0,
              "hotGoodsId": 0,
              "hotGoodsName": "热门商品名称",
              "commodityLabelName": "商品标签名称",
              "labels": [
                {
                  "labelId": 0,
                  "labelName": "string"
                }
              ],
              "pricePerPerson": 0,
              "storeId": 0,
              "storeLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://91.gdown.baidu.com/img/0/512_512/18729e28e99d6f2d82c1ed118731d9d4.png",
                "type": "string"
              }
            },{
              "storeName":"门店名称哦哈哈",
              "address": "string",
              "distance": 0,
              "feedbackRate": 0,
              "hotGoodsId": 0,
              "hotGoodsName": "热门商品名称",
              "commodityLabelName": "商品标签名称",
              "labels": [
                {
                  "labelId": 0,
                  "labelName": "string"
                }
              ],
              "pricePerPerson": 0,
              "storeId": 0,
              "storeLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://91.gdown.baidu.com/img/0/512_512/18729e28e99d6f2d82c1ed118731d9d4.png",
                "type": "string"
              }
            }, {
              "storeName":"门店名称哦哈哈",
              "address": "string",
              "distance": 0,
              "feedbackRate": 0,
              "hotGoodsId": 0,
              "hotGoodsName": "热门商品名称",
              "commodityLabelName": "商品标签名称",
              "labels": [
                {
                  "labelId": 0,
                  "labelName": "string"
                }
              ],
              "pricePerPerson": 0,
              "storeId": 1,
              "storeLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://91.gdown.baidu.com/img/0/512_512/18729e28e99d6f2d82c1ed118731d9d4.png",
                "type": "string"
              }
            }
          ],
          "commodityList": [
            {
              "commodityName": "商品名称",
              "commodityLabelName": "商品标签名称",
              "commodityId": "商品IwD",
              "commodityLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://img0.imgtn.bdimg.com/it/u=1080019685,2992705561&fm=26&gp=0.jpg",
                "type": "string"
              },
              "dueDate": "预约人数",
              "price": "当前价格",
              "originalPrice": "原价"
            },{
              "commodityName": "商品名称",
              "commodityLabelName": "商品标签名称",
              "commodityId": "商品ID",
              "commodityLogo": {
                "fileContent": [
                  "string"
                ],
                "id": "string",
                "path": "http://img0.imgtn.bdimg.com/it/u=1080019685,2992705561&fm=26&gp=0.jpg",
                "type": "string"
              },
              "dueDate": "预约人数",
              "price": "当前价格",
              "originalPrice": "原价"
            }
          ]
        }
      }
    )
}
};
