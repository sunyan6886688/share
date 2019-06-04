import React from 'react';
// import { Picker } from 'antd-mobile';
import styles from './RegisterFirst.less';
import ConfirmModal from '@/components/ComfirmModal';
import router from 'umi/router';
import { connect } from 'dva';

export default class RegisterFirst extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isConfirmModalShow: false,
      confirmTip: '账号已存在，请直接登录',
    };
  }

  handleCloseModal = modalName => {
    this.setState({ [modalName]: false });
  }

  handleConfirm = (type) => {
    this.setState({ isConfirmModalShow: false });
    if (type === 1) {
      router.replace('/share/login');
    }
  }

  render() {
    const {
      isConfirmModalShow,
      confirmTip,
    } = this.state;
    return (
      <section className={styles.page}>
        <p className={styles.error}>请正确填写您的证件信息</p>
        <div className={styles.formItem}>
          <p className={styles.label}>证件类型</p>
          <select defaultValue="1">
            <option value="1">身份证</option>
            <option value="2">港澳居民来往内地通行证</option>
            <option value="3">台湾居民来往内地通行证</option>
          </select>
          <span className={styles.arrow} />
        </div>
        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="tel">证件类型</label>
          <input className={styles.input} id="tel" type="text" placeholder="请输入证件号码，英文须大写" />
        </div>
        <div className={styles.formItem}>
          <p className={styles.label}>证件类型</p>
          <input className={styles.input} type="text" placeholder="请输入与证件一致的真实姓名" />
        </div>
        <div className={styles.formItem}>
          <p className={styles.label}>民族</p>
          <select defaultValue="1" defaultValue="0">
            <option value="0" disabled>请选择民族</option>
            <option value="1">汉族</option>
            <option value="2">汉族</option>
            <option value="3">汉族</option>
          </select>
          <span className={styles.arrow} />
        </div>
        <div className={styles.btnWrap}>
          <button className={styles.btn} type="button" disabled >下一步</button>
        </div>

        <ConfirmModal
          isShow={isConfirmModalShow}
          tip={confirmTip}
          confirmBtn={'登录'}
          onCancel={() => this.handleCloseModal('isConfirmModalShow')}
          onConfirm={this.handleConfirm} />
      </section>
    )
  }
}