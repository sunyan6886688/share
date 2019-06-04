import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './index.less';
import PropTypes from 'prop-types';

export default class AlertModal extends React.PureComponent {

  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    tip: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  render() {
    const {isShow, onConfirm, tip} = this.props;

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
              <button className={styles.btn} onClick={onConfirm}>确定</button>
            </div>
          </CSSTransition>
        </section>
      </CSSTransition>

    )
  }
}