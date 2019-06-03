import React from 'react';
import shareImg from '@/assets/share@2x.png';
import jkdh from '@/utils/jkdh';
// import Toast from 'antd-mobile';
import styles from './index.less';
import PropTypes from 'prop-types';


export default class Share extends React.PureComponent {
    
    static defaultProps = {
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        className: ''
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        desc: PropTypes.string,
        link: PropTypes.string.isRequired,
        imgUrl: PropTypes.string,
        className: PropTypes.string
    }

    handleShare = () => {
        console.log(this.props);
      jkdh.business.share({
          title: this.props.title,
          desc: this.props.desc,
          link: this.props.link,
          imgUrl: this.props.imgUrl,
          success: ret => {
              console.log('分享成功----', ret);
              //Toast.success('分享成功');
          },
          fail: msg => {
              console.log('分享失败----', msg)
              // Toast.success('分享成功');
          }
      })
      
    }
 
    render() {
        return (
           <button type="button" onClick={this.handleShare} className={`${styles.btn} ${this.props.className}`}>
               <img src={shareImg} className={styles.img} />
           </button>
        )
    }
}