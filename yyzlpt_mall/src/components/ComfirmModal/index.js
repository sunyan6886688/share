import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class ConfirmModal extends React.PureComponent {

  static defaultProps = {
    confirmBtn: '确定',
    cancelBtn: '取消',
  }

  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    tip: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    confirmBtn: PropTypes.string,
    cancelBtn: PropTypes.string,
  }

  render() {
    const {isShow, onConfirm, tip, confirmBtn, cancelBtn, onCancel} = this.props;

    return (
      <CSSTransition
        timeout={200}
        classNames="fade"
        unmountOnExit
        in={isShow}>
        <section className="modal">
          <CSSTransition
            classNames="scale"
            in={isShow}
            timeout={200}>
            <div className={styles.container}>
              <div className={styles.content}>
                <p>{tip}</p>
              </div> 
              <div className={styles.btnGroup}>
                <button className={styles.btn} onClick={onCancel}>{cancelBtn}</button>
                <button className={styles.btn} onClick={onConfirm}>{confirmBtn}</button>
              </div> 
            </div>
          </CSSTransition>
        </section>
      </CSSTransition>

    )
  }
}