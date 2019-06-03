import React, { PureComponent, Fragment } from 'react';
import styles from './StoreList.less';
import listStyle from '../list.less';
import Scroll from 'components/Scroll/index';
import ViewBox from 'components/ViewBox/index';
import TransfromDom from 'components/Popup/index';
import Model from 'components/Popup/model.js';
import AjaxLoadding from 'components/AjaxLoadding/Loadding';
import BannerrImg from '../../assets/noBg.png';
import { connect } from 'dva';
import router from 'umi/router';
import { getRect, addClass, removeClass, offsetBody } from 'utils/dom';
import { conditionalExpression } from '@babel/types';

let scrollHight = '';
@connect(({ storelist, home }) => ({
  AareByParentCode: home.AareByParentCode,
  StoreList: storelist.StoreList,
  HotStoreList: storelist.HotStoreList,
  AllUsedTags: storelist.AllUsedTags,
  haveNext: storelist.haveNext,
}))
class StoreList extends PureComponent {
  state = {
    labelId: '',
    areaCode: localStorage.getItem('UserChooseCityCode'),
    areaName: localStorage.getItem('areaName'),
    tabNUm: 0,
    type: 1,
    pageNum: '1',
    tabShow: false,
    chooseFlage: false,
    scrollTop: '',
    labelName: '全部',
    sortType: '1',
    sortTypeName: '智能排序',
    allStoreList: [],
  };
  componentDidMount = () => {
    this.transfromDom = new TransfromDom({ id: 'pickerRadio' });
    this.Loadding = new TransfromDom({ id: 'rcLoadding' });
    this.queryAareByParentCode();
    this.getAllUsedTags();
    this.setState(
      {
        labelId: localStorage.getItem('labelId') || '',
        labelName:
          localStorage.getItem('labelName') === '商家列表'
            ? '全部'
            : localStorage.getItem('labelName'),
        sortType: localStorage.getItem('sortType') || '1',
        areaCode: localStorage.getItem('areaCode'),
      },
      () => {
        this.getStoreList();
        this.getHotStoreList();
      }
    );
  };
  componentDidUpdate() {
    if (this.hosStore) {
      this.offsetTop = getRect(this.hosStore).height;
    }
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'storelist/clearStroeList',
    });
    // allStoreList = []
    this.transfromDom && this.transfromDom.destroy();
  }

  // 获取浙江所有的市
  queryAareByParentCode = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/queryAareByParentCode',
      payload: {
        areaCode: '330000',
      },
    });
  };
  getAllUsedTags = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storelist/getAllUsedTags',
    });
  };
  getQueryString = name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  };
  // 人气商家查看更多
  toRankingList = () => {
    router.push({
      pathname: `/rankingList`,
    });
  };
  // 跳转门店主页
  toStoreHome = storeId => {
    router.push({
      pathname: `/storeHome`,
      query: {
        storeId: storeId,
      },
    });
  };
  //跳转到产品
  toProductInfo = (e, id) => {
    e.stopPropagation();
    router.push({
      pathname: `/ProductOrder/ProductInfo`,
      query: { commodityId: id },
    });
  };
  // 搜索点击跳转
  toSearch = () => {
    localStorage.setItem('changState', 0);
    localStorage.setItem('keyWord', '');
    localStorage.setItem('searchType', '');
    router.push({
      pathname: `/search`,
    });
  };
  // 获取人气商家
  getHotStoreList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storelist/getHotStoreList',
      payload: {
        gisLat: '',
        gisLng: '',
        labelId: this.state.labelId,
      },
    });
  };
  // 获取门店列表
  getStoreList = isLoadMore => {
    if (this.props.haveNext === false && isLoadMore) {
      return Promise.resolve();
    }
    const { dispatch } = this.props;
    this.pageNum = !isLoadMore ? 1 : this.pageNum + 1;
    if (!isLoadMore) {
      this.setState({
        allStoreList: [],
      });
    }
    localStorage.setItem('labelId', this.state.labelId);
    localStorage.setItem('sortType', this.state.sortType);
    localStorage.setItem('areaCode', this.state.areaCode);
    localStorage.setItem('labelName', this.state.labelName);
    // this.Loadding.renderToDom(this.renderLoadding())

    return dispatch({
      type: 'storelist/getStoreList',
      payload: {
        areaCode:
          this.state.areaCode != 'null' && this.state.areaCode != 'undefined'
            ? this.state.areaCode
            : '',
        gisLat: localStorage.getItem('UserCityLat') || '',
        gisLng: localStorage.getItem('UserCityLng') || '',
        labelId: this.state.labelId,
        sortType: this.state.sortType,
        pageNum: this.pageNum,
        pageSize: 10,
      },
    })
      .then(data => {
        if (!data) return;
        if (!data.appStores) return;
        if (data.appStores.length === 0) return;

        let oldStoreList = [...this.state.allStoreList];
        data.appStores.forEach(item => {
          oldStoreList.push(item);
        });

        this.setState({
          allStoreList: oldStoreList,
        });
      })
      .finally(err => {
        let { tabbar, scrollCt, Loadding, state } = this;
        Loadding.renderToDom('');
        if (!isLoadMore && state.tabShow) {
          setTimeout(() => {
            scrollCt.scrollToElement(tabbar, 500);
          }, 20);
        }
      });
  };
  chooseBoxOne = num => {
    const time = 500;
    this.scrollCt.scrollToElement(this.tabbar, time);
    setTimeout(() => {
      this.chooseBoxTwo(num);
    }, time * 1.5);
  };
  chooseBoxTwo = num => {
    let { tabNUm } = this.state;
    if (tabNUm === num) {
      num = 0;
    }
    this.setState(
      {
        tabNUm: num,
      },
      () => {
        this.reRender();
      }
    );
  };
  reRender = () => {
    this.transfromDom && this.transfromDom.renderToDom(this.renderPicker());
  };
  chooseCity = item => {
    this.setState(
      {
        areaCode: item.areaCode,
        areaName: item.areaName,
        tabNUm: 0,
      },
      () => {
        this.reRender();
        this.getStoreList();
      }
    );
  };
  chooselable = item => {
    this.setState(
      {
        tabNUm: 0,
        labelId: item ? item.tagId : '',
        labelName: item ? item.tagName : '全部',
      },
      () => {
        this.reRender();
        this.getStoreList();
        this.getHotStoreList();
      }
    );
  };
  chooseSortType = item => {
    this.setState(
      {
        tabNUm: 0,
        sortType: item.sortType,
        sortTypeName: item.sortTypeName,
      },
      () => {
        this.reRender();
        this.getStoreList();
      }
    );
  };
  doScroll = ({ y }) => {
    let { tabShow } = this.state;
    if (y + this.offsetTop < 5 && !tabShow) {
      this.setState(
        {
          tabShow: true,
        },
        () => {
          setTimeout(() => {
            this.reRender();
          }, 20);
        }
      );
    }
    if (y + this.offsetTop > 5 && tabShow) {
      this.setState({
        tabShow: false,
      });
    }
  };
  renderLoadding() {
    return (
      <Model showModel={true} isCenter={true}>
        <AjaxLoadding />
      </Model>
    );
  }
  renderHeader() {
    return (
      <header>
        <div className={styles.search} onClick={this.toSearch}>
          <span />
          <input placeholder="医疗机构/商家/商品" />
        </div>
      </header>
    );
  }
  renderFixedTab() {
    let { areaName, labelName, sortTypeName, tabNUm, tabShow } = this.state;
    let listTab = [areaName, labelName, sortTypeName];
    if (!tabShow) {
      return '';
    }
    // console.log(listTab)
    return (
      <div
        className={styles.tab}
        ref={ref => {
          this.fixedTab = ref;
        }}
      >
        {listTab.map((item, index) => {
          // console.log(index)
          let { tabBoxActive, tabBox } = styles;
          if (index + 1 !== tabNUm) {
            tabBoxActive = '';
          }
          return (
            <div
              key={item + index}
              className={tabBox + ' ' + tabBoxActive}
              onClick={() => this.chooseBoxTwo(index + 1)}
            >
              <i>{item}</i>
              <span />
            </div>
          );
        })}
      </div>
    );
  }
  renderPicker() {
    const { StoreList, HotStoreList, AareByParentCode } = this.props;
    const lableList = this.props.AllUsedTags || [];
    const sortTypeList = [
      {
        sortType: '1',
        sortTypeName: '智能排序',
      },
      {
        sortType: '2',
        sortTypeName: '距离排序',
      },
      {
        sortType: '3',
        sortTypeName: '人气排序',
      },
    ];
    let { areaName, tabNUm, tabShow } = this.state;
    let areaList;
    if (!this.fixedTab) {
      return '';
    }
    if (!this.fixedTabTop) {
      this.fixedTabTop = offsetBody(this.fixedTab) + getRect(this.fixedTab).height;
    }
    if (AareByParentCode && AareByParentCode.pubAreaBoList.length) {
      areaList = AareByParentCode.pubAreaBoList.map(item => {
        let areaName = item.areaName.replace('市', '');
        let areaCode = item.areaCode;
        return {
          areaName,
          areaCode,
        };
      });
      areaList.unshift({ areaName: '全部', areaCode: '' });
    }
    return (
      <Model
        showModel={tabShow && tabNUm !== 0}
        top={this.fixedTabTop}
        useAnimate={tabNUm !== 0}
        maskClose={() => {
          this.chooseBoxTwo(0);
        }}
      >
        <div className={styles.chooseBox}>
          {this.state.tabNUm == 1 ? (
            <div className={styles.cityBox}>
              <ul>
                {areaList
                  ? areaList.map(item => {
                      let isSelect = item.areaName === areaName ? styles.choose : '';
                      return (
                        <li
                          key={item.areaCode}
                          onClick={() => this.chooseCity(item)}
                          className={isSelect}
                          key={item.areaCode}
                        >
                          {item.areaName}{' '}
                        </li>
                      );
                    })
                  : ''}
              </ul>
            </div>
          ) : (
            ''
          )}
          {this.state.tabNUm == 2 ? (
            <div className={styles.lableBox}>
              <ul>
                {this.state.labelName == '全部' ? (
                  <li className={styles.choose} onClick={() => this.chooselable()}>
                    全部
                  </li>
                ) : (
                  <li onClick={() => this.chooselable()}>全部</li>
                )}

                {lableList
                  ? lableList.length > 0
                    ? lableList.map(item => {
                        const labelName = item.tagName;
                        if (labelName == this.state.labelName) {
                          return (
                            <li
                              key={labelName}
                              onClick={() => this.chooselable(item)}
                              className={styles.choose}
                            >
                              {labelName}{' '}
                            </li>
                          );
                        } else {
                          return (
                            <li key={labelName} onClick={() => this.chooselable(item)}>
                              {labelName}{' '}
                            </li>
                          );
                        }
                      })
                    : ''
                  : ''}
              </ul>
            </div>
          ) : (
            ''
          )}
          {/* 智能排序 */}
          {this.state.tabNUm == 3 ? (
            <div className={styles.sortTypeBox}>
              <ul>
                {sortTypeList
                  ? sortTypeList.length > 0
                    ? sortTypeList.map(item => {
                        const sortTypeName = item.sortTypeName;
                        if (sortTypeName == this.state.sortTypeName) {
                          return (
                            <li
                              key={sortTypeName}
                              onClick={() => this.chooseSortType(item)}
                              className={styles.choose}
                            >
                              {sortTypeName}{' '}
                            </li>
                          );
                        } else {
                          return (
                            <li key={sortTypeName} onClick={() => this.chooseSortType(item)}>
                              {sortTypeName}{' '}
                            </li>
                          );
                        }
                      })
                    : ''
                  : ''}
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      </Model>
    );
  }

  render() {
    const { StoreList, HotStoreList } = this.props;
    let { tabShow } = this.state;
    let { tabShowCls, list } = listStyle;
    let listClass = [list, tabShow ? tabShowCls : ''].join(' ');
    const { allStoreList } = this.state;

    return (
      <ViewBox header={this.renderHeader()}>
        <Scroll
          className={styles.scroll}
          ref={ref => {
            this.scrollCt = ref;
          }}
          doScroll={this.doScroll}
          fiexedElm={this.renderFixedTab()}
          doPullDownFresh={this.getStoreList}
          pullUpLoadMoreData={() => this.getStoreList(true)}
          pullUpLoad={this.props.haveNext}
        >
          <div
            ref={ref => {
              this.hosStore = ref;
            }}
          >
            {HotStoreList ? (
              HotStoreList.length > 0 ? (
                <div className={listStyle.listTitle}>
                  <span>人气商家</span>
                  <b onClick={this.toRankingList}>查看榜单</b>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            {HotStoreList ? (
              HotStoreList.length > 0 ? (
                <div className={`${styles.hotStoreList} originEvent`}>
                  <ul>
                    {HotStoreList
                      ? HotStoreList.length > 0
                        ? HotStoreList.map(item => {
                            const Background = item.storeLogo ? item.storeLogo.path : BannerrImg;
                            return (
                              <li onClick={() => this.toStoreHome(item.storeId)} key={item.storeId}>
                                <img src={Background} />
                                <p>{item.storeName}</p>
                              </li>
                            );
                          })
                        : ''
                      : ''}
                    {HotStoreList ? (
                      HotStoreList.length > 2 ? (
                        <li style={{ marginRight: '.24rem', width: '1px' }}>
                          <div style={{ width: '1px' }} />
                        </li>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </ul>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
          <div className={styles.tabTwo} ref="test" ref={ref => (this.tabbar = ref)}>
            {HotStoreList && HotStoreList.length ? (
              <div className={styles.tabTwo}>
                <div className={styles.tabBox} onClick={() => this.chooseBoxOne(1)}>
                  <i>{this.state.areaName}</i>
                  <span />
                </div>
                <div className={styles.tabBox} onClick={() => this.chooseBoxOne(2)}>
                  <i>{this.state.labelName}</i>
                  <span />
                </div>
                <div className={styles.tabBox} onClick={() => this.chooseBoxOne(3)}>
                  <i>{this.state.sortTypeName}</i>
                  <span />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className={styles.content}>
            <div className={listClass}>
              <ul>
                {allStoreList
                  ? allStoreList.length > 0
                    ? allStoreList.map(item => {
                        const Background = item.storeLogo ? item.storeLogo.path : BannerrImg;
                        const distanceNum = item.distance
                          ? item.distance > 1000
                            ? item.distance / 1000
                            : item.distance
                          : 0;
                        const pricePerPerson = item.pricePerPerson ? item.pricePerPerson / 100 : 0;
                        return (
                          <li onClick={() => this.toStoreHome(item.storeId)} key={item.storeId}>
                            <img className={listStyle.liLeft} src={Background} />
                            <div className={listStyle.liRight}>
                              <div className={listStyle.liTitle}>{item.storeName}</div>
                              <div className={listStyle.liPrice}>
                                {/* <span>4.8分</span> */}
                                {item.pricePerPerson > 0 ? (
                                  item.distance ? (
                                    <b>
                                      ¥{pricePerPerson.toFixed(2)}
                                      /人
                                    </b>
                                  ) : (
                                    <b style={{ background: 'none' }}>
                                      ¥{pricePerPerson.toFixed(2)}
                                      /人
                                    </b>
                                  )
                                ) : (
                                  ''
                                )}

                                {item.distance > 100 ? (
                                  <i>
                                    距您
                                    {distanceNum.toFixed(2)}
                                    {item.distance > 1000 ? 'km' : 'm'}
                                  </i>
                                ) : (
                                  ''
                                )}
                                {item.distance != null && item.distance <= 100 ? (
                                  <i>距您小于100m</i>
                                ) : (
                                  ''
                                )}
                              </div>
                              {item.hotGoodsName ? (
                                <div
                                  className={listStyle.dec}
                                  onClick={e => {
                                    this.toProductInfo(e, item.hotGoodsId);
                                  }}
                                >
                                  {item.hotGoodsName ? <span>hot</span> : ''}

                                  <p>
                                    {item.hotGoodsLabels
                                      ? item.hotGoodsLabels.length > 0
                                        ? '[' + item.hotGoodsLabels[0].tagName + ']'
                                        : ''
                                      : ''}
                                    {item.hotGoodsName}
                                  </p>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </li>
                        );
                      })
                    : ''
                  : ''}
              </ul>
            </div>
            {/* {
              this.state.chooseFlage ?
                <div
                  className={styles.chooseBoxShadow}
                  onClick={() => this.hiddenSerachBox()}>
                </div>
                : ''
            }
    */}
            {this.props.haveNext ? <footer>— 加载中 —</footer> : <footer>— 已加载全部 —</footer>}
          </div>
        </Scroll>
      </ViewBox>
    );
  }
}

export default StoreList;
