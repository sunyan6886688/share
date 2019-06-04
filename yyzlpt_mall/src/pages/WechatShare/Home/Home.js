/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */
import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Home.less';
import listStyle from '../../list.less'
import NavImg from '@/assets/all.png'
import BannerrImg from '@/assets/noBg.png'
import { connect } from 'dva';
import { Carousel, WingBlank, PullToRefresh, ListView } from 'antd-mobile';
import router from 'umi/router';
import userStatisticPage from 'utils/utils'
import Scroll from 'components/Scroll/index'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
let allStoreList = []
let timer=''
@connect(({ home }) => ({
  AareByParentCode: home.AareByParentCode,
  HomeLableList: home.HomeLableList,
  AppBanners: home.AppBanners,
  HomeStore: home.HomeStore,
  haveNext: home.haveNext,
  createSignature: home.createSignature
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      imgHeight: ' 180px',
      refreshing: false,
      heightP: document.documentElement.clientHeight,
    };
  }
  componentDidMount = () => {
    this.queryAareByParentCode()
    var mySwiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    })

    this.appGetHomeLabelList()
    this.getAppBanners()
    this.queryStore()
  }
  queryAareByParentCode = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/queryAareByParentCode',
      payload: {
        "areaCode": "330000"
      }
    }).then((data) => {
      let cityName = localStorage.getItem('UserChooseCity') || localStorage.getItem('UserCity') || '杭州'
      localStorage.setItem('areaName', cityName)
      cityName = cityName + '市'
      data.result.pubAreaBoList.map(item => {
        item.areaName == cityName ?
          localStorage.setItem('areaCode', item.areaCode) : ''
      })

    })
  }
  // 获取首页门店
  queryStore = (isLoadMore) => {
    if (this.props.haveNext === false && isLoadMore) {
      return Promise.resolve()
    }
    this.pageNum = !isLoadMore ? 1 : this.pageNum + 1
    const { dispatch } = this.props;
    if (!isLoadMore) {
      allStoreList = []
    }
    return dispatch({
      type: 'home/queryStore',
      payload: {
        "gisLat": localStorage.getItem('UserCityLat'),
        "gisLng": localStorage.getItem('UserCityLng'),
        "pageNum": this.pageNum,
        "pageSize": 10
      }
    })
  }
  // 获取首页banner
  getAppBanners = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getAppBanners'
    })
  }
  // 首页标签获取
  appGetHomeLabelList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/appGetHomeLabelList'
    })
  }
  //分类点击跳转
  toShopList = (item) => {
    const expand = {
      tagName: item && item.labelName || ''
    }
    userStatisticPage(0, 'healthCircleToAppEvent', expand)
    localStorage.setItem("labelName", item ? item.labelName : '全部')
    localStorage.setItem("labelId", item ? item.labelName == '全部' ? '' : item.labelId : '')
    localStorage.setItem("sortType", '1')
    // window.location.href='http://192.168.1.131:8080/#/devTest'
    router.push({
      pathname: `/share/storeList`,
      query:
      {
        labelName: item ? item.labelName : '全部',
        labelId: item ? item.labelName == '全部' ? '' : item.labelId : '',
      }
    });
  }

  getJumpUrlConfig = url => {
    const query = {};
    const urlListSplitByContents = url.split('contents=');
    const contents = urlListSplitByContents[1];
    let urlList, key, value;

    if (contents && contents.indexOf('?') > -1) {
      query.contents = urlListSplitByContents[1];
      urlList = urlListSplitByContents[0].split('?');
    } else {
      urlList = url.split('?');
    }
    const activity = urlList[0], params = urlList[1];
    if (params) {
      params.split('&').forEach(item => {
        const queryList = item.split('=');
        key = queryList[0];
        value = queryList[1];
        if (value) {
          query[key] = value;
        }
      })
    }
    return { activity, query };
  }
  toAppPage=(url)=>{ 
    console.log(url)
    var u = navigator.userAgent;
    if (/MicroMessenger/gi.test(u)) {
      // 引导用户在浏览器中打开
      alert('请在浏览器中打开');
      return;
    }
    var d = new Date();
    var t0 = d.getTime();

    if (u.indexOf('iPhone') > -1) {
      // 最核心的代码-----------
      var loadDateTime = new Date();
       timer=window.setTimeout(function () {
        var timeOutDateTime = new Date();
        if (timeOutDateTime - loadDateTime < 5000) {
          window.location = "https://itunes.apple.com/cn/app/%E6%B5%99%E6%B1%9F%E9%A2%84%E7%BA%A6%E6%8C%82%E5%8F%B7/id588271688?l=zh&ls=1&mt=8";
        } else {
          window.close();
        }
      },
        25);
      window.location.href = 'zjyygh://zj12580.app/'+url
    }
    if (u.indexOf('Android') > -1) {
      // 最核心的代码-----------
      var loadDateTime = new Date();
       timer= window.setTimeout(function () {
        var timeOutDateTime = new Date();
        if (timeOutDateTime - loadDateTime < 5000) {
          window.location = "http://ghws5.zj12580.cn:9901/YYGH_12580_SERVICE/apk/yygh-12580.apk";
        
        } else {
          window.close();
        }
      },
        25);
      window.location.href = 'zjyygh://zj12580.app/'+url
    }
  }
  handleHomeLabelClick = (item) => {

    const { url, urlType } = item;
    if (!url) {
      this.toShopList(item);
    } else {
      const expand = {
        tagName: item && item.labelName || ''
      }
      userStatisticPage(0, 'healthCircleToAppEvent', expand)
      if (urlType == 3) {
        window.location.href = url;
      } else if (urlType == 2) {
        const jumpUrlConfig = this.getJumpUrlConfig(url);
        window.location.href = jumpUrlConfig.query.contents;
      } else if (urlType == 1) {
        this.toAppPage(url)
      }
    }
  }

  handleBannerClick = e => {
    const { id } = e.target.dataset;
    const expand = {
      bannerID: id
    }
    userStatisticPage(0, 'healthCircleToBannerEvent', expand)

    if (e.target && e.target.tagName === 'IMG') {
      
      const { url, urltype } = e.target.dataset;
      if (!url) return;
      if (urltype == 3) {
        window.location.href = url;
      } else if (urltype == 2) {
        const jumpUrlConfig = this.getJumpUrlConfig(url);
        window.location.href = jumpUrlConfig.query.contents;
      } else if (urltype == 1) {
        this.toAppPage(url)
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'home/clearStroeList'
    });
    clearTimeout(timer)
  }
  // 搜索点击跳转
  toSearch = () => {
    const expand = {}
    userStatisticPage(0, 'healthCircleToSearchEvent', expand)
    localStorage.setItem('changState', 0)
    localStorage.setItem('keyWord', '')
    localStorage.setItem('searchType', '')
    router.push({
      pathname: `/share/search`
    });
  }
  // 跳转门店主页
  toStoreHome = (id, storeName) => {
    const expand = {
      orgId: id,
      orgName: storeName
    }
    userStatisticPage(0, 'healthCircleToOrgItemEvent', expand)
    router.push({
      pathname: `/share/storeHome`,
      query: { storeId: id, }
    });
  }
  //跳转到产品
  toProductInfo = (e, id) => {
    e.stopPropagation();
    router.push({
      pathname: `/share/ProductOrder/ProductInfo`,
      query: { commodityId: id, }
    });
  }
  //跳转到产品
  moreHomeStoreList = (e) => {
    const expand = {}
    userStatisticPage(0, 'healthCircleToOtherOrgEvent', expand)
    e.stopPropagation();
    router.push({
      pathname: `/share/moreHomeStoreList`,
    });
  }

  // 选择修改城市
  toChooseCity = () => {
    const expand = {}
    userStatisticPage(0, 'healthCircleToAreaEvent', expand)
    router.push({
      pathname: `/share/chooseCity`
    });
  }
  render() {
    const HomeLableList = this.props.HomeLableList || []
    const AppBanners = this.props.AppBanners || []
    const HomeStore = this.props.HomeStore || []
    let cityName = localStorage.getItem('UserChooseCity') || localStorage.getItem('UserCity') || '杭州'

    HomeStore && HomeStore.forEach(item => {
      if (allStoreList.findIndex(innerItem => innerItem.id === item.id) === -1) {
        allStoreList.push(item)
      }
    })
    return (
      <Scroll className={styles.scroll}
        ref={ref => { this.scrollCt = ref }}
        doPullDownFresh={() => this.queryStore(false)}
        pullUpLoadMoreData={() => this.queryStore(true)}
        pullUpLoad={true}
      >
        <div className={styles.body}>
          <header className={styles.header}>
            <div className={styles.address} onClick={this.toChooseCity}>
              <i>{cityName && cityName != 'undefined' && cityName != 'null' ? cityName : '杭州'}</i>
              <span></span>
            </div>
            <div className={styles.search} onClick={this.toSearch}>
              <span></span>
              <input
                placeholder='医疗机构/商家/商品'
              ></input>
              <span></span>
            </div>
          </header>
          <nav>
            <ul>
              {
                HomeLableList.length > 0 ? HomeLableList.map((item, index) => {
                  if (index <= 7) {
                    return <li onClick={() => this.handleHomeLabelClick(item)} key={item.labelId}>
                      <img src={item.fileVo.path}></img>
                      <span>{item.labelName}</span>
                    </li>
                  }
                }) : ''
              }
              <li onClick={() => this.toShopList()}>
                <img src={NavImg}></img>
                <span>全部</span>
              </li>
            </ul>
          </nav>

          <div className={styles.banner}>
            <div className='swiper-container'>
              <div className='swiper-wrapper' onClick={this.handleBannerClick}>
                {
                  AppBanners.length > 0 ? AppBanners.map((item, index) => {   // this.state.bag是在state里面定义的数组为了循环数据
                    return (
                      <div className="swiper-slide" key={item.id}>
                        <a href="javascript:void(0)">
                          <img
                            src={item.fileBo.path}
                            alt=""
                            data-url={item.jumpUrl}
                            data-id={item.id}
                            data-urltype={item.urlType}
                            onLoad={() => {
                              window.dispatchEvent(new Event('resize'));
                            }}
                          />
                        </a>
                      </div>
                    )
                  }) : ''
                }
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className={listStyle.listTitle}>
            <span>精选机构</span><b onClick={this.moreHomeStoreList}>查看更多</b>
          </div>
          <div className={listStyle.list}>
            <ul>
              {
                allStoreList.length > 0 ? allStoreList.map(item => {
                  const Background = item.fileBo ? item.fileBo.path : BannerrImg
                  const distanceNum = item.distance != null ? item.distance > 1000 ? item.distance / 1000 : item.distance : ''
                  const avgAmount = item.perCapitaConsum ? item.perCapitaConsum / 100 : 0
                  return (
                    <li onClick={() => this.toStoreHome(item.id, item.storeName)} key={item.id}>
                      <img className={listStyle.liLeft} src={Background} />
                      <div className={listStyle.liRight}>
                        <div className={listStyle.liTitle}>{item.storeName}</div>
                        <div className={listStyle.liPrice}>
                          {/* <span>4.8分</span> */}
                          {item.perCapitaConsum > 0 ? item.distance ?
                            <b>¥{avgAmount.toFixed(2)}/人</b> :
                            <b style={{ background: 'none' }}>¥{avgAmount.toFixed(2)}/人</b> : ''
                          }
                          {item.distance > 100 ?
                            <i>距您{distanceNum.toFixed(2)}{item.distance > 1000 ? 'km' : 'm'}</i> :
                            ''
                          }
                          {item.distance != null && item.distance <= 100 ?
                            <i>距您小于100m</i> :
                            ''
                          }
                        </div>
                        {
                          item.offerVo ? <div className={listStyle.dec} onClick={(e) => {
                            this.toProductInfo(e, item.offerVo.offerId)
                          }}>
                            {item.offerVo ?
                              <span>hot</span> : ''
                            }
                            <p>{item.offerVo.tags ? '[' + item.offerVo.tags[0].tagName + "]" : ''}{item.offerVo.offerName}</p>
                          </div> : ''
                        }

                      </div>
                    </li>
                  )
                }

                ) : ''
              }

            </ul>
          </div>
          {
            this.props.haveNext ? <footer>— 加载中 —</footer> : <footer>— 已加载全部 —</footer>
          }

        </div>
      </Scroll>
    );
  }
}

export default Index;
