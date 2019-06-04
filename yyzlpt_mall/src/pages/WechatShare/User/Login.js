import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Login.less';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import md5 from 'js-md5'
@connect(({ }) => ({

}))
class Index extends PureComponent {
  state = {
    IDcard: '',
    PhoneCode: '',
    clickFlage: true,
    tips: '获取动态码',
    loginType: '1',//1动态吗登录 2密码登录
    isRightIdCard: false,
    isRightPsd: false,
    isRightPhoneCode: false,
    psdFlage: false
  };
  componentDidMount = () => {
    
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      const code= this.getQueryString('code')
      if(code){
        // alert(window.location)
      }else{
        window.location.href = ' https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxafff8142f288e155&redirect_uri=http://192.168.2.57:8099/mall/share/login&response_type=code&scope=snsapi_userinfo'

      }
    }
    if (ua.match(/WeiBo/i) == "weibo") {
      //在新浪微博客户端打开
    }
    if (ua.match(/QQ/i) == "qq") {
      //在QQ空间打开
    }
  }
  getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  }
  changeIDcard = e => {
    this.setState({
      IDcard: e.target.value,
      clickFlage: true,
      tips: '获取动态码',
    });
    var patternMainLand = /^[A-Za-z0-9]+$/
    const value = e.target.value
    if (!value) {
      return false
    }
    const flage = patternMainLand.test(value) && value.length > 7
    if (flage) {
      this.setState({
        isRightIdCard: true
      })
    } else {
      this.setState({
        isRightIdCard: false
      })
    }

  };
  changePhoneCode = e => {
    this.setState({
      PhoneCode: e.target.value,
    });
    const patternMainLand = /^[0-9]+$/
    const value = e.target.value
    if (!value) {
      return false
    }
    const flage = patternMainLand.test(value) && value.length == 6
    if (flage) {
      this.setState({
        isRightPhoneCode: true
      })
    } else {
      this.setState({
        isRightPhoneCode: false
      })
    }
  };
  getPhoneCode = () => {
    if (this.state.IDcard.length <= 7 || !this.state.isRightIdCard) {
      return false;
    }
    this.setState({
      clickFlage: false,
      tips: '59s后重发',
    });
  };
  changLoginType = (value) => {
    this.setState({
      loginType: value
    })
  }

  // cheackIDcard = (e) => {
  //   const patternMainLand = /^[A-Za-z0-9]+$/
  //   const value=e.target.value
  //   if(!value){
  //     return false
  //   }
  //   const flage=patternMainLand.test(value)&&value.length>7
  //   if (flage) {
  //     this.setState({
  //       isRightIdCard:true
  //     })
  //   } else {
  //     Toast.info('请输入合法的证件号', 1);
  //     this.setState({
  //       isRightIdCard:false
  //     })
  //   }
  // }
  // checkPhoneCode=(e)=>{
  //   const patternMainLand = /^[0-9]+$/
  //   const value=e.target.value
  //   if(!value){
  //     return false
  //   }
  //   const flage=patternMainLand.test(value)&&value.length==6
  //   if (flage) {
  //     this.setState({
  //       isRightPhoneCode:true
  //     })
  //   } else {
  //     Toast.info('请输入合法的动态码', 1);
  //     this.setState({
  //       isRightPhoneCode:false
  //     })
  //   }
  // }
  clearIDcard = () => {
    this.setState({
      IDcard: ''
    })
  }
  changePsd = (e) => {
    this.setState({
      Psd: e.target.value
    })
    if (e.target.value.length > 7 && e.target.value.length < 20) {
      this.setState({
        isRightPsd: true
      })
    } else {
      this.setState({
        isRightPsd: false
      })
    }
  }
  toRegindter = () => {
    router.push({
      pathname: '/share/register',
    });
  }
  showHidenPsd = () => {
    const flage = this.state.psdFlage
    this.setState({
      psdFlage: !flage
    })
  }
  loginButton = () => {
    const { PhoneCode, IDcard, psdFlage, clickFlage, loginType, isRightIdCard, isRightPhoneCode, isRightPsd, Psd } = this.state
    const flage = IDcard && isRightIdCard && ((loginType == '1' && isRightPhoneCode && PhoneCode) || (loginType == 2 && isRightPsd && Psd))
    if (!flage) {
      return false
    }
    const { dispatch } = this.props
    if (loginType == 1) {

    } else if (loginType == 2) {
      dispatch({
        type: 'user/userLogin',
        payload: {
          patientCard: this.state.IDcard,
          password: md5(this.state.Psd),
          openId: ""
        }
      })
    }

  }
  render() {
    const { PhoneCode, IDcard, psdFlage, clickFlage, loginType, isRightIdCard, isRightPhoneCode, isRightPsd, Psd } = this.state
    const buttonStyles =
      IDcard && isRightIdCard && ((loginType == '1' && isRightPhoneCode && PhoneCode) || (loginType == 2 && isRightPsd && Psd))
        ? styles.buttonActive : styles.button;
    const spanStyles =
      IDcard.length > 7 && clickFlage && isRightIdCard
        ? styles.spanActive
        : styles.spanNoActive;
    return (
      <div className={styles.LoginBody}>
        <div>
          <p className={styles.header}>
            <span
              className={loginType == '1' ? styles.spanActive : styles.spanNoActive}
              onClick={() => this.changLoginType('1')}>动态码登录</span>
            <span
              className={loginType == '2' ? styles.spanActive : styles.spanNoActive}
              onClick={() => this.changLoginType('2')}>密码登录</span>
          </p>
          {loginType == '1' ?
            <ul>
              <li className={styles.userName}>
                <input placeholder="身份证/台胞证/港澳证"
                  onChange={this.changeIDcard}
                  // onBlur={this.cheackIDcard}
                  maxLength={18}
                  value={IDcard}
                />
                <span
                  onClick={this.clearIDcard}
                ></span>
              </li>
              <li className={styles.code}>
                <input placeholder="短信动态码"
                  onChange={this.changePhoneCode}
                  //  onBlur={this.checkPhoneCode}
                  maxLength={6}
                  value={PhoneCode}
                />
                <span className={spanStyles} onClick={this.getPhoneCode}>
                  {this.state.tips}
                </span>
              </li>
              <div className={styles.tips}>
                {!clickFlage ? <p>动态码已发送到手机138****0571</p> : ''}
                <b onClick={this.toRegindter}>没有账号？点此注册</b>
              </div>
            </ul> : ''}
          {this.state.loginType == '2' ?
            <ul className={styles.psdLoginBox}>
              <li className={styles.userName}>
                <input placeholder="身份证/台胞证/港澳证"
                  onChange={this.changeIDcard}
                  // onBlur={this.cheackIDcard}
                  maxLength={18}
                  value={IDcard}
                />
                <span
                  onClick={this.clearIDcard}
                ></span>
              </li>
              <li className={styles.code}>
                {
                  psdFlage ? <input placeholder="密码"
                    onChange={this.changePsd}
                    maxLength={20}
                    type='text'
                    value={Psd}
                  /> : <input placeholder="密码"
                    onChange={this.changePsd}
                    maxLength={20}
                    type='password'
                    value={Psd}
                    />
                }
                <span
                  className={psdFlage ? styles.show : styles.hiden}
                  onClick={this.showHidenPsd}
                ></span>
              </li>
              <div className={styles.tips}>
                <b onClick={this.toRegindter}>没有账号？点此注册</b>
              </div>
            </ul> : ''}
          <div className={buttonStyles}
            onClick={this.loginButton}
          >登录</div>
          {
            loginType == '2' ? <p className={styles.tipst}>注：未设置密码的用户，可用动态码登录后去设置密码页面进行设置；已在12580网站(http://www.zj12580.cn)注册的用户，密码与原先一致。</p> : ''
          }
        </div>
      </div>
    );
  }
}

export default Index;
