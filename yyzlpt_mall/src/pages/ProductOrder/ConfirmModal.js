import React, { PureComponent } from 'react';
import styles from './ConfirmModal.less';
import PropTypes from 'prop-types';

export default class Notice extends PureComponent {

  constructor(props) {
    super(props);
    this.maskRef = React.createRef();
    this.state = {
      className: ''
    }
  }

  static propTypes = {
    onConfirm: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.maskRef.current.addEventListener('touchmove', this.handleTouchMove, {passive: false});
  }

  componentWillUnmount() {
    this.maskRef.current.removeEventListener('touchmove', this.handleTouchMove, {passive: false});
  }

  handleTouchMove = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  handleCancel = () => {
    this.setState({className: styles.out});
    setTimeout(() => this.props.onConfirm(0), 200);
  }

  handleConfirm = () => {
    this.setState({className: styles.out});
    setTimeout(() => this.props.onConfirm(1), 200);
  }


  render() {
    return (
      <section className={`${styles.modal} ${this.state.className}`} ref={this.maskRef}>
        <div className={styles.modalContent}>
          <h4 className={styles.modalTitle}>确认要取消订单吗？</h4>
          <div className={styles.btnGroup}>
            <button className={styles.leftBtn} onClick={this.handleCancel}>暂不取消</button>
            <button className={styles.rightBtn} onClick={this.handleConfirm}>确认取消</button>
          </div>
        </div>
      </section>
    )
  }
}