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
    const {isShow, onConfirm} = this.props;
    
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
                <h4 className={styles.title}>注册协议</h4>
                <div className={styles.content}>
                  <p>（一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    一.总则（一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    一.总则（一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    （一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    （一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    （一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    一.总则（一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    一.总则（一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                    （一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口。
                （一）12580预约挂号服务（以下简称预约挂号服务）是中国移动12580预约挂号频道在其“服务”中设立的包括电话、网站、手机wap和客户端服务窗口</p>
                </div>
              </div>
              <button className={styles.btn} onClick={onConfirm}>确定</button>
            </div>
          </CSSTransition>
        </section>
      </CSSTransition>

    )
  }
}