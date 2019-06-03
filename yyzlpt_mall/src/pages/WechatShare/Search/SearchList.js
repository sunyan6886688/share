import React, { PureComponent } from 'react';
import styles from './Index.less';
import listStyle from '../../list.less'
import BannerrImg from '@/assets/banner@2x.png'
import router from 'umi/router';
class SerachList extends PureComponent {
  //跳转到产品
  toProductInfo = (e, id) => {
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
  // 商家列表
  creatStoreLi = (itme) => {

  }

  componentWillReceiveProps(nextProps, nextState) {
    this.forceUpdate();
  }


  render() {
    const { searchType, searchKey } = this.props
    const searchList = this.props.searchList
    const storeInfoList = searchList ? searchList.storeInfoList : []
    const offerInfoList = searchList ? searchList.offerInfoList : []
    const styleHide = !searchType ? {
      display: 'block'
    } : {
        display: 'none'
      }
    const styleMargin = !searchType ? {
      marginTop: '0'
    } : {
        marginTop: '.5rem'
      }
    const liNum = searchType == 0 ? 3 : 9999999
    return (
      <div className={styles.SerachListBox}>
        <nav>
          <div className={this.props.searchType == 0 ? styles.choose : ''}
            onClick={() => this.props.changeStateAll('searchType', 0)}>综合</div>
          <div className={this.props.searchType == 1 ? styles.choose : ''}
            onClick={() => this.props.changeStateAll('searchType', '1')}>商家</div>
          <div className={this.props.searchType == 2 ? styles.choose : ''}
            onClick={() => this.props.changeStateAll('searchType', '2')}>商品</div>
        </nav>
        {storeInfoList.length > 0 && searchType != 2 ?
          <div className={listStyle.listTitleT} style={styleHide}>
            <span >商家</span><b onClick={() => this.props.changeStateAll('searchType', '1')}>查看更多</b>
          </div>
          : ''
        }

        <div className={listStyle.list} style={styleMargin}>
          <ul>
            {
              storeInfoList && searchType != 2 ?
                storeInfoList.map((item, index) => {
                  if (index < liNum) {
                    const Background = item.storeLogo ? item.storeLogo.path : BannerrImg
                    const storeName = item.storeName.replace(new RegExp(searchKey, "g"), '<*>' + searchKey + '<*>')
                    let storeNameArray = storeName.split('<*>');
                    let storeNameAr = [];
                    for (let i = 0; i < storeNameArray.length; i++) {

                      storeNameArray[i] === searchKey ?
                        storeNameAr.push(<b key={i} style={{ color: 'rgb(12, 102, 255)' }}>{storeNameArray[i]}</b>) :
                        storeNameAr.push(<b key={i} >{storeNameArray[i]}</b>)
                        ;
                    }
                    const hotCommodityName = item.hotCommodityName ? item.hotCommodityName.replace(new RegExp(searchKey, "g"), '<*>' + searchKey + '<*>') : ''
                    let hotCommodityNameArray = hotCommodityName.split('<*>');
                    let hotCommodityNameAr = [];
                    for (let i = 0; i < hotCommodityNameArray.length; i++) {

                      hotCommodityNameArray[i] === searchKey ?
                        hotCommodityNameAr.push(<b key={i} style={{ color: 'rgb(12, 102, 255)' }}>{hotCommodityNameArray[i]}</b>) :
                        hotCommodityNameAr.push(<b key={i} >{hotCommodityNameArray[i]}</b>)
                        ;
                    }
                    console.log(hotCommodityNameArray)
                    let commodityLabelsName = ''
                    item.commodityLabels ? item.commodityLabels.map(itemlable => {

                      if (itemlable == searchKey) {
                        commodityLabelsName = <b style={{ color: 'rgb(12, 102, 255)' }}>{itemlable}</b>
                      }
                    }) : ''
                    const distanceNum = item.distance ? item.distance > 1000 ? item.distance / 1000 : item.distance : 0
                    const pricePerPerson = item.pricePerPerson ? item.pricePerPerson / 100 : 0
                    return (
                      <li key={item.id} onClick={() => this.toStoreHome(item.id)}>
                        <img className={listStyle.liLeft} src={Background}/>
                        <div className={listStyle.liRight}>
                          <div className={listStyle.liTitle}>{storeNameAr}</div>
                          <div className={listStyle.liPrice}>
                            {/* <span>4.8分</span> */}
                            {item.pricePerPerson > 0 ? item.distance ?
                              <b>¥{pricePerPerson.toFixed(2)}/人</b>
                              :
                              <b style={{ background: 'none' }}>¥{pricePerPerson.toFixed(2)}/人</b> : ''
                            }
                            {item.distance > 100 ?
                              <i>距您{distanceNum.toFixed(2)}{item.distance > 1000 ? 'km' : 'm'}</i> :
                              ''
                            }
                            {item.distance != null && item.distance <= 100 ?
                              <i>距您小于100m</i> :
                              ''
                            }</div>
                          {item.hotCommodityName ?
                            <div className={listStyle.dec} onClick={(e) => {
                              this.toProductInfo(e, item.hotCommodityId)
                            }}>
                              <span>hot</span>
                              <p>
                                {
                                  item.commodityLabels ?

                                    <i>[{commodityLabelsName ? commodityLabelsName : item.commodityLabels[0]}]</i>
                                    : ''
                                }
                                {hotCommodityNameAr}</p>
                            </div>
                            : ''
                          }
                        </div>
                      </li>
                    )
                  }

                }
                )
                : ''
            }
          </ul>
        </div>
        {offerInfoList.length > 0 && searchType != 1 ?
          <div className={listStyle.listTitleT} style={styleHide}>
            <span >商品</span><b onClick={() => this.props.changeStateAll('searchType', '2')}>查看更多</b>
          </div>
          : ''
        }
        <div className={listStyle.serverList} style={styleMargin}>
          <ul>
            {
              offerInfoList && searchType != 1 ? offerInfoList.map((item, index) => {
                if (index < liNum) {
                  const originalPrice = item.originalPrice ? item.originalPrice / 100 : 0
                  let commodityLabelNames = ''
                  item.commodityLabelNames ? item.commodityLabelNames.map(itemlable => {

                    if (itemlable == searchKey) {

                      commodityLabelNames = <b style={{ color: 'rgb(12, 102, 255)' }}>{itemlable}</b>

                    }
                  }) : ''
                  return (
                    <li key={item.commodityId} onClick={(e) => this.toProductInfo(e, item.commodityId)}>
                      <img className={listStyle.liLeft} src={item.commodityLogo.path} />
                      <div className={listStyle.liRight}>
                        <div className={listStyle.liTitle}>
                          <span>hot</span>
                          {
                            item.commodityLabelNames ?

                              <i>[{commodityLabelNames ? commodityLabelNames : item.commodityLabelNames[0]}]</i>
                              : ''
                          }
                          {item.commodityName}
                        </div>
                        <div className={listStyle.liPrice}>
                          {originalPrice > 0 ?
                            <b>¥{originalPrice.toFixed(2)}
                            </b>
                            : ''}

                        </div>
                      </div>
                      {item.dueDate ? <div className={listStyle.num}>
                        已预约{item.dueDate}
                        人
                  </div> : ''
                      }

                    </li>
                  )
                }

              }


              ) : ''}
          </ul>
        </div>
        {
          searchType == 1 && storeInfoList.length == 0 ?
            <div className={styles.searchNoBox}>
              <p >没有搜索结果</p>
            </div>
            : ''

        }
        {
          searchType == 2 && offerInfoList.length == 0 ?
            <div className={styles.searchNoBox}>
              <p >没有搜索结果</p>
            </div>
            : ''

        }
        {
          searchType == 0 && storeInfoList.length == 0 && offerInfoList.length == 0 ?
            <div className={styles.searchNoBox}>
              <p >没有搜索结果</p>
            </div>
            : ''

        }

      </div>
    );
  }
}
export default SerachList;
