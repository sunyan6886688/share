import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Login.less';

class Index extends PureComponent {
  state = {
    IDcard: '',
    PhoneCode: '',
    clickFlage: true,
    tips: '获取动态码',
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
            <span className={styles.spanActive}>动态码登录</span>
            <span>密码登录</span>
          </p>
          <ul>
            <li className={styles.userName}>
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
          </ul>

          <div className={buttonStyles}>登录</div>
        </div>
      </div>
    );
  }
}

export default Index;
