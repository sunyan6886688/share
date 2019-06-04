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
import styles from './appointResult.less';
import userStatisticPage from 'utils/utils';
let startTime = '';
let endTime = '';
@connect(({ order }) => ({
  // 通用服务订单详情
  // commonOrderBo: order.commonOrderBo
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.location.query.orderId,
      mask: false,
    };
  }
  componentWillUnmount = () => {
    endTime = new Date().getTime();
    if (endTime - startTime > 2000) {
      userStatisticPage(1, 'hcReservationSuccessfulPage', {}, startTime, endTime);
    }
  };
  componentDidMount = () => {
    startTime = new Date().getTime();
  };
  // 返回首页
  returnHome = () => {
    router.push({
      pathname: '/',
    });
  };
  // 跳转到订单详情
  skipOrder = () => {
    router.push({
      pathname: '/ProductOrder',
      query: {
        orderId: this.state.orderId,
      },
    });
  };
  isWeiXin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.setState({
        mask: true,
      });
      return true;
    } else {
      return false;
    }
  };

  downBtn = () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      this.isWeiXin();
      window.location.href = 'http://ghws5.zj12580.cn:9901/YYGH_12580_SERVICE/apk/yygh-12580.apk';
    }
    if (isiOS) {
      window.location.href =
        'https://itunes.apple.com/cn/app/%E6%B5%99%E6%B1%9F%E9%A2%84%E7%BA%A6%E6%8C%82%E5%8F%B7/id588271688?l=zh&ls=1&mt=8';
    }
  };

  handClickMask = () => this.setState({ mask: false });

  render() {
    return (
      <div className={styles.appointBox}>
        {/* 后退按钮 */}
        {/* <div className={styles.appointTitle}>
                    <span className={styles.bg}></span>
                </div> */}
        <div className={styles.appointResult}>
          <div className={styles.ARIcon}>
            <span />
          </div>
          <div className={styles.ARSuccess}>预约成功</div>
          <div className={styles.ARInfo}>请耐心等待商家处理结果。</div>
          <div className={styles.ARCode}>
            <span>核销码</span> : {this.props.location.query.verificationCode}
          </div>
          <div className={styles.ARLink}>
            <div className={styles.ARLinkLeft} onClick={this.returnHome}>
              返回首页
            </div>
            <div className={styles.ARLinkCenter} />
            <div className={styles.ARLinkRight} onClick={this.skipOrder}>
              查看订单
            </div>
          </div>
          <div className={styles.code}>
            <span />
          </div>
          <p className={styles.attention}>扫码关注官方公众号</p>
          <button className={styles.downBtn} onClick={this.downBtn}>
            下载APP，更多精彩等着你！
          </button>
        </div>
        {this.state.mask && (
          <div className={styles.mask} onClick={this.handClickMask}>
            <span className={styles.maskImg} />
          </div>
        )}
      </div>
    );
  }
}

export default Index;
