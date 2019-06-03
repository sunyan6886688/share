/*
* @Author: Jan-superman
* @Date: 2018-09-27 20:38:37
* @Last Modified by: Jan-superman
* @Last Modified time: 2018-11-07 23:33:55
*/
import React, { PureComponent } from 'react';
import { Icon, Accordion, List } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import CMstyles from '@/components/css/TopBottom.less';
import styles from './MyOrder.less';
import jkdh from '@/utils/jkdh'
import { Toast } from 'antd-mobile';
import emptyImg from '@/assets/NoRecord@2x.png';

@connect(({ order, home }) => ({
  // 返回token值
  // appUserLogin: order.appUserLogin,

  // app查询通用服务订单列表
  commonOrderBoList: order.commonOrderBoList,
  // 总数
  count: order.commonOrderCount,
  createSignature: home.createSignature
}))

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      menuNum: 1,
      // navTop: false,
      tabType: false,
      tabStatus: false,
      chooseServe: false,
      chooseStatus: false,
      statusName: '全部状态',
      typeName: '全部类型',
    };
    this.getTokenNum = 0
    // this.$tab = null;
    // this.offsetTop = 0;
    // this.flag = true
  }
  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/createSignature'
    }).then((res) => {
      // 注入jsdk 
      jkdh.config({
        appId: 'p9gbs1lwjzt1u8hstio2sjbivl19wgkx',
        timestamp: this.props.createSignature && this.props.createSignature.timestamp,
        signature: this.props.createSignature && this.props.createSignature.signature,
        nonceStr: this.props.createSignature && this.props.createSignature.noncestr
      }).then(() => {

        jkdh.ready(() => {
          this.getToken()
        })
      })
    })

    // this.appGetCommonOrderList()
    // 获取token值
    // this.appUserLogin()

    // tab栏吸顶
    // this.$tab = this.refs.tab;
    // if (this.$tab) {
    //   setTimeout(() => {
    //     this.offsetTop = this.$tab.offsetTop;
    //   }, 500);
    //   window.addEventListener('scroll', this.handleScroll);
    // }
  }
  getToken = () => {

    const { dispatch } = this.props
    this.getTokenNum += 1
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
        if (data.result.isLogin && this.getTokenNum <= 2) {
          // app查询通用服务订单列表
          this.appGetCommonOrderList()
        } else if (!localStorage.getItem('token') && this.getTokenNum <= 2) {
          this.getToken()
        } else {
          Toast.fail('授权失败，账号异常请联系客服或尝试重启应用');
        }
      })
    })
  }
  // // tab栏吸顶
  // handleScroll = () => {
  //   let sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  //   console.log(this.offsetTop);

  //   if (!this.state.navTop && sTop >= 80) {
  //     this.setState({
  //       navTop: true
  //     })
  //     // console.log('吸顶');

  //   }
  //   if (sTop < 80) {
  //     this.setState({
  //       navTop: false
  //     })
  //     // console.log('不吸顶');
  //   }
  // }

  // 控制状态类型栏显示隐藏
  isShow = (num) => {
    if (Number(num) === 1) {
      this.setState({
        tabType: !this.state.tabType,
        tabStatus: false,
      }, () => {
        if (this.state.tabType) {
          this.node && this.node.addEventListener('touchmove', e => {
            e.preventDefault()
          }, false)
          // document.body.style.overflow = 'hidden';
          // document.body.style.height = '100vh'
          // window.addEventListener("touchmove", false);//禁止页面滑动
        }
      });
    } else {
      this.setState({
        tabType: false,
        tabStatus: !this.state.tabStatus
      }, () => {
        if (this.state.tabStatus) {
          this.node && this.node.addEventListener('touchmove', e => {
            e.preventDefault()
          }, false)
          // document.body.style.overflow = 'hidden';
          // document.body.style.height = '100vh'
          // window.addEventListener("touchmove", false);//禁止页面滑动
        }
      });
    }
  }

  // 隐藏下拉框
  conceal = () => {
    this.setState({
      tabType: false,
      tabStatus: false,
    })
  }

  // 点击通用类型
  clickServer = (val, index) => {
    if (Number(index) === 0) {
      this.setState({
        typeName: val,
        // chooseServe: !this.state.chooseServe,
        tabType: false,
        tabStatus: false,
      })
    } else if (Number(index) === 1) {
      this.setState({
        typeName: val,
        // chooseServe: !this.state.chooseServe,
        tabType: false,
        tabStatus: false,
      })
    }
  }
  // 全部状态
  clickStatus = (val, index) => {
    const { dispatch } = this.props
    this.setState({
      statusName: val,
      // chooseStatus: !this.state.chooseStatus,
      tabType: false,
      tabStatus: false,
    })
    if (Number(index) === 0) {
      this.appGetCommonOrderList(this.state.current, '')
    } else if (Number(index) === 1) {
      this.appGetCommonOrderList(this.state.current, '2')
    } else if (Number(index) === 2) {
      this.appGetCommonOrderList(this.state.current, '4')
    } else if (Number(index) === 3) {
      this.appGetCommonOrderList(this.state.current, '5')
    }

  }

  // app查询通用服务订单列表
  appGetCommonOrderList = (current, status) => {
    const { dispatch } = this.props
    const value = {
      pageNum: current ? current : this.state.current,
      pageSize: 10,
      serviceNo: "",
      status: status ? status : '',
    }
    dispatch({
      type: 'order/appGetCommonOrderList',
      payload: {
        ...value
      }
    }).then((data) => {
      if (data.code == "usr_1003") {
        this.getToken()
      }
    })
  }


  // 跳转到订单详情
  skipOrder = (item) => {
    router.push({
      pathname: '/share/ProductOrder',
      query: {
        orderId: item.id,
      }
    })
  }


  render() {
    const { navTop, tabType, tabStatus, chooseServe, typeName, statusName, chooseStatus } = this.state
    const commonOrderBoList = this.props.commonOrderBoList || []
    return (
      <div className={styles.orderBox}>
        {/* <div className={navTop ? styles.orderCollapseFiexd : styles.orderCollapse} ref="tab"> */}
        <div className={styles.orderCollapseFiexd}>
          {tabType ?
            <div className={styles.chooseOrderType} onClick={() => this.isShow(1)} >
              <h3>{typeName == '' ? '全部类型' : typeName}</h3>
              <span></span>
            </div> :
            <div className={styles.orderType} onClick={() => this.isShow(1)}>
              <h3>{typeName == '' ? '全部类型' : typeName}</h3>
              <span></span>
            </div>
          }
          <div className={styles.orderTypeLine}></div>
          {tabStatus ?
            <div className={styles.chooseOrderType} onClick={() => this.isShow(2)}>
              <h3>{statusName == '' ? '全部状态' : statusName}</h3>
              <span></span>
            </div> :
            <div className={styles.orderType} onClick={() => this.isShow(2)}>
              <h3>{statusName == '' ? '全部状态' : statusName}</h3>
              <span></span>
            </div>
          }

          {/* 选择框 */}
          {tabType ?
            <div className={styles.orderTypeSelect} onClick={this.conceal} ref={(el) => this.node = el}>
              <ul>
                {['全部类型', '通用服务'].map((item, index) => {
                  if (item == this.state.typeName) {
                    return <li key={index}
                      style={{ color: '#0C66FF' }}
                      onClick={() => this.clickServer(item, index)}
                    >{item}<span className={styles.Checked}></span></li>
                  } else {
                    return <li key={index}
                      onClick={() => this.clickServer(item, index)}
                    >{item}</li>
                  }
                })}
              </ul></div> : null
          }

          {tabStatus ?
            <div className={styles.orderTypeSelect} onClick={this.conceal} ref={(el) => this.node = el}>
              <ul>
                {['全部状态', '已预约', '已完成', '已取消'].map((item, index) => {
                  if (item == this.state.statusName) {
                    return <li key={item}
                      style={{ color: '#0C66FF' }}
                      onClick={() => this.clickStatus(item, index)}
                    >{item}<span className={styles.Checked}></span></li>
                  } else {
                    return <li key={item}
                      onClick={() => this.clickStatus(item, index)}
                    >{item}</li>
                  }
                })}
              </ul> </div> : null
          }

        </div>


        {/* // 订单内容 */}
        {/* <div className={navTop ? styles.MyOrderContentTop : styles.MyOrderContent}> */}
        <div className={styles.MyOrderContentTop}>
          <ul>
            {commonOrderBoList.length > 0 ? commonOrderBoList.map((item, index) => {
              const offerPrice = item.offerPrice ? item.offerPrice / 100 : 0
              // if (index <= 6) {
                return <li key={item.id}>
                  <div className={styles.title}>
                    <div className={styles.titleLeft}> {item.storeName}</div>
                    <div className={styles.titleRight}>{item.status == 2 ? '已预约' : ''}
                      {item.status == 4 ? '已完成' : ''}
                      {item.status == 5 ? '已取消' : ''}
                    </div>
                  </div>
                  <div className={styles.content} onClick={() => { this.skipOrder(item) }}>
                    <dl>
                      <dt>
                        <img src={item.offerImg.path} alt="" />
                      </dt>
                      <dd>{item.offerName}</dd>
                      <div className={styles.CTMoney}>
                        <dd>¥{offerPrice > 0 ? offerPrice.toFixed(2) : 0}</dd>
                        <dd>x{item.offerNum}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className={styles.orderFooter}>
                    <div className={styles.footerLeft}>{item.gmtCreate}</div>
                    <div className={styles.footerRight}>
                      <span>共1件 应付总额：</span>
                      <span>¥{offerPrice > 0 ? offerPrice.toFixed(2) : 0}</span>
                    </div>
                  </div>
                </li>
              // }
            }) : ''}
          </ul>
          {commonOrderBoList && commonOrderBoList.length === 0 &&
            <div className={styles.empty}>
              <img src={emptyImg} className={styles.emptyImg} />
              <p className={styles.emptyTip}>您还没有相关的订单</p>
            </div>
          }
        </div>
      </div >
    );
  }
}

export default Index;
