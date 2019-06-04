
import React from 'react';
import { Toast } from 'antd-mobile';
import styles from './RegisterSecond.less';
import Agreement from './Agreement';
import AlertModal from '@/Components/AlertModal';

export default class RegisterSecond extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        isAgreementModalShow: false,
        isPrivacyModalShow: false,
        isAlertModalShow: false,
        alertTip: '该手机号绑定的账号已达上限，请更换手机号进行注册。',
        isChecked: false,
        countBtnTip: '获取验证码',
        tel: '',
        isTelValid: false,
        code: '',
        isCodeValid: false,
      };
      this.timer = null;
      this.isSubmitting = false;
    } 

    componentWillUnmount() {
      clearInterval(this.timer);
    }
    
    handleShowModal = modalName => {
      this.setState({[modalName]: true});
    }

    handleCloseModal = modalName => {
      this.setState({[modalName]: false});
    }

    handleChecked = isChecked => {
      this.setState({isChecked});
    }

    handleSubmit = () => {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      // sumbit
      this.setState({isAlertModalShow: true});
    }

    handleGetCode = () => {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      // test tel code
      this.isSubmitting = false;
      this.handleCount();
    }

    handleCount = () => {
      let count = 60;
      this.setState({countBtnTip: `${count}s后重新获取`});

      this.timer = setInterval(() => {
        if (count === 0) {
          clearInterval(this.timer);
          this.setState({countBtnTip: '获取验证码'})
          return;
        }
        count --;
        this.setState({countBtnTip: `${count}s后重新获取`})
      }, 1000);
    }

    handelTelChange = e => {
      const {value} = e.target;
      if (value.length === 11 && /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        this.setState({
          tel: value,
          isTelValid: true,
        })
      } else {
        this.setState({
          tel: value,
          isTelValid: false,
        })
      }
    }

    handelCodeChange = e => {
      const {value} = e.target;
      if (value.length === 6 && /^\d{6}$/) {
        this.setState({
          code: value,
          isCodeValid: true,
        })
      } else {
        this.setState({
          code: value,
          isCodeValid: false,
        })
      }
    }

    render() {
        const {
          isAgreementModalShow,
          isPrivacyModalShow,
          isAlertModalShow,
          alertTip,
          countBtnTip,
          isChecked,
          isTelValid,
          tel,
          code,
          isCodeValid
        } = this.state;

        return (
            <section className={styles.page}>
              <p className={styles.error}>请输入要绑定的手机号</p>
              <div className={styles.formItem}>
                <p className={styles.label}>手机号码</p>
                <input
                  className={styles.input}
                  type="tel"
                  value={tel}
                  placeholder="请输入您的手机号码"
                  maxLength={11}
                  onChange={this.handelTelChange}/>
              </div>
              <div className={styles.formItem}>
                <p className={styles.label}>验证码</p>
                <input 
                  className={styles.input}
                  type="text"
                  maxLength={6}
                  placeholder="请输入验证码" 
                  onChange={this.handelCodeChange}/>
                <button
                  className={styles.codeBtn}
                  disabled={countBtnTip !== '获取验证码' || !isTelValid}
                  onClick={this.handleGetCode}>
                  {countBtnTip}
                </button>
              </div>

              <div className={styles.checkWrap}>
                {
                  isChecked ? 
                  <button 
                    className={styles.checked}
                    onClick={() => this.handleChecked(false)} /> :
                  <button
                    className={styles.check}
                    onClick={() => this.handleChecked(true)} />
                }
                      
                <p>已阅读并同意</p>
                <button
                  className={styles.agreement}
                  onClick={() => this.handleShowModal('isAgreementModalShow')}>
                  《预约挂号注册协议》
                </button>
                <button
                  className={styles.agreement}
                  onClick={() => this.handleShowModal('isPrivacyModalShow')}>
                  《隐私条款》
                </button>
              </div>
              
              <div className={styles.btnWrap}>
                <button
                  className={styles.btn}
                  type="button"
                  disabled={!isChecked || !isTelValid || !isCodeValid}
                  onClick={this.handleSubmit}>
                  同意协议并注册
                </button>
              </div>

              <Agreement
                isShow={isAgreementModalShow}
                onConfirm={() => this.handleCloseModal('isAgreementModalShow')}/>

              <Agreement
                isShow={isAgreementModalShow}
                onConfirm={() => this.handleCloseModal('isPrivacyModalShow')}/>

              <AlertModal
                isShow={isAlertModalShow}
                tip={alertTip}
                onConfirm={() => this.handleCloseModal('isAlertModalShow')}/>
            </section>
        )
    }
}