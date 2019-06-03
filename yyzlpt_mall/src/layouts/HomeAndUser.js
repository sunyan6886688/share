import React, { Fragment } from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import styles from './HomeAndUser.less'
class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div style={{height:'100%'}}>
        <div style={{height:'100%'}}>
            <div className={styles.iconBox}>
                <span><b></b></span>
                <span><b></b></span>
            </div>
          {children}
        </div>  
      </div>
    );
  }
}

export default UserLayout;
