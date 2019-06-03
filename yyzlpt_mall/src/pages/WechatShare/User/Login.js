
import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Login.less';

class Index extends PureComponent {
  render() {
    return (
      <div className={styles.LoginBody}>
        <div>
          <p className={styles.header}>动态码登录</p>
          <ul>
            <li className={styles.userName}
            ><input placeholder='身份证/台胞证/港澳证'></input>
            </li>
            <li className={styles.code}>
              <input placeholder='短信动态码'></input>
              <span>获取动态码</span>
            </li>
          </ul>
          <div className={styles.tips}>
            <p>动态码已发送到手机138****0571</p>
            <b>没有账号？点此注册</b>
          </div>
          <div className={styles.button}>登录</div>
        </div>
      </div>

    );
  }
}

export default Index;
