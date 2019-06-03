// import mockjs from 'mockjs';

export default {
  // 'GET /api2/system/role': { id: 1 },
  // 获取门店信息
  'POST /web/org/getStoreInfo4App': (req, res) => {
    res.send({
      "code": "200",
      "message": "success",
      "errorType": null,
      "result": {
        "id": 335,
        "storeName": "省中医院 肿瘤科门诊",
        "shortName": "门诊部",
        "storeSite": "http://www.zj12580.cn/medicalOrg/info?id=660&t=0.2537221709345947",
        "logImgId": "199",
        "fileVo": {
          "id": "199",
          "fileContent": null,
          "path": "http://36.155.127.23:7071/group1/M00/00/01/wKhVAlyAxQWAK-puAAAn-r2M8aQ207.jpg",
          "type": "1"
        },
        "gisLng": "3",
        "gisLat": "2",
        "areaCode": "330304",
        "address": "杭州市上城区婺江路319号妇女活动中心B座惠沣大厦6楼",
        "linkMan": "康女士",
        "linkPhone": "17816866126",
        "busLine": "1",
        "info": "12",
        "storeArea": "门店面积",
        "serviceTime": "服务时间",
        "foundingTime": "2019-02-22T17:34:57.000+0000",
        "licenseImg": {
          "id": "198",
          "fileContent": null,
          "path": "http://36.155.127.23:7071/group1/M00/00/01/wKhVAlyAxQGAfrLqAAAn-r2M8aQ162.jpg",
          "type": "1"
        },
        "brandInfoVo": null,
        "practiceLicense": {
          "id": "200",
          "fileContent": null,
          "path": "http://36.155.127.23:7071/group1/M00/00/02/wKhVAlyAxYGAJIloAAAn-r2M8aQ478.jpg",
          "type": null
        },
        "hospitalVo": {
          "hospitalLevel": 1,
          "hospitalProperty": 1,
          "hospitalType": 1,
          "hospitalAlias": "医院别名",
          "gmtEnter": "2019-02-25 01:34:57",
          "apiType": 0,
          "gmtSch": "16",
          "hospitalImageList": [
            {
              "id": "123",
              "fileContent": null,
              "path": "http://36.155.127.23:7071/group1/M00/00/01/wKhVAlx_QGeAdWrzAAZjGLLPelA796.jpg",
              "type": null
            }
          ]
        },
        "medicalVo": {
          "schDate": 2,
          "orderCount": 1,
          "personCareful": "个人注意事项",
          "termCareful": "团队注意事项",
          "featureService": "特色服务",
          "appointmentNotice": "预约须知",
          "medicalImageList": [
            {
              "id": "201",
              "fileContent": null,
              "path": "http://36.155.127.23:7071/group1/M00/00/02/wKhVAlyAxYSAHkjHAAAn-r2M8aQ545.jpg",
              "type": null
            }
          ]
        },
        "pharmacyVo": {
          "medicarePoint": 0,
          "pharmacyPhone": "药话",
          "businessHours": "2019-02-25 01:34:57",
          "imageIdList": [
            {
              "id": "202",
              "fileContent": null,
              "path": "http://36.155.127.23:7071/group1/M00/00/02/wKhVAlyAxYaAea4zAAAn-r2M8aQ954.jpg",
              "type": null
            }
          ]
        },
        "serviceName": ['预约挂号', '预约体检', '报告查询', '排队叫号', '在线问诊', '当日预约'],
        "labelNameList": [],
        "avgAmount": null,
        "distance": 999
      }
    });
  },
  // 获取首页热门产品
  'POST /web/prd/getAppHotOffers': (req, res) => {
    res.send(
      {
        "code": "200",
        "message": "success",
        "errorType": null,
        "result":
        {
          "offerVos":
            [{
              "id": 1250,
              "offerName": "省中医院 肾病科门诊1",
              "marketingPrice": null,
              "macketPrice": null,
              "orderNumber": 0,
              "logImgId": "978",
              "fileBo":
              {
                "fileContent": null,
                "path": "http://36.155.127.23:7071/group1/M00/00/11/wKhVAlyhqlCASY5QAADXjhcUlnQ964.jpg",
                "type": "1",
                "rowKey": "978",
                "fileType": "1"
              },
              "gmtCreate": "2019-04-07T16:00:00.000+0000",
              "isHot": 1,
              "hotOfferOrder": 1
            }],
          "total": null,
          "haveNext": null
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
