/*
* @Author: Jan-superman
* @Date: 2018-09-27 20:38:37
* @Last Modified by: Jan-superman
* @Last Modified time: 2018-11-07 23:33:55
*/
import React, { PureComponent } from 'react';
import { Icon, Carousel, WingBlank, Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './ProductInfo.less';
import photo from '@/assets/OrderDetails/photo.png';
import cs from 'classnames';
import jkdh from '@/utils/jkdh'
import { Toast } from 'antd-mobile';
import ImgPreview from '@/components/ImgPreview';
import userStatisticPage from 'utils/utils'
// import FastClick from 'fastclick'
// FastClick.attach(document.body)
let startTime=''
let endTime=''
@connect(({ order }) => ({
  // 预约通用服务  
  bookingorderId: order.bookingorderId,
  // 商品详情banner
  productInfoImages: order.productInfoImages,
  // 商品详情数据
  productInfoBoById: order.productInfoBoById

}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3'],
      offerId: '',
      navTop: false,
      isShow: false,
      showDetails: true,
      showHint: false,
      bannerIndex: 0,
      imgUrl: '',
      scrollTop: '',
      nextFlage: true,
      bannerList: [],
    }
    this.$tab = null;
    this.offsetTop = 0;
    this.numGetAut = 0;
    this.flag = true
  }
  componentDidMount() {
    startTime=new Date().getTime()
    window.scrollTo(0,0)
    // simulate img loading

    // 获取客户端商品详情
    this.getGoodsDataByGoodsId()

    // tab栏吸顶
    this.$tab = this.refs.tab
    if (this.$tab) {
      setTimeout(() => {
        this.offsetTop = this.$tab.offsetTop;
      }, 500);
      window.addEventListener('scroll', this.handleScroll);
    }
  }
  componentWillUnmount =()=> {
    endTime=new Date().getTime()
    if(endTime-startTime>2000){
      userStatisticPage(1,"hcProductDetailsPage",{},startTime,endTime)
    } 
  }
  // componentWillUnmount() {
  //   Toast.hide()
  // }

  // 点击商品详情
  showProductDetails = () => {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    this.setState({
      showDetails: true,
      showHint: false,
    })
    // tab栏吸顶 调用方法
    // if (this.state.navTop && scrollTop >= this.offsetTop) {
    this.productInfo && this.productInfo.scrollIntoView();
    // }
  }

  // 点击预约须知
  showProductHint = () => {
    this.flag = false
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    this.setState({
      showDetails: false,
      showHint: true,
    })
    // tab栏吸顶 调用方法
    // if (this.state.navTop && scrollTop >= this.offsetTop) {
    // 预约须知
    this.shopInform && this.shopInform.scrollIntoView();
    // }
    setTimeout(() => {
      this.flag = true
    }, 500);
  }

  // tab栏滚动
  handleScroll = (event) => {
    // 当前视图的高度
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 视图高度+滚动隐藏内容
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 滚动出去的距离
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    const isBottom = (clientHeight + scrollTop === scrollHeight)

    this.setState({
      scrollTop
    })

    if (this.flag) {
      if (this.shopInform && this.shopInform.offsetTop <= scrollTop) {
        this.setState({
          showDetails: false,
          showHint: true,
        })
      }
      if (this.shopInform && this.shopInform.offsetTop > scrollTop) {
        this.setState({
          showDetails: true,
          showHint: false,
        })
      }
    }
    // 页面滚动到底部
    if (isBottom) {
      this.setState({
        showDetails: false,
        showHint: true,
      })
    }

    if (!this.state.navTop && scrollTop >= this.offsetTop) {
      this.setState({
        navTop: true
      })
    }
    if (scrollTop < this.offsetTop) {
      this.setState({
        navTop: false
      })
    }
  }

  // 获取客户端商品详情
  getGoodsDataByGoodsId = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'order/getGoodsDataByGoodsId',
      payload: {
        "offerId": this.props.location.query.commodityId,
      }
    }).then((result) => {
      let bannerList = [];
      if (result && result.productInfoBoById) {
        const { images } = result.productInfoBoById;
        if (images) {
          bannerList = result.productInfoBoById.images.map(item => ({ id: item.imageId, path: item.imageUrl.path }))
        }
      }
      this.setState({
        offerId: this.props.location.query.commodityId,
        bannerList
      })
    })
  }
  // 立即预约
  goAppoint = () => {
    userStatisticPage(0,'hcProductDetailToBuyEvent',{},)
    const { dispatch } = this.props
    console.log('测试立即预约')
    let token = localStorage.getItem('token')
    if (token && token != 'undefined' && token != 'null') {
      router.push({
        pathname: '/share/ProductOrder/AffirmOrder',
        query: {
          offerId: this.state.offerId
        }
      })
    } else {
      if (this.numGetAut <= 3) {
        Toast.loading('登录中');
        this.getAuthCode()
      }
    }
  }
  getAuthCode = () => {
    this.numGetAut++
    const { dispatch } = this.props
    jkdh.auth.getAuthCode({
      scope: "snsapi_base",
      appId: "p9gbs1lwjzt1u8hstio2sjbivl19wgkx",
    }).then(res => {
      dispatch({
        type: 'order/login',
        payload: {
          code: res.res.code
        }
      }).then((data) => {
        if (data.result.isLogin) {
          Toast.hide()
          router.push({
            pathname: '/share/ProductOrder/AffirmOrder',
            query: {
              offerId: this.state.offerId
            }
          })
        } else if (!data.result.isLogin && this.numGetAut <= 3) {
          this.getAuthCode()
        } else {
          Toast.hide()
          Toast.fail('授权失败，账号异常请联系客服或尝试重启应用');
          this.setState({
            nextFlage: false
          })
        }
      })
    }).catch(resulet => {
      Toast.hide()
    })
  }
  // 图片放大
  magnify = () => {
    this.setState({ isShow: true })
  }

  // 图片收缩
  closeImg = index => {
    this.setState({
      isShow: false,
      bannerIndex: index
    })
  }


  render() {
    const { showDetails, showHint, navTop, previewVisible, previewImage, isShow, bannerIndex, bannerList } = this.state
    const productInfoImages = this.props.productInfoImages || []
    const productInfoBoById = this.props.productInfoBoById || {}
    const marketingPrice = productInfoBoById.marketingPrice ? productInfoBoById.marketingPrice / 100 : 0
    
    return (
      <WingBlank className={styles.orderBox} style={{ marginLeft: 0, marginRight: 0 }}>
        <div onClick={this.magnify}>
          <Carousel
            style={{ height: '4.2rem' }}
            autoplay={false}
            infinite
            selectedIndex={bannerIndex}
            dots={false}
            afterChange={index => this.setState({
              bannerIndex: index
            })}
          >
            {productInfoImages.length > 0 ? productInfoImages.map(val => (
              <a
                key={val.imageId}
                className={styles.bannerImg}
              >
                <img src={val.imageUrl.path} />
              </a>
            )) : ''}
          </Carousel>
        </div>
        <span>{this.state.bannerIndex + 1}/{productInfoImages.length}</span>
        <div className={styles.productContent}>
          <div className={styles.productTitle}>
            <h3>{productInfoBoById.offerName}</h3>
            <span>已预约{productInfoBoById.orderNum} 人</span>
          </div>
          <p>{productInfoBoById.productIntroduce}</p>
          <div className={styles.productServer}>
            <span>{productInfoBoById.serviceName}</span>
            {productInfoBoById && productInfoBoById.productTagInfoBos && productInfoBoById.productTagInfoBos.map((item,index) => {
              return <span key={index}>{item.tagName}</span>
            })}
          </div>
        </div>
        {/* 商品详情 */}
        <div className={styles.productList}>
          <div className={navTop ? styles.productDetailsFiexd : styles.productDetails} ref="tab">
            <h3 onClick={this.showProductDetails} style={{ color: showDetails ? '#0C66FF' : '#53627C' }}>商品详情</h3>
            <h3 onClick={this.showProductHint} style={{ color: showHint ? '#0C66FF' : '#53627C' }}>预约须知</h3>
          </div>
          {/* 商品详情 */}
          {/* {showDetails ? */}
          <div className={styles.showProductDetails} ref={(el) => { this.productInfo = el }}>
            <h3>商品详情</h3>
            <div id="innerHtml" dangerouslySetInnerHTML={{ __html: productInfoBoById.serviceDetail }} />
          </div>
          {/* : */}
          {/* // 预约须知   */}
          < div className={styles.showProductHint} ref={(el) => { this.shopInform = el }}>
            {/* 预约须知 */}
            <h3>预约须知</h3>
            <ul>
              <li>{productInfoBoById.buyNotice}</li>
            </ul>
          </div>
          {/* } */}
        </div>
        <div className={styles.footer}>
          <span className={styles.footerLeft}>¥{marketingPrice > 0 ? marketingPrice.toFixed(2) : 0}</span>
          {
            this.state.nextFlage ? <span className={styles.footerRight} onClick={() => { this.goAppoint() }}>立即预约</span> :
              <span className={styles.footerRight} style={{ background: '#888' }}>立即预约</span>
          }

        </div>

        {isShow &&
          <ImgPreview currIndex={bannerIndex}
            imgList={bannerList}
            onClose={this.closeImg} />
        }
      </WingBlank >
    )
  }
}

export default Index;