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
import userStatisticPage from 'utils/utils'
let startTime=''
let endTime=''
@connect(({ order }) => ({
    // 通用服务订单详情
    // commonOrderBo: order.commonOrderBo
}))

class Index extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            orderId: this.props.location.query.orderId,
        }
    }
    componentWillUnmount =()=> {
        endTime=new Date().getTime()
        if(endTime-startTime>2000){
          userStatisticPage(1,"hcReservationSuccessfulPage",{},startTime,endTime)
        } 
      }
    componentDidMount = () => {
        startTime=new Date().getTime()
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
                <div className={styles.appointResult}>
                    <div className={styles.ARIcon}>
                        <span></span>
                    </div>
                    <div className={styles.ARSuccess}>预约成功</div>
                    <div className={styles.ARInfo}>请耐心等待商家处理结果。</div>
                    <div className={styles.ARCode}><span>核销码</span> : {this.props.location.query.verificationCode}</div>
                    <div className={styles.ARLink}>
                        <div className={styles.ARLinkLeft} onClick={this.returnHome}>返回首页</div>
                        <div className={styles.ARLinkCenter}></div>
                        <div className={styles.ARLinkRight} onClick={this.skipOrder}>查看订单</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;