import React, { PureComponent } from 'react';
import styles from './ProductList.less';
import listStyle from '../../list.less'
import BannerrImg from '@/assets/noBg.png'
import { Carousel, WingBlank } from 'antd-mobile';
import Active from '@/assets/Active@2x.png';
import router from 'umi/router';
import { connect } from 'dva';
import Scroll from 'components/Scroll/index'
import ViewBox from 'components/ViewBox/index'
import userStatisticPage from 'utils/utils'
let startTime=''
let endTime=''
let allStoreList = []
@connect(({ store }) => ({
  StoreInfo: store.StoreInfo,
  Categorys: store.Categorys,
  ProductTags: store.ProductTags,
  ProductList: store.ProductList,
  haveNext: store.haveNext,
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.pageNum = 1;
    this.state = {
      imgHeight: ' 180px',
      chooseFlage: false,
      tabNUm: '2',
      CategorysCodeO: '全部',
      CategorysCodeT: '全部',
      serverList: [{
        serviceName: '通用服务',
        serviceCode: '100'
      },
      {
        serviceName: '体检服务',
        serviceCode: '102'
      }, {
        serviceName: '咨询服务',
        serviceCode: '101'
      }, {
        serviceName: '挂号服务',
        serviceCode: '103'
      },
      ],
      serviceId: '',
      tagId: '',
    };
  }
  componentWillUnmount =()=> {
    endTime=new Date().getTime()
    if(endTime-startTime>2000){
      userStatisticPage(1,"hcStoreProductListPage",{},startTime,endTime)
    } 
  }
  componentDidMount = () => {
    startTime=new Date().getTime()
    // this.getAppHotOffers()
    this.props.dispatch({
      type: 'store/clearProductList'
    });

    this.getCategorys()
    this.getProductTags()
    const serviceCode = this.state.serverList.find(item => {
      if (item.serviceName == this.getQueryString('serviceName')) {
        return item.serviceCode
      }
    })
    this.setState({
      serviceId: serviceCode ? serviceCode.serviceCode : ''
    }, () => {
      console.log(this.state.serviceId)
      this.getProductList()
    })

  }
  //跳转到产品
  toProductInfo = (id) => {
    router.push({
      pathname: `/share/ProductOrder/ProductInfo`,
      query: { commodityId: id, }
    });
  }
  getAppHotOffers = () => {
    console.log('000')
    const { dispatch } = this.props
    dispatch({
      type: 'store/getAppHotOffers',
      payload: {
        "platType": 2,
        "storeId": 328
      }
    })
  }
  getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  }
  getProductTags = () => {
    console.log('000')
    const { dispatch } = this.props
    dispatch({
      type: 'store/getProductTags',
      payload: {
        "storeId": this.getQueryString('storeId')
      }
    })
  }

  getProductList = (isLoadMore) => {
    if(this.props.haveNext===false&&isLoadMore){
      return Promise.resolve()
    }
    this.pageNum = isLoadMore ? this.pageNum + 1 : 1;
    const categoryId = this.state.CategorysCodeT == '全部' ? this.state.CategorysCodeO == '全部' ? '' : this.state.CategorysCodeO : this.state.CategorysCodeT
    const tagId = this.state.tagId ? this.state.tagId.substring(1, this.state.tagId.length).split('-') : []
    const value = {
      "categoryId": categoryId,
      "pageSize": 10,
      "serviceId": this.state.serviceId, 
      "pageNum": this.pageNum ,
      "storeId": this.getQueryString('storeId'),
      "tagIdList": tagId,
      "token": "",
    }
    if (!isLoadMore) {
      allStoreList = []
    }
    const { dispatch } = this.props
    return dispatch({
      type: 'store/getProductList',
      payload: value
    })
  }
  getCategorys = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'store/getCategorys',
      payload: {}
    })
  }
  chooseBoxOne = (num) => {
    document.body.scrollTop = this.state.scrollHight + 1;
    document.documentElement.scrollTop = this.state.scrollHight + 1
    this.setState({
      tabNUm: num,
      chooseFlage: true,
    })
  }
  chooseBoxTwo = (num) => {
    if (num == this.state.tabNUm) {
      this.setState({
        tabNUm: num,
        chooseFlage: false
      })
    } else {
      this.setState({
        tabNUm: num,
      })
    }
  }
  chooseCategorysParent = (val) => {
    this.setState({
      CategorysCodeO: val
    })
  }
  hiddenSerachBox = () => {
    this.setState({
      chooseFlage: false,
    })
  }
  chooseCategorysChild = (val) => {
    this.setState({
      CategorysCodeT: val,
      chooseFlage: false,
    }, () => {
      this.getProductList()
    })
  }
  chooseserviceId = (val) => {
    this.setState({
      serviceId: val
    })
  }
  restBtn = () => {
    this.setState({
      serviceId: '',
      tagId: ''
    })
  }
  sureBtn = () => {
    this.setState({
      chooseFlage: false,
    }, () => {
      this.getProductList()
    })
  }
  choosetagId = (val) => {
    console.log(val)
    let tagIdNew = this.state.tagId.split('-')
    if (tagIdNew.indexOf(String(val)) < 0) {
      tagIdNew.push(val)
    } else {
      tagIdNew.splice(tagIdNew.findIndex(item => item == val), 1)
    }

    this.setState(Object.assign({}, this.state, {
      tagId: tagIdNew.join('-')
    }));

  }

  renderHeader() {
    const { StoreInfo, Categorys, ProductTags } = this.props
    let CategorysParent = Categorys || []
    let CategorysChild = []
    const { serviceId, tagId, serverList } = this.state
    const tagIdArr = tagId.split('-')

    const { CategorysCodeO, CategorysCodeT } = this.state
    CategorysParent.length > 0 ? CategorysParent.map(item => {
      if (CategorysCodeO == "全部") {
        item.categoryInfoBoList ? item.categoryInfoBoList.map(i => {
          CategorysChild.push(i)
        }) : ''
      } else if (CategorysCodeO == item.id) {
        item.categoryInfoBoList ? item.categoryInfoBoList.map(i => {
          CategorysChild.push(i)
        }) : ''
      }
    }) : ''
    return (
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.tab}>
            {
              this.state.tabNUm == 1 && this.state.chooseFlage ?
                <div className={styles.tabBoxActive} onClick={() => this.chooseBoxTwo(1)}>
                  <i>分类</i><span ></span>
                </div> :
                <div className={styles.tabBox} onClick={() => this.chooseBoxOne(1)}>
                  <i>分类</i><span ></span>
                </div>
            }
            {
              this.state.tabNUm == 2 && this.state.chooseFlage ?
                <div className={styles.tabBoxActive}
                  style={{ background: 'none' }}
                  onClick={() => this.chooseBoxTwo(2)}>
                  <i>筛选</i><span ></span>
                </div> :
                <div className={styles.tabBox}
                  style={{ background: 'none' }}
                  onClick={() => this.chooseBoxOne(2)}>
                  <i>筛选</i><span ></span>
                </div>
            }
          </div>
        </div>
        {
          this.state.chooseFlage ?
            <div className={styles.chooseBoxShadow} onClick={() => this.hiddenSerachBox()}></div>
            : ''
        }
        {
          this.state.chooseFlage ?
            <div className={styles.chooseBox}>
              {this.state.tabNUm == 1 ?
                <div className={styles.chooseCategorys}>
                  <div className={styles.left}>
                    <ul>
                      {CategorysCodeO == "全部" ?
                        <li className={styles.activeLi}
                          onClick={() => this.chooseCategorysParent('全部')}>全部</li> :
                        <li onClick={() => this.chooseCategorysParent('全部')}>全部</li>
                      }
                      {
                        CategorysParent.length > 0 ? CategorysParent.map(item => {
                          if (CategorysCodeO == item.id) {
                            return (
                              <li className={styles.activeLi}
                                key={item.id}
                                onClick={() => this.chooseCategorysParent(item.id)}>
                                {item.catName}</li>
                            )
                          } else {
                            return (
                              <li 
                                key={item.id}
                                onClick={() => this.chooseCategorysParent(item.id)}>
                                {item.catName}</li>
                            )
                          }

                        }) : ''
                      }
                    </ul>
                  </div>
                  <div className={styles.right}>
                    <ul>
                      {CategorysCodeT == "全部" ?
                        <li className={styles.activeLi}
                          onClick={() => this.chooseCategorysChild('全部')}>全部</li> :
                        <li onClick={() => this.chooseCategorysChild('全部')}>全部</li>
                      }
                      {
                        CategorysChild.length > 0 ? CategorysChild.map(item => {
                          if (CategorysCodeT == item.id) {
                            return (
                              <li className={styles.activeLi}
                                onClick={() => this.chooseCategorysChild(item.id)}>
                                {item.catName}</li>
                            )
                          } else {
                            return (
                              <li
                                onClick={() => this.chooseCategorysChild(item.id)}>
                                {item.catName}</li>
                            )
                          }
                        }) : ''
                      }
                    </ul>
                  </div>
                  <div></div>
                </div>
                : ''
              }
              {this.state.tabNUm == 2 ?
                <div className={styles.STBox}>
                  <div className={styles.serviceBox}>
                    <h2>服务类型</h2>
                    <div>
                      {
                        serverList.map(item => {

                          const Span = serviceId == item.serviceCode ?
                            <span className={styles.choose} > {item.serviceName}</span> :
                            <span onClick={() => this.chooseserviceId(item.serviceCode)}>  {item.serviceName}</span>
                          return (
                            Span
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className={styles.TagBox}>
                    <h2>产品特色</h2>
                    <div>
                      {
                        ProductTags ? ProductTags.length > 0 ? ProductTags.map(item => {
                          const Span = tagIdArr.indexOf(String(item.tagId)) >= 0 ?
                            <span className={styles.choose} onClick={() => this.choosetagId(item.tagId)}> {item.tagName}</span> :
                            <span onClick={() => this.choosetagId(item.tagId)}>  {item.tagName}</span>
                          return (
                            Span
                          )
                        }) : '' : ''
                      }
                    </div>
                    <p><i onClick={this.restBtn}>重置</i><b onClick={this.sureBtn}>完成</b></p>
                  </div>
                </div>
                : ''
              }
            </div>
            : ''
        }
      </div>
    )
  }

  render() {
    const ProductList = this.props.ProductList || [];
    const allStoreListStr = JSON.stringify(allStoreList)
    ProductList ? ProductList.map(item => {
      allStoreListStr.indexOf(JSON.stringify(item)) < 0 ?
        allStoreList.push(item) : ''
    }) : ''

    return (
      <ViewBox header={this.renderHeader()}>
        <Scroll className={styles.scroll}
          ref={ref => { this.scrollCt = ref }}
          doPullDownFresh={() => this.getProductList(false)}
          pullUpLoadMoreData={() => this.getProductList(true)}
          pullUpLoad={this.props.haveNext}
        >
          <div className={styles.body}>
            <div className={listStyle.serverList} style={{ paddingTop: '0.24rem' }}>
              <ul>
                {
                  allStoreList ? allStoreList.length > 0 ?
                    allStoreList.map(itme => {
                      const bgImg = itme.images ? itme.images.imageUrl.path : BannerrImg
                      const marketingPrice = itme.marketingPrice ? itme.marketingPrice / 100 : 0
                      return (
                        <li onClick={() => this.toProductInfo(itme.id)} key={itme.id}>
                          <img src={bgImg} className={listStyle.liLeft}/>
                          <div className={listStyle.liRight}>
                            <div className={listStyle.liTitle}>
                              {
                                itme.isHot == 1 ? <span>hot</span> : ''
                              }
                              {itme.lableNameList ? '[' + itme.lableNameList[0] + ']' : ''}
                              {itme.offerName}

                            </div>
                            <div className={listStyle.liPrice}>
                              <b>¥{marketingPrice > 0 ? marketingPrice.toFixed(2) : 0}</b>
                            </div>
                          </div>
                          {itme.orderNum ?
                            <div className={listStyle.num}>
                              已预约{itme.orderNum}人</div>
                            : ''}

                        </li>
                      )
                    }

                    )
                    : '' : ''
                }
              </ul>
            </div>
            {
              this.props.haveNext ? <footer>— 加载中 —</footer> : <footer>— 已加载全部 —</footer>
            }
          </div>
        </Scroll>
      </ViewBox>    
    );
  }
}
export default Index;
