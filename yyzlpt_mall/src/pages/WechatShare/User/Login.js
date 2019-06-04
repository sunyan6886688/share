import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Login.less';

class Index extends PureComponent {
  state = {
    IDcard: '',
    PhoneCode: '',
    clickFlage: true,
    tips: '获取动态码',
    loginType:'1'
  };
  changeIDcard = e => {
    this.setState({
      IDcard: e.target.value,
      clickFlage: true,
      tips: '获取动态码',
    });
  };
  changePhoneCode = e => {
    this.setState({
      PhoneCode: e.target.value,
    });
  };
  getPhoneCode = () => {
    if (this.state.IDcard.length <= 8) {
      return false;
    }
    this.setState({
      clickFlage: false,
      tips: '59s后重发',
    });
  };
  changLoginType=(value)=>{
    this.setState({
      loginType:value
    })
  }
  render() {
    const buttonStyles =
      this.state.IDcard && this.state.PhoneCode ? styles.buttonActive : styles.button;
    const spanStyles =
      this.state.IDcard.length > 8 && this.state.clickFlage
        ? styles.spanActive
        : styles.spanNoActive;
    return (
      <div className={styles.LoginBody}>
        <div>
          <p className={styles.header}>
            <span 
            className={this.state.loginType=='1'?styles.spanActive:styles.spanNoActive} 
            onClick={()=>this.changLoginType('1')}>动态码登录</span>
            <span
             className={this.state.loginType=='2'?styles.spanActive:styles.spanNoActive} 
             onClick={()=>this.changLoginType('2')}>密码登录</span>
          </p>
          {this.state.loginType=='1'?
             <ul>
            <li className={ styles.userName}>
              <input placeholder="身份证/台胞证/港澳证" onChange={this.changeIDcard} />
            </li>
            <li className={styles.code}>
              <input placeholder="短信动态码" onChange={this.changePhoneCode} />
              <span className={spanStyles} onClick={this.getPhoneCode}>
                {this.state.tips}
              </span>
            </li>
            <div className={styles.tips}>
              <p>动态码已发送到手机138****0571</p>
              <b>没有账号？点此注册</b>
            </div>
          </ul>:'' }
          {this.state.loginType=='2'?<ul className={styles.pswLoginBox}>
          <li className={ styles.userName}>
              <input placeholder="身份证/台胞证/港澳证" onChange={this.changeIDcard} />
            </li>
            <li className={styles.code}>
              <input placeholder="短信动态码" onChange={this.changePhoneCode} />
             
            </li>
            <div className={styles.tips}>
              <b>没有账号？点此注册</b>
            </div>
          </ul>:''}
          <div className={buttonStyles}>登录</div>
          <p className={styles.tipst}>注：未设置密码的用户，可用动态码登录后去设置密码页面进行设置；已在12580网站(http://www.zj12580.cn)注册的用户，密码与原先一致。</p>
        </div>
      </div>
    );
  }
}

export default Index;
