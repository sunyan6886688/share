/*
* @Author: Jan-superman
* @Date: 2018-09-27 20:38:37
* @Last Modified by: Jan-superman
* @Last Modified time: 2018-11-07 23:33:55
*/
import React, { PureComponent } from 'react';
import { Icon } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import CMstyles from '@/components/css/TopBottom.less';
import styles from './OrderDetails.less';
import jkdh from '@/utils/jkdh'
import { Toast } from 'antd-mobile';
import ConfirmModal from './ConfirmModal';
import userStatisticPage from 'utils/utils'
let startTime=''
let endTime=''
@connect(({ order }) => ({
  // 通用服务订单详情
  commonOrderBo: order.commonOrderBo,
  // 用户信息
  // appUserInfoBo: order.appUserInfoBo,
}))

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      realName: '',
      mobile: '',
      token: localStorage.getItem('token'),
      isShowCancelModal: false
    };
    this.cancelOrder = null;
  }
  componentWillUnmount =()=> {
    endTime=new Date().getTime()
    if(endTime-startTime>2000){
      userStatisticPage(1,"hcOrderInfoPage",{},startTime,endTime)
    } 
  }
  componentDidMount = () => {
    startTime=new Date().getTime()
    window.scrollTo(0, 0)
    // app查询通用服务订单详情
    this.appQueryCommonOrderInfo()
    // 获取用户信息
    // this.getAppUserInfoByToken()
  }

  // 获取用户信息
  // getAppUserInfoByToken = () => {
  //   const { dispatch } = this.props
  //   const value = {
  //     token: localStorage.getItem('token'),
  //   }
  //   console.log('000000')
  //   dispatch({
  //     type: 'order/getAppUserInfoByToken',
  //     payload: {
  //       ...value
  //     }
  //   }).then(() => {
  //     this.setState({
  //       realName: this.props.appUserInfoBo.realName,
  //       mobile: this.props.appUserInfoBo.mobile
  //     })
  //   })
  //   // this.setState({
  //   //   realName: '赵旦旦',
  //   //   mobile: '17816866126'
  //   // })
  // }

  // app查询通用服务订单详情
  appQueryCommonOrderInfo = () => {

    const { dispatch } = this.props
    const value = {
      gisLat: Number(localStorage.getItem('UserCityLat')),
      gisLng: Number(localStorage.getItem('UserCityLng')),
      orderId: this.props.location.query.orderId,
    }

    dispatch({
      type: 'order/appQueryCommonOrderInfo',
      payload: {
        ...value
      }
    })
  }

  showCancelModal = commonOrderBo => {
    this.cancelOrder = commonOrderBo;
    this.setState({ isShowCancelModal: true });
  }

  handleCancelModalConfirm = confirm => {
    if (confirm) this.cancelAppoint(this.cancelOrder);
    this.setState({ isShowCancelModal: false });
  }


  // 取消预约
  cancelAppoint = (commonOrderBo) => {
    const { dispatch } = this.props
    const value = {
      cause: commonOrderBo.cause ? commonOrderBo.cause : '',
      orderId: commonOrderBo.id,
    }
    dispatch({
      type: 'order/cancelCommonOrder',
      payload: {
        ...value
      }
    }).then(() => {
      router.push({
        pathname: '/share/ProductOrder/MyOrder'
      })
    })

  }
  // 再次预约
  againAppoint = () => {
    const { appUserInfoBo, commonOrderBo } = this.props
    router.push({
      pathname: '/share/ProductOrder/AffirmOrder',
      query: {
        "offerId": commonOrderBo.offerId, //商品id ,
      }
    })
  }

  // 跳转到产品详情页
  goProductInfo = (commonOrderBo) => {
    router.push({
      pathname: '/share/ProductOrder/ProductInfo',
      query: {
        commodityId: commonOrderBo.offerId,
      }
    })
  }

  //跳转到商家主页
  goStoreHome = (commonOrderBo) => {
    router.push({
      pathname: '/share/storeHome',
      query: {
        "storeId": commonOrderBo.storeId,
      }
    })
  }

  // 订单状态
  appointSuccess = (commonOrderBo) => {
    let appointSuccess;
    if (commonOrderBo.status == 2) {
      appointSuccess = <div className={styles.statuScolor}>预约成功</div>
    } else if (commonOrderBo.status == 4) {
      appointSuccess = <div className={styles.statuScolor}>交易完成</div>
    } else if (commonOrderBo.status == 5) {
      appointSuccess = <div className={styles.orderStatus}>
        <div>订单已取消</div>
        <div>取消原因：系统取消</div>
      </div>
    }
    return appointSuccess
  }
  toCMap = () => {
    console.log('00000')
    const { commonOrderBo } = this.props
    console.log(commonOrderBo.gisLng)
    if (commonOrderBo.gisLat) {
      const value = {
        latitude: commonOrderBo.gisLat,
        longitude: commonOrderBo.gisLng,
        title: commonOrderBo.storeName,
        addressName: commonOrderBo.address
      }
      jkdh.business.openMap(value).then(res => console.log(res))
    } else {
      Toast.fail('当前门店未设置地理位置无法定位');
    }

  }
  callPhone = (value) => {
    jkdh.business.telPhone({
      phoneNumber: value
    })
  }

  // 确认码
  appointAffirm = (commonOrderBo) => {
    let appointAffirm;
    if (commonOrderBo.status == 2) {
      appointAffirm = <li className={styles.CTCard}>
        <div className={styles.CTLeft}>核销码</div>
        <div className={styles.CTRight}>{commonOrderBo.verificationCode}</div>
      </li>
    } else if (commonOrderBo.status == 4) {
      appointAffirm = <li className={styles.CTCard}>
        <div className={styles.CTLeft}>核销码</div>
        <del className={styles.CTRight} style={{ color: '#A6AEBC' }}>{commonOrderBo.verificationCode}</del>
        <div className={styles.CTRightUse}>已使用</div>
      </li>
    } else if (commonOrderBo.status == 5) {
      appointAffirm = null
    }
    return appointAffirm
  }

  // footer底部跳转
  appointment = (commonOrderBo) => {
    let appointment;
    if (commonOrderBo.status == 2) {
      appointment = <footer className={styles.footer}>
        <span onClick={() => { this.showCancelModal(commonOrderBo) }}>取消预约</span>
      </footer>
    } else if (commonOrderBo.status == 4) {
      appointment = <footer className={styles.footer}>
        <span>评价</span>
        <span onClick={this.againAppoint}>再次预约</span>
      </footer>
    } else if (commonOrderBo.status == 5) {
      appointment = <footer className={styles.footer}>
        <span onClick={this.againAppoint}>再次预约</span>
      </footer>
    }
    return appointment
  }

  render() {
    const commonOrderBo = this.props.commonOrderBo || {}
    const distanceNum = commonOrderBo.distance != null ? commonOrderBo.distance > 1000 ? commonOrderBo.distance / 1000 : commonOrderBo.distance : ''
    const offerPrice = commonOrderBo.offerPrice ? commonOrderBo.offerPrice / 100 : 0
    return (
      <div className={styles.orderBox}>
        {/* <!-- 订单标题 --> */}
        {/* <div className={CMstyles.orederTitle}>
          <span className={CMstyles.bg}></span>
          <span className={CMstyles.orderSpan}>订单详情</span>
        </div> */}
        {/* <!-- 订单状态 --> */}
        {this.appointSuccess(commonOrderBo)}
        {/* <!-- 订单内容 --> */}
        <div className={styles.orderContent}>
          <ul>
            {/* 价位 */}
            <li className={styles.CTCard}>
              <div className={styles.CTName} onClick={() => { this.goStoreHome(commonOrderBo) }}>
                <h3>{commonOrderBo.storeName}</h3>
                <span></span>
              </div>
              <div className={styles.CTPrice} onClick={() => { this.goProductInfo(commonOrderBo) }}>
                <dl>
                  <dt>
                    <img src={commonOrderBo && commonOrderBo.offerImg && commonOrderBo.offerImg.path} alt="" />
                  </dt>
                  <dd>
                    {commonOrderBo.offerName}
                  </dd>
                  <div className={styles.CTMoney}>
                    <dd>¥{offerPrice > 0 ? offerPrice.toFixed(2) : 0}</dd>
                    <dd>x{commonOrderBo.offerNum}</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.serviceType}> <span>{commonOrderBo.serviceType}</span> </div>
            </li>
            {/* 确认码 */}
            {this.appointAffirm(commonOrderBo)}

            {/* 订单信息 */}
            <li className={styles.CTCard}>
              <div className={styles.CTInfoList}>
                <div className={styles.CTInfoLeft}>订单编号</div>
                <div className={styles.CTInfoRight}>{commonOrderBo.orderNo}</div>
              </div>
              <div className={styles.CTInfoList}>
                <div className={styles.CTInfoLeft}>预约时间</div>
                <div className={styles.CTInfoRight}>{commonOrderBo.gmtCreate}</div>
              </div>
              <div className={styles.CTInfoList}>
                <div className={styles.CTInfoLeft}>联系人</div>
                <div className={styles.CTInfoRight}>{commonOrderBo.linkMan}</div>
              </div>
              <div className={styles.CTInfoList}>
                <div className={styles.CTInfoLeft}>手机号</div>
                <div className={styles.CTInfoRight}>{commonOrderBo.linkPhone}</div>
              </div>
              <div className={styles.CTInfoList} style={{ borderBottom: 'none' }}>
                <div className={styles.CTInfoLeft}>备注</div>
                <div className={styles.CTInfoRight}>{commonOrderBo.memo}</div>
              </div>
            </li>
            {/* 地址 */}
            <li className={styles.CTCard}>
              <div className={styles.CTAdLeft} >
                <h3>{commonOrderBo.storeName}</h3>
                <dl onClick={this.toCMap} style={{ overflow: 'hidden' }}>
                  <dt></dt>
                  <dd>{commonOrderBo.address}</dd>
                  <dd>
                    {commonOrderBo.distance > 100 ?
                      <i>距您{distanceNum.toFixed(2)}{commonOrderBo.distance > 1000 ? 'km' : 'm'}</i> :
                      ''
                    }
                    {commonOrderBo.distance != null && commonOrderBo.distance <= 100 ?
                      <i>距您小于100m</i> :
                      ''
                    }
                  </dd>
                </dl>
              </div>
              <div className={styles.CTAdRight}>
                {/* <a href={'tel:' + commonOrderBo.storeLinkPhone}> */}
                <span onClick={() => this.callPhone(commonOrderBo.storeLinkPhone)}>

                </span>
                {/* </a> */}
              </div>
            </li>
          </ul>
        </div>
        {/* 底部栏 */}
        {this.appointment(commonOrderBo)}

        {this.state.isShowCancelModal && <ConfirmModal onConfirm={this.handleCancelModalConfirm} />}
      </div>
    );
  }
}

export default Index;