/*
* @Author: Jan-superman
* @Date: 2018-09-27 20:38:37
* @Last Modified by: Jan-superman
* @Last Modified time: 2018-11-07 23:33:55
*/
import React, { PureComponent } from 'react';
import { Icon, List, InputItem, WhiteSpace, Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './AffirmOrder.less';
import jkdh from '../../utils/jkdh'
import Notice from './Notice';
// import { log } from 'util';
import userStatisticPage from 'utils/utils'
let startTime = ''
let endTime = ''
let numGetAut = 0
const offsetHei = document.documentElement.clientHeight
@connect(({ order }) => ({
  // 产品详情数据
  productInfoBoById: order.productInfoBoById,
  productInfoLogImg: order.productInfoLogImg,
  // 用户信息
  appUserInfoBo: order.appUserInfoBo,
  // 订单ID
  bookingorderId: order.bookingorderId
}))

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      realName: '',
      mobile: '',
      orderId: '',
      memo: '',
      isNoticeShow: false
    };
    this.isSubmit = false
  }
  componentWillUnmount = () => {
    endTime = new Date().getTime()
    if (endTime - startTime > 2000) {
      userStatisticPage(1, "hcConfirmOrderPage", {}, startTime, endTime)
    }
  }
  componentDidMount = () => {
    startTime = new Date().getTime()
    // 获取客户端商品详情
    this.getGoodsDataByGoodsId()
    // 获取用户信息
    this.getAppUserInfoByToken()
  }
  getAuthCode = () => {
    numGetAut++
    const { dispatch } = this.props
    jkdh.auth.getAuthCode({
      scope: "snsapi_base",
      appId: "p9gbs1lwjzt1u8hstio2sjbivl19wgkx",
    }).then(res => {
      // console.log(res)
      dispatch({
        type: 'order/login',
        payload: {
          code: res.res.code
        }
      }).then((data) => {
        // console.log(data)
        if (data.result.isLogin) {
          router.push({
            pathname: '/ProductOrder/AffirmOrder',
            query: {
              offerId: this.state.offerId
            }
          })
        } else if (!data.result.isLogin && numGetAut <= 3) {
          this.getAuthCode()

        } else {
          Toast.fail('授权失败，账号异常请联系客服');
        }
      })
    })
  }
  // 获取用户信息
  getAppUserInfoByToken = () => {
    const { dispatch } = this.props
    const value = {
      token: localStorage.getItem('token'),
    }
    dispatch({
      type: 'order/getAppUserInfoByToken',
      // payload: {
      //   ...value
      // }
    }).then((data) => {
      // console.log(data);

      if (data.code == 200) {
        this.setState({
          realName: this.props.appUserInfoBo ? this.props.appUserInfoBo.realName : '',
          mobile: this.props.appUserInfoBo ? this.props.appUserInfoBo.mobile : '',
        })
      } else {
        if (numGetAut <= 3) {
          this.getAuthCode()
        }
      }
      // this.setState({
      //   realName: '赵旦旦',
      //   mobile: '17816866126'
      // })

    })
  }



  // 获取客户端商品详情
  getGoodsDataByGoodsId = () => {
    const { dispatch } = this.props
    const value = {
      "offerId": this.props.location.query.offerId,
    }

    dispatch({
      type: 'order/getGoodsDataByGoodsId',
      payload: {
        ...value
      }
    })
  }

  // 提交订单
  goAppoint = () => {
    const { dispatch, bookingorderId } = this.props
    // if (!this.state.memo) {
    //   Toast.info('请输入备注信息', 1.5);
    // } else {
    const value = {
      "linkMan": this.state.realName,
      "linkPhone": this.state.mobile,
      "memo": this.state.memo,
      "num": 1,
      "offerId": this.props.location.query.offerId
    }
    if (!(/^[^\s]*$/.test(this.state.realName))) {
      Toast.fail('请输入正确用户名', 1)
      return
    }
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.mobile))) {
      //alert("不是完整的11位手机号或者正确的手机号前七位");
      Toast.fail('请输入正确手机号', 1)
      return
    }
    if (this.isSubmit) {
      return
    }
    this.isSubmit = true
    dispatch({
      type: 'order/bookingCommonOrder',
      payload: {
        ...value
      }
    }).then((data) => {
      this.isSubmit = false
      // console.log(data)
      if (data.code == 200) {
        // if (bookingorderId && bookingorderId.orderId) {
        router.push({
          pathname: '/appointResult/appointSuccess',
          query: {
            orderId: this.props.bookingorderId.orderId,
            verificationCode: this.props.bookingorderId.verificationCode
          }
        })
      } else {
        router.push({
          pathname: '/appointResult/appointDefeated',
        })
      }
    })
  }

  // 备注改变事件
  change = (value) => {
    this.setState({
      memo: value
    })
  }
  changeName = (event) => {
    this.setState({
      realName: event
    })
  }
  changePhone = (event) => {
    this.setState({
      mobile: event
    })
  }

  showNotice = () => this.setState({ isNoticeShow: true });

  closeNotice = () => this.setState({ isNoticeShow: false });

  onBlurChange = () => {
    this.footer.style.position = 'fixed'
    this.content.style.height = '100vh'
  }
  onFocusChange = () => {
    window.onresize = () => {
      if (document.documentElement < offsetHei) {
        document.body.style.height = offsetHei
      }
    }
  }

  render() {
    const productInfoBoById = this.props.productInfoBoById || {}
    const productInfoLogImg = this.props.productInfoLogImg || {}
    const marketingPrice = productInfoBoById.marketingPrice ? productInfoBoById.marketingPrice / 100 : 0
    return (
      <div className={styles.orderBox}>
        {/* <!-- 订单内容 --> */}
        <div className={styles.orderContent} ref={(el) => { this.content = el }}>
          <ul>
            {/* 价位 */}
            <li className={styles.CTCard}>
              <div className={styles.CTName}>
                <h3>{productInfoBoById.storeName}</h3>
              </div>
              <div className={styles.CTPrice}>
                <dl>
                  <dt>
                    <img src={productInfoLogImg && productInfoLogImg.imageUrl && productInfoLogImg.imageUrl.path} alt="" />
                  </dt>
                  <dd>
                    {productInfoBoById.offerName}
                  </dd>
                  <div className={styles.CTMoney}>
                    <dd>¥ {marketingPrice > 0 ? marketingPrice.toFixed(2) : 0}</dd>
                    <dd>x1</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.serviceType}>
                <span>{productInfoBoById.serviceName}</span>
              </div>
            </li>

            {/* 订单信息 */}
            <li className={styles.CTCard}>
              <List >
                <div className={styles.CTInfoList}>
                  <InputItem
                    // defaultValue='赵旦旦'
                    // 是否可编辑	
                    value={this.state.realName}
                    onChange={(e) => this.changeName(e)}
                  >联系人</InputItem>
                </div>
                <div className={styles.CTInfoList}>
                  <InputItem
                    type='text'
                    // defaultValue='178 1686 6126'
                    // 是否可编辑
                    value={this.state.mobile}
                    onChange={this.changePhone}
                  >手机号码</InputItem>
                </div>
                <div className={styles.CTInfoList}>
                  <InputItem
                    // 是否可编辑	
                    editable={true}
                    placeholder="选填，请先和商家协商一致"
                    onChange={this.change}
                    onBlur={this.onBlurChange}
                    onFocus={this.onFocusChange}
                  >备注</InputItem>
                </div>
              </List>
            </li>

            <div className={styles.attention}>
              <span></span>
              <span onClick={this.showNotice}>预约须知</span>
            </div>
          </ul>
        </div>
        {/* 底部栏 */}
        <footer className={styles.footer} ref={(el) => { this.footer = el }}>
          <span className={styles.footerLeft}>¥{marketingPrice > 0 ? marketingPrice.toFixed(2) : 0}</span>
          {this.state.realName && this.state.mobile ?
            <span className={styles.footerRight} onClick={() => { this.goAppoint(productInfoBoById) }}>提交订单</span>
            :
            <span className={styles.footerRightBan}>提交订单</span>
          }
        </footer>

        {this.state.isNoticeShow && <Notice onClose={this.closeNotice} />}
      </div >
    );
  }
}

export default Index;