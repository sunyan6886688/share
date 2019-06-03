/*
* @Author: Jan-superman
* @Date: 2018-09-27 20:38:37
* @Last Modified by: Jan-superman
* @Last Modified time: 2018-11-07 23:33:55
*/
import React, { PureComponent } from 'react';
import { Icon } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './appointResult.less';

class Index extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            orderId: this.props.location.query.orderId,
        }
    }
    componentDidMount = () => {
    }
    // 返回首页
    returnHome = () => {
        router.push({
            pathname: '/'
        })
    }
    // 跳转到订单详情
    skipOrder = () => {
        router.push({
            pathname: '/ProductOrder',
            query: {
                orderId: this.state.orderId,
            }
        })
    }
    render() {
        return (
            <div className={styles.appointBox}>
                {/* 后退按钮 */}
                {/* <div className={styles.appointTitle}>
                    <span className={styles.bg}></span>
                </div> */}
                <div className={styles.successResult}>
                    <div className={styles.ARIcon}>
                        <span></span>
                    </div>
                    <div className={styles.ARDefault}>预约失败</div>
                    <div className={styles.ARInfo}>由于系统原因，提交订单失败</div>
                    <div className={styles.ARPhone}>
                        <span></span>
                        <span>联系商家</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;