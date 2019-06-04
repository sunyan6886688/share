import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Login.less';
import { Toast } from 'antd-mobile';


class Index extends PureComponent {
  state = {
    IDcard: '',
    PhoneCode: '',
    clickFlage: true,
    tips: '获取动态码',
    loginType: '1',
    isRightIdCard:false,
    isRightPsw:false,
    isRightPhoneCode:false
  };
  changeIDcard = e => {
    this.setState({
      IDcard: e.target.value,
      clickFlage: true,
      tips: '获取动态码',
    });
    var patternMainLand = /^[A-Za-z0-9]+$/
    const value=e.target.value
    if(!value){
      return false
    }
    const flage=patternMainLand.test(value)
    if (flage) {
      this.setState({
        isRightIdCard:true
      })
    }else {
      this.setState({
        isRightIdCard:false
      })
    }
   
  };
  changePhoneCode = e => {
    this.setState({
      PhoneCode: e.target.value,
    });
    const patternMainLand = /^[0-9]+$/
    const value=e.target.value
    if(!value){
      return false
    }
    const flage=patternMainLand.test(value)&&value.length==6
    if (flage) {
      this.setState({
        isRightPhoneCode:true
      })
    } else {
      this.setState({
        isRightPhoneCode:false
      })
    }
  };
  getPhoneCode = () => {
    if (this.state.IDcard.length <= 7||!this.state.isRightIdCard) {
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
  
  cheackIDcard = (e) => {
    const patternMainLand = /^[A-Za-z0-9]+$/
    const value=e.target.value
    if(!value){
      return false
    }
    const flage=patternMainLand.test(value)
    if (flage) {
      this.setState({
        isRightIdCard:true
      })
    } else {
      Toast.info('请输入合法的证件号', 1);
      this.setState({
        isRightIdCard:false
      })
    }
  }
  checkPhoneCode=(e)=>{
    const patternMainLand = /^[0-9]+$/
    const value=e.target.value
    if(!value){
      return false
    }
    const flage=patternMainLand.test(value)&&value.length==6
    if (flage) {
      this.setState({
        isRightPhoneCode:true
      })
    } else {
      Toast.info('请输入合法的动态码', 1);
      this.setState({
        isRightPhoneCode:false
      })
    }
  }
  render() {
    const{PhoneCode,IDcard,clickFlage,loginType,isRightIdCard,isRightPhoneCode,isRightPsw}=this.state
    const buttonStyles =
      IDcard &&PhoneCode &&isRightIdCard&&((loginType=='1'&&isRightPhoneCode)||(loginType==2&&isRightPsw))
      ? styles.buttonActive : styles.button;
    const spanStyles =
      IDcard.length > 7 &&clickFlage && isRightIdCard
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
                  onBlur={this.cheackIDcard}
                  maxLength={20}
                  value={IDcard}
                />
              </li>
              <li className={styles.code}>
                <input placeholder="短信动态码"
                 onChange={this.changePhoneCode} 
                 onBlur={this.checkPhoneCode}
                 maxLength={6}
                value={PhoneCode}
                 />
                <span className={spanStyles} onClick={this.getPhoneCode}>
                  {this.state.tips}
                </span>
              </li>
              <div className={styles.tips}>
                {!clickFlage?<p>动态码已发送到手机138****0571</p>:''}
                <b>没有账号？点此注册</b>
              </div>
            </ul> : ''}
          {this.state.loginType == '2' ?
            <ul className={styles.pswLoginBox}>
              <li className={styles.userName}>
                <input placeholder="身份证/台胞证/港澳证" 
                onChange={this.changeIDcard} 
                onBlur={this.cheackIDcard}
                maxLength={20}
                value={IDcard}
                />
              </li>
              <li className={styles.code}>
                <input placeholder="短信动态码" onChange={this.changePhoneCode} />
              </li>
              <div className={styles.tips}>
                <b>没有账号？点此注册</b>
              </div>
            </ul> : ''}
          <div className={buttonStyles}>登录</div>
          {
            loginType == '2' ? <p className={styles.tipst}>注：未设置密码的用户，可用动态码登录后去设置密码页面进行设置；已在12580网站(http://www.zj12580.cn)注册的用户，密码与原先一致。</p> : ''
          }

        </div>
      </div>
    );
  }
}

export default Index;
