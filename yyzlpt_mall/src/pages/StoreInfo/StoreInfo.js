import React, { PureComponent } from 'react';
import styles from './StoreInfo.less';
import BannerrImg from '../../assets/noBg.png'
import { Carousel, WingBlank } from 'antd-mobile';
import Active from '../../assets/Active@2x.png';
import router from 'umi/router';
import { connect } from 'dva';
import ImgPreview from '../../components/ImgPreview';
import BrandInfo from './BrandInfo';
import userStatisticPage from 'utils/utils'
let startTime=''
let endTime=''
@connect(({ store, storelist }) => ({
  StoreInfo: store.StoreInfo,
  storeList: storelist.StoreListByBrandId4App,
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgList: null,
      isShowImg: false,
    };
  }
  componentWillUnmount =()=> {
    endTime=new Date().getTime()
    if(endTime-startTime>2000){
      userStatisticPage(1,"hcStoreInfoPage",{},startTime,endTime)
    } 
  }
  componentDidMount = () => {
    startTime=new Date().getTime()
    this.getStoreInfo()
  }
  getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;

  }
  getStoreInfo = () => {
    this.props.dispatch({
      type: 'store/getStoreInfo',
      payload: {
        "gisLat": "30.25924446",
        "gisLng": "120.21937542",
        "id": this.getQueryString('storeId'),
        "token": "kuoAb7UakQY3QmGkwuRifk05XBYevSqHElCnSEK5outymCEi0yMCcds0fVUtry2T"
      }
    }).then(res => {
      if (res && res.result && res.result.brandInfoVo) {
        this.getStoreListByBrandId4App(res.result.brandInfoVo.brandId)
      }
    })
  }

  // 获取门店列表
  getStoreListByBrandId4App = brandId => {
    this.props.dispatch({
      type: 'storelist/getStoreListByBrandId4App',
      payload: {
        "brandId": brandId,
        "gisLat": localStorage.getItem('UserCityLat'),
        "gisLng": localStorage.getItem('UserCityLng')
      }
    })
  }

  showImg=(url)=>{
    this.setState({
      isShowImg:true,
      imgList:[{path: url}]
    })
  }
 
  closeImgBox=()=>{
    this.setState({
      isShowImg:false,
    })
  }
 
  render() {
    const hospitalPropertyArr = ['公开', '民营', '合资', '外资', '其它']
    const { StoreInfo, storeList } = this.props;
    const { imgList, currIndex, isShowImg } = this.state;
    let hospitalProperty = '私营'
    StoreInfo ? StoreInfo.hospitalVo ?
      hospitalProperty = hospitalPropertyArr[StoreInfo.hospitalVo.hospitalProperty - 1]
      : '' : ''
    return (
      <div className={styles.body}>
        <div className={styles.infoBox}>
              <p className={styles.infoBoxTitle}>门店简介</p>
              <div className={styles.infoContent}>
                <p>{StoreInfo && StoreInfo.info}</p>
              </div>
        </div>

        {
          StoreInfo && StoreInfo.serviceName && StoreInfo.serviceName.length > 0 &&
            <div className={styles.serverBox}>
              <p>开通服务</p>
              <div className={styles.contentBox}>
                {
                  StoreInfo.serviceName.map(item => (
                    <span key={item}>{item}</span>
                  ))
                }
              </div>
            </div>
        }

        <div className={styles.serverTime}>
          <b>服务时间</b><span>{StoreInfo ? StoreInfo.serviceTime : '未填写'}</span>
        </div>
        <div className={styles.infoList}>
          <ul>
            <li>
              <b>成立时间</b><span>{StoreInfo ? StoreInfo.foundingTime?StoreInfo.foundingTime.split(' ')[0] : '未填写': '未填写'}</span>
            </li>
            <li>
              <b>经营性质</b><span>
                {hospitalProperty}
              </span>
            </li>
            <li>
              <b>门店面积</b><span>{StoreInfo ?  StoreInfo.storeArea?StoreInfo.storeArea+'平方米' : '未填写':'未填写'}</span>
            </li>
            <li>
              <b>证照信息</b>
              <div>
                {
                  StoreInfo && StoreInfo.licenseImg &&
                    <img src={StoreInfo.licenseImg.path}
                         onClick={()=>this.showImg(StoreInfo.licenseImg.path)}/>
                }
                {
                  StoreInfo && StoreInfo.practiceLicense &&
                    <img src={StoreInfo.practiceLicense.path}
                         onClick={()=>this.showImg(StoreInfo.practiceLicense.path)} />
                }
              </div>
            </li>
          </ul>
        </div>
        
        {
          StoreInfo && StoreInfo.brandInfoVo && 
            <BrandInfo brandInfo={StoreInfo.brandInfoVo}
                       storeList={storeList}/>
        }

        {
          isShowImg &&
            <ImgPreview imgList={imgList}
                        onClose={this.closeImgBox}/>
        }
       
      </div>
    );
  }
}
export default Index;
