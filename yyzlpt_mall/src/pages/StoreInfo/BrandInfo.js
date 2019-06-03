import React, { PureComponent } from 'react';
import styles from './BrandInfo.less';
import listStyle from '../list.less'
import BannerrImg from '../../assets/banner@2x.png'
import { Carousel, WingBlank } from 'antd-mobile';
import Active from '../../assets/Active@2x.png';
import router from 'umi/router';
import TextOverflow from '../../components/TextOverflow';
import ImgPreview from '../../components/ImgPreview';

const defaultBanner = [{id: 'default', path: BannerrImg}];
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currIndex: 0,
      imgList: null,
      isShowImg: false,
      imgList: this.props.brandInfo.imageList || defaultBanner
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     imgList: brandInfo.imageList ? brandInfo.imageList : defaultBanner
  //   })
  // }
 
  // 跳转门店主页
  toStoreHome = (id) => {
    router.push({
      pathname: `/storeHome`,
      query: { storeId: id, }
    });
  }
  //跳转到产品
  toProductInfo = (e, id) => {
    e.stopPropagation();
    router.push({
      pathname: `/ProductOrder/ProductInfo`,
      query: { commodityId: id, }
    });
  }

  handleAtferChange = currIndex => {
    this.setState({currIndex})
  }

  handleCarouselClick = e => {
    this.setState({
      isShowImg:true,
    })
  }
 
  closeImgBox= currIndex =>{
    this.setState({
      isShowImg:false,
      currIndex
    })
  }
 
  
  render() {
    const { storeList, brandInfo } = this.props;
    const { currIndex, imgList, isShowImg } = this.state;
    return (
      <section>
        <div className={styles.brandInfo}>
          <h4 className={styles.brandInfoTitle}>品牌信息</h4>
          <div className={styles.carouselContainer} onClick={this.handleCarouselClick}>
            {
              imgList.length > 1 ? 
                <Carousel
                infinite
                selectedIndex={currIndex}
                dots={false}
                afterChange={this.handleAtferChange}>
                {
                    imgList.map(item => (
                      <img className={styles.img} src={item.path} key={item.id}/>
                    ))
                }
              </Carousel> :
              <img className={styles.img} src={imgList[0].path}/>
            }
            <div className={styles.imgCount}>{currIndex + 1}/{imgList.length}</div>
          </div>
          
          <TextOverflow line={5} text={brandInfo.info}/>
        </div>


        <div className={listStyle.listTitleT}>
          <span>旗下门店</span>
        </div>
        <div className={listStyle.list}>
          <ul>
            {storeList && storeList.length > 0 &&
              storeList.map(item => {
                const Background = item.storeLogo ? item.storeLogo.path : BannerrImg
                const distanceNum = item.distance ? item.distance > 1000 ? item.distance / 1000 : item.distance : 0
                const pricePerPerson = item.pricePerPerson ? item.pricePerPerson / 1000 : 0
                return (
                  <li onClick={() => this.toStoreHome(item.storeId)} key={item.storeId}>
                    <img className={listStyle.liLeft} src={Background} />
                    <div className={listStyle.liRight}>
                      <div className={listStyle.liTitle}>{item.storeName}</div>
                      <div className={listStyle.liPrice}>
                        {item.pricePerPerson>0?item.distance ?
                          <b>¥{pricePerPerson.toFixed(2)}/人</b> :
                          <b style={{ background: 'none' }}>¥{pricePerPerson.toFixed(2)}/人</b>:''
                        }

                        {distanceNum > 0 &&
                          <i>距您{distanceNum.toFixed(2)}{item.distance > 1000 ? 'km' : 'm'}</i>
                        }

                      </div>

                      {
                        item.hotGoodsName && <div className={listStyle.dec}  onClick={(e) => {
                            this.toProductInfo(e, item.hotGoodsId)
                          }}>
                          {item.hotGoodsName && <span>hot</span>}
                          <p>{item.hotGoodsName}</p>
                        </div>
                      }
                    </div>
                  </li>
                )
              }

              )
            }
          </ul>
        </div>
        {
          isShowImg &&
            <ImgPreview imgList={imgList}
                        onClose={this.closeImgBox}/>
        }
      </section>
    );
  }
}
export default Index;
