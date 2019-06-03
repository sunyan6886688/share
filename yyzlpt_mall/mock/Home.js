// import mockjs from 'mockjs';

export default {
  // 'GET /api2/system/role': { id: 1 },
  // 获取区域接口
  'POST /web/pub/queryAareByParentCode': (req, res) => {
    res.send({
      "code": "200",
      "message": "success",
      "errorType": null,
      "result": {
        "pubAreaBoList": [
          {
            "id": 1114,
            "areaCode": "330100",
            "areaName": "杭州市",
            "areaShort": "Hangzhou",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:25.000+0000",
            "checked": null
          },
          {
            "id": 1128,
            "areaCode": "330200",
            "areaName": "宁波市",
            "areaShort": "Ningbo",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:27.000+0000",
            "checked": null
          },
          {
            "id": 1140,
            "areaCode": "330300",
            "areaName": "温州市",
            "areaShort": "Wenzhou",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:29.000+0000",
            "checked": null
          },
          {
            "id": 1152,
            "areaCode": "330400",
            "areaName": "嘉兴市",
            "areaShort": "Jiaxing",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:30.000+0000",
            "checked": null
          },
          {
            "id": 1160,
            "areaCode": "330500",
            "areaName": "湖州市",
            "areaShort": "Huzhou",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:31.000+0000",
            "checked": null
          },
          {
            "id": 1166,
            "areaCode": "330600",
            "areaName": "绍兴市",
            "areaShort": "Shaoxing",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:32.000+0000",
            "checked": null
          },
          {
            "id": 1173,
            "areaCode": "330700",
            "areaName": "金华市",
            "areaShort": "Jinhua",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:33.000+0000",
            "checked": null
          },
          {
            "id": 1183,
            "areaCode": "330800",
            "areaName": "衢州市",
            "areaShort": "Quzhou",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:35.000+0000",
            "checked": null
          },
          {
            "id": 1190,
            "areaCode": "330900",
            "areaName": "舟山市",
            "areaShort": "Zhoushan",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:35.000+0000",
            "checked": null
          },
          {
            "id": 1195,
            "areaCode": "331000",
            "areaName": "台州市",
            "areaShort": "Taizhou",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:36.000+0000",
            "checked": null
          },
          {
            "id": 1205,
            "areaCode": "331100",
            "areaName": "丽水市",
            "areaShort": "Lishui",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:50:37.000+0000",
            "checked": null
          },
          {
            "id": 1215,
            "areaCode": "331200",
            "areaName": "舟山群岛新区",
            "areaShort": "Zhoushan",
            "parentId": "330000",
            "gmtCreate": "2019-02-18T07:53:32.000+0000",
            "checked": null
          }
        ]
      }
    });
  },
  // 获取首页标签
  'POST /web/opt/appGetHomeLabelInfoList': (req, res) => {
    res.send(
      {
        "code": "200",
        "message": "success",
        "errorType": null,
        "result": {
          "appHomeLabelInfoVoList": [
            {
              "labelId": 21,
              "labelName": "事实上",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            },
            {
              "labelId": 23,
              "labelName": "撒大声地",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            },
            {
              "labelId": 13,
              "labelName": "男装2",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            },
            {
              "labelId": 17,
              "labelName": "服饰",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            },
            {
              "labelId": 14,
              "labelName": "萝莉装",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            },
            {
              "labelId": 15,
              "labelName": "男装",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            },
            {
              "labelId": 22,
              "labelName": "奥术大师",
              "fileVo": {
                "fileContent": null,
                "path": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554639533830&di=ce4aea38b59356d0ad50514939086bb7&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F48%2F02a58PIChzZ.jpg",
                "type": "1",
                "rowKey": "123"
              }
            }
          ]
        }
      }
    );
  },
  // 获取首页banner
  'POST /web/opt/getAppBanners': (req, res) => {
    res.send(
      {
        "code": "200",
        "message": "success",
        "result": {
          "banners": [
            {
              "fileBo": {
                "fileContent": "string",
                "path": "http://img.zcool.cn/community/01c9ec59ffc180a801202b0c3eca09.jpg@2o.jpg",
                "rowKey": "string",
                "type": "2"
              },
              "bannerId": 0,
              "bannerTitle": " 医疗美容水太深",
              "bannerOrder": null,
              "jumpUrl": "www.baidu.com",
              "imageId": null,
              "isShow": null
            },
            {
              "fileBo": {
                "fileContent": "string",
                "path": "http://img.zcool.cn/community/01c9ec59ffc180a801202b0c3eca09.jpg@2o.jpg",
                "rowKey": "string",
                "type": "2"
              },
              "bannerId": 0,
              "bannerTitle": " 医疗美容水太深",
              "bannerOrder": null,
              "jumpUrl": "www.baidu.com",
              "imageId": null,
              "isShow": null
            },
            {
              "fileBo": {
                "fileContent": "string",
                "path": "http://img.zcool.cn/community/01c9ec59ffc180a801202b0c3eca09.jpg@2o.jpg",
                "rowKey": "string",
                "type": "2"
              },
              "bannerId": 0,
              "bannerTitle": " 医疗美容水太深",
              "bannerOrder": null,
              "jumpUrl": "www.baidu.com",
              "imageId": null,
              "isShow": null
            },
            {
              "fileBo": {
                "fileContent": "string",
                "path": "http://img.zcool.cn/community/01c9ec59ffc180a801202b0c3eca09.jpg@2o.jpg",
                "rowKey": "string",
                "type": "2"
              },
              "bannerId": 0,
              "bannerTitle": " 医疗美容水太深",
              "bannerOrder": null,
              "jumpUrl": "www.baidu.com",
              "imageId": null,
              "isShow": null
            },
          ]
        }
      },

    );
  },
  // 首页门店
  'POST /web/org/queryStore': (req, res) => {
    res.send(
      {
        "code": "200",
        "message": "success",
        "result": {
          "storeList": [
            {
              "id": 0,
              "storeName": "首页门店1",
              "isHot": "1",
              "sort": "6",
              "status": "0",
              "distance": 500,
              "avgAmount": 998,
              "logImgId": "string",
              "fileVo": {
                "fileContent": "string",
                "path": "http://img4.imgtn.bdimg.com/it/u=2364312099,872964619&fm=26&gp=0.jpg",
                "rowKey": "string",
                "type": "2"
              },
              'hotOffer': {
                'offerName': "热门商品名称",
                'offerId': 1
              }
            },
            {
              "id": 1,
              "storeName": "首页门店2",
              "isHot": "1",
              "sort": "6",
              "status": "0",
              "distance": 600,
              "avgAmount": 998,
              "logImgId": "string",
              "fileVo": {
                "fileContent": "string",
                "path": "http://img4.imgtn.bdimg.com/it/u=2364312099,872964619&fm=26&gp=0.jpg",
                "rowKey": "string",
                "type": "2"
              },
              'hotOffer': {
                'offerName': "热门商品名称",
                'offerId': 1
              }
            },
            {
              "id": 2,
              "storeName": "首页门店3",
              "isHot": "1",
              "sort": "6",
              "status": "0",
              "distance": 700,
              "avgAmount": 600,
              "logImgId": "string",
              "fileVo": {
                "fileContent": "string",
                "path": "http://img4.imgtn.bdimg.com/it/u=2364312099,872964619&fm=26&gp=0.jpg",
                "rowKey": "string",
                "type": "2"
              },
              'hotOffer': {
                
              }
            },
          ],

        }
      }
    );
  },
};
