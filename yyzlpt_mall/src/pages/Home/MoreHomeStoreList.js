/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */
import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './MoreHomeStoreList.less';
import listStyle from '../list.less'
import NavImg from '../../assets/NavImg.png'
import BannerrImg from '../../assets/noBg.png'
import { connect } from 'dva';
import { Carousel, WingBlank, PullToRefresh, ListView } from 'antd-mobile';
import router from 'umi/router';
import Scroll from 'components/Scroll/index'
let allStoreList = []
@connect(({ home }) => ({
  AareByParentCode: home.AareByParentCode,
  HomeLableList: home.HomeLableList,
  AppBanners: home.AppBanners,
  HomeStore: home.MoreHomeStore,
  haveNext: home.haveNext,
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
    this.queryStore()
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
      type: 'home/getAppHomeMoreStoreList',
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
    router.push({
      pathname: `/storeList`,
      query:
      {
        labelName: item ? item.labelName : '全部',
        labelId: item ? item.labelId : '',
      }
    });
  }
  // 搜索点击跳转
  toSearch = () => {
    router.push({
      pathname: `/search`
    });
  }
  // 跳转门店主页
  toStoreHome = (id) => {
    router.push({
      pathname: `/storeHome`,
      query: { storeId: id, }
    });
  }
  //跳转到产品
  toProductInfo = (e, id) => {
    e.stopPropagation();
    router.push({
      pathname: `/ProductOrder/ProductInfo`,
      query: { commodityId: id, }
    });
  }
  render() {
    const HomeStore = this.props.HomeStore || []
    let cityName = localStorage.getItem('UserChooseCity') || localStorage.getItem('UserCity') || '杭州'
    const allStoreListStr = JSON.stringify(allStoreList)
    HomeStore ? HomeStore.map(item => {
      allStoreListStr.indexOf(JSON.stringify(item)) < 0 ?
        allStoreList.push(item) : ''
    }) : ''
    return (
      <Scroll className={styles.scroll}
        ref={ref => { this.scrollCt = ref }}
        doPullDownFresh={() => this.queryStore(false)}
        pullUpLoadMoreData={() => this.queryStore(true)}
        pullUpLoad={this.props.haveNext}
      >
        <div className={styles.body}>
          <div className={listStyle.list}>
            <ul>
              {
                allStoreList.length > 0 ? allStoreList.map(item => {
                  const Background = item.fileBo ? item.fileBo.path : BannerrImg
                  const distanceNum = item.distance ? item.distance > 1000 ? item.distance / 1000 : item.distance : 0
                  const avgAmount = item.perCapitaConsum ? item.perCapitaConsum / 100 : 0
                  return (
                    <li onClick={() => this.toStoreHome(item.id)} key={item.id}>
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
