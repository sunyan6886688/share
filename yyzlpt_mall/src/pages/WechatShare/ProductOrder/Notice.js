import React, { PureComponent } from 'react';
import styles from './Notice.less';
import PropTypes from 'prop-types';

export default class Notice extends PureComponent {

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.state = {
      style: null,
      className: ''
    }
  }

  static sropTypes = {
    onClose: PropTypes.func.isRequired
  }

  componentDidMount() {
    const contentHeight = this.contentRef.current.clientHeight;
    const maxHeight = document.documentElement.clientHeight * 0.94;
    this.setState({
      style: contentHeight > maxHeight
              ? {marginTop: '.72rem'}
              : {
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
              }
    })
  }

  handleConfirm = () => {
    this.setState({className: styles.slideOut})
    setTimeout(() => this.props.onClose(), 200);
  }

  render() {
    return (
      <section className={`${styles.noticeSec} ${this.state.className}`}>
        <div className={styles.noticeContainer} style={this.state.outStyle}>
        <div className={styles.noticeContent} ref={this.contentRef} style={this.state.style}>
          <h3><span className={styles.icon} />健康服务预约须知</h3>
          <h4>预约及支付</h4>
          <ul>
            <li>1.健康服务采用线上预约，线下到店消费的模式</li>
            <li>2.预约时请填写真实的联系人信息，方便商户联系确认到店时间等信息</li>
          </ul>

          <h4>商品使用</h4>
          <ul>
            <li>1.可到店消费时间以商品购买须知为准，请仔细阅读商品详情及购买须知 </li>
            <li>2.到店时请向商户展示订单详情页确认码进行消费</li>
            <li>3.订单实际真实支付金额及支付方式以线下商户解释为准，消费前请仔细确认</li>
          </ul>

          <h4>退款及取消</h4>
          <ul>
            <li>1.暂不支持在线支付及退款</li>
            <li>2.购买商品未使用前可以随时取消</li>
            <li>3.已使用并核销的商品不可在线取消，请与商户线下沟通退款</li>
          </ul>

          <h4>售后服务</h4>
          <ul>
            <li>1.浙江健康导航仅为信息服务平台，健康商品/服务由第三方商家提供。您通过浙江健康导航平台购买各项商品/服务时应仔细阅读商户的商品/服务信息，并根据您的独立判断选择购买。若遇到支付问题，或购买的商品/服务出现质量问题，请与商户进行沟通协商。</li>
          </ul>
        </div>
        <button className={styles.btn} onClick={this.handleConfirm}>确认</button>
        </div>
      </section>
    )
  }
}