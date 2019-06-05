import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Agreement.less';
import PropTypes from 'prop-types';

export default class Agreement extends React.PureComponent {

  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  render() {
    const {isShow, onConfirm, children} = this.props;
    
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
              <div className={styles.article}>
                {children}
              </div>
              <button className={styles.btn} onClick={onConfirm}>确定</button>
            </div>
          </CSSTransition>
        </section>
      </CSSTransition>

    )
  }
}