import React, { PureComponent } from 'react';
import styles from './RankingList.less';
import listStyle from '../../list.less'
import BannerrImg from '@/assets/noBg.png'
import rankone from '@/assets/rankone.png'
import ranktwo from '@/assets/ranktwo.png'
import { connect } from 'dva';
import router from 'umi/router';
import Scroll from 'components/Scroll/index'
let allStoreList = []
@connect(({ storelist }) => ({
  AllAppHotStores: storelist.AllAppHotStores,
  haveNext: storelist.haveNext
}))
class ShopList extends PureComponent {
  componentDidMount = () => {
    document.title = this.getQueryString('name') || '排行榜详情'
    this.getAllAppHotStores()
  }
  getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;

  }
  //跳转到产品
  toProductInfo = (e, id) => {
    e.stopPropagation();
    router.push({
      pathname: `/share/ProductOrder/ProductInfo`,
      query: { commodityId: id, }
    });
  }
  // 跳转门店主页
  toStoreHome = (id) => {
    router.push({
      pathname: `/share/storeHome`,
      query: { storeId: id, }
    });
  }
  getAllAppHotStores = (isLoadMore) => {
    if (this.props.haveNext === false && isLoadMore) {
      return Promise.resolve()
    }
    const { dispatch } = this.props
    let pageNum = this.pageNum
    this.pageNum = !isLoadMore ? 1 : this.pageNum + 1
    if (!isLoadMore) {
      allStoreList = []
    }
    return dispatch({
      type: 'storelist/getAllAppHotStores',
      payload: {
        "gisLat": localStorage.getItem('UserCityLat'),
        "gisLng": localStorage.getItem('UserCityLng'),
        "pageNum": this.pageNum,
        "pageSize": 10
      }
    })
  }
  render() {
    const { AllAppHotStores } = this.props
    const storeList = AllAppHotStores ? AllAppHotStores.storeList : []
    const allStoreListStr = JSON.stringify(allStoreList)
    storeList ? storeList.map(item => {
      allStoreListStr.indexOf(JSON.stringify(item)) < 0 ?
        allStoreList.push(item) : ''
    }) : ''
    return (
      <Scroll className={styles.scroll}
        ref={ref => { this.scrollCt = ref }}
        doPullDownFresh={() => this.getAllAppHotStores(false)}
        pullUpLoadMoreData={() => this.getAllAppHotStores(true)}
        pullUpLoad={this.props.haveNext}
      >
        <div className={styles.body}>
          <p className={styles.tips}>排行榜基于浙江健康导航App用户大数据，经算法自动计算，每日更新，展示商户排名。</p>
          <div className={listStyle.list}>
            <ul>
              {
                allStoreList.length > 0 ?
                  allStoreList.map((item, index) => {
                    const bgImgStore = item.storeLogo ? item.storeLogo.path : BannerrImg
                    // let bgImgSpan = index<=0?rankone: 0<index<=1?ranktwo:'www'
                    let bgImgSpan = ''
                    let spanNum = ''
                    if (index <= 2) {
                      bgImgSpan = rankone
                      spanNum = index + 1
                    } else if (2 < index <= 9) {
                      bgImgSpan = ranktwo
                      spanNum = index + 1
                    }
                    const distanceNum = item.distance ? item.distance > 1000 ? item.distance / 1000 : item.distance : 0
                    const pricePerPerson = item.pricePerPerson ? item.pricePerPerson / 100 : 0
                    return (
                      <li ref="test" onClick={() => this.toStoreHome(item.storeId)} key={item.storeId}>
                        <div className={listStyle.liLeft}
                          style={{
                            background: 'url(' + bgImgStore + ')  no-repeat center',
                            backgroundSize: '100% 100%'
                          }}
                        >
                          <span
                            style={{
                              background: 'url(' + bgImgSpan + ')  no-repeat center',
                              backgroundSize: 'cover'
                            }}
                          >{index + 1}</span>
                        </div>
                        <div className={listStyle.liRight}>
                          <div className={listStyle.liTitle}>{item.storeName}</div>
                          <div className={listStyle.liPrice}>
                            {/* <span>4.8分</span> */}
                            {
                              item.pricePerPerson > 0 ? item.distance ?
                                <b>¥{pricePerPerson > 0 ? pricePerPerson.toFixed(2) : ''}/人</b> :
                                <b style={{ background: 'none' }}>¥{pricePerPerson > 0 ? pricePerPerson.toFixed(2) : ''}/人</b> : ''
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
                            item.hotGoodsName ? <div ref="update" className={listStyle.dec} onClick={(e) => {
                              this.toProductInfo(e, item.hotGoodsId)
                            }}>
                              {
                                item.hotGoodsName ? <span>hot</span> : ''
                              }
                              <p>{item.labels ? item.labels.length > 0 ? '[' + item.labels[0].labelName + "]" : '' : ''}{item.hotGoodsName}</p>
                            </div> : ''
                          }

                        </div>
                      </li>
                    )
                  })
                  : ''
              }
            </ul>

          </div>
          {this.props.haveNext ? <footer>— 加载中 —</footer> : <footer>— 已加载全部 —</footer>
          }
        </div>
      </Scroll>
    );
  }
}

export default ShopList;
