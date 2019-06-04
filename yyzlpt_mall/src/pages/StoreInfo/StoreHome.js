import React, { PureComponent } from 'react';
import styles from './StoreHome.less';
import listStyle from '../list.less';
import BannerrImg from '../../assets/noBg.png';
import { Carousel, WingBlank } from 'antd-mobile';
import Active from '../../assets/Active@2x.png';
import router from 'umi/router';
import { connect } from 'dva';
import jkdh from '../../utils/jkdh';
import userStatisticPage from 'utils/utils';
import { Toast } from 'antd-mobile';
import ImgPreview from '@/components/ImgPreview';
import Share from '@/components/Share';
let startTime = '';
let endTime = '';
@connect(({ store }) => ({
  StoreInfo: store.StoreInfo,
  AppHotOffers: store.AppHotOffers,
}))
class StoreHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataC: ['1', '2', '3', '4'],
      imgHeight: ' 180px',
      refreshing: false,
      heightP: document.documentElement.clientHeight,
      bannerIndex: 0,
      isShowImgPreview: false,
    };
  }
  componentDidMount = () => {
    startTime = new Date().getTime();
    this.getStoreInfo();
    this.getAppHotOffers();
  };
  componentWillUnmount = () => {
    endTime = new Date().getTime();
    if (endTime - startTime > 2000) {
      userStatisticPage(1, 'hcStoreHomePage', {}, startTime, endTime);
    }
  };
  toStoreInfo = storeId => {
    userStatisticPage(0, 'hcStoreHomeToNameEvent', {});
    router.push({
      pathname: `/storeInfo`,
      query: { storeId: storeId },
    });
  };
  getQueryString = name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  };
  getStoreInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'store/getStoreInfo',
      payload: {
        gisLat: localStorage.getItem('UserCityLat'),
        gisLng: localStorage.getItem('UserCityLng'),
        id: this.getQueryString('storeId'),
      },
    });
  };
  getAppHotOffers = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'store/getAppHotOffers',
      payload: {
        platType: 2,
        storeId: this.getQueryString('storeId'),
      },
    });
  };
  //跳转到产品
  toProductInfo = (id, packageName) => {
    const expand = {
      packageId: id,
      packageName: packageName,
    };
    userStatisticPage(0, 'hcStoreHomeToPackageItemEvent', expand);
    router.push({
      pathname: `/ProductOrder/ProductInfo`,
      query: { commodityId: id },
    });
  };
  getQueryString = name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  };
  //跳转到门店全部产品
  toProductList = value => {
    userStatisticPage(0, 'hcStoreHomeToAllProductEvent', {});
    router.push({
      pathname: `/productList`,
      query: { storeId: this.getQueryString('storeId'), serviceName: value },
    });
  };
  toCMap = () => {
    userStatisticPage(0, 'hcStoreHomeToAddressEvent', {});
    const { StoreInfo } = this.props;
    if (StoreInfo && StoreInfo.gisLat) {
      const value = {
        latitude: StoreInfo.gisLat,
        longitude: StoreInfo.gisLng,
        title: StoreInfo.storeName,
        addressName: StoreInfo.address,
      };
      jkdh.business.openMap(value).then(res => console.log(res));
    } else {
      Toast.fail('当前门店未设置地理位置无法定位');
    }
  };
  callPhone = value => {
    userStatisticPage(0, 'hcStoreHomeToTelEvent', {});
    jkdh.business.telPhone({
      phoneNumber: value,
    });
  };
  handleBannerClick = () => {
    userStatisticPage(0, 'hcStoreHomeToShowImgEvent', {});
    this.setState({ isShowImgPreview: true });
  };
  handleImgPreviewClose = bannerIndex => {
    this.setState({
      isShowImgPreview: false,
      bannerIndex,
    });
  };
  render() {
    const { StoreInfo, AppHotOffers } = this.props;
    const { bannerIndex, isShowImgPreview } = this.state;
    const serviceName = StoreInfo ? (StoreInfo.serviceName ? StoreInfo.serviceName : []) : [];
    const bannerList = [];
    StoreInfo
      ? StoreInfo.homeFileVo
        ? bannerList.push(StoreInfo.homeFileVo)
        : bannerList.push({ id: 'xxx', path: BannerrImg })
      : '';
    StoreInfo ? bannerList.push() : '';

    StoreInfo
      ? StoreInfo.pharmacyVo
        ? StoreInfo.pharmacyVo.imageIdList.length > 0
          ? StoreInfo.pharmacyVo.imageIdList.map(item => bannerList.push(item))
          : ''
        : ''
      : '';

    StoreInfo
      ? StoreInfo.hospitalVo
        ? StoreInfo.hospitalVo.hospitalImageList.length > 0
          ? StoreInfo.hospitalVo.hospitalImageList.map(item => bannerList.push(item))
          : ''
        : ''
      : '';

    StoreInfo
      ? StoreInfo.medicalVo
        ? StoreInfo.medicalVo.medicalImageList.length > 0
          ? StoreInfo.medicalVo.medicalImageList.map(item => bannerList.push(item))
          : ''
        : ''
      : '';
    const distanceNum = StoreInfo
      ? StoreInfo.distance > 1000
        ? StoreInfo.distance / 1000
        : StoreInfo.distance
      : 0;
    let shareLink=window.location.href
    shareLink=shareLink.replace('storeHome','share/storeHome')
    return (
      <div className={styles.body}>
        <div className={styles.banner}>
          <div className={styles.bottom} onClick={this.handleBannerClick}>
            {bannerList.length > 1 ? (
              <WingBlank>
                <Carousel
                  autoplay={false}
                  autoplayInterval="3000"
                  selectedIndex={bannerIndex}
                  infinite
                  dotStyle={{
                    width: '0.08rem',
                    height: '0.08rem',
                    background: 'rgba(225,228,232,1)',
                  }}
                  dotActiveStyle={{
                    width: '0.08rem',
                    height: '0.08rem',
                    background: 'rgba(0,127,255,1)',
                  }}
                  // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                  afterChange={index =>
                    this.setState({
                      bannerIndex: index,
                    })
                  }
                  slideWidth={1}
                >
                  {bannerList.length > 0 ? (
                    bannerList.map(item => (
                      <a key={item.id}>
                        <img
                          src={item.path || BannerrImg}
                          alt=""
                          onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                          }}
                        />
                      </a>
                    ))
                  ) : (
                    <a>
                      <img
                        src={BannerrImg}
                        alt=""
                        onLoad={() => {
                          window.dispatchEvent(new Event('resize'));
                        }}
                      />
                    </a>
                  )}
                </Carousel>
              </WingBlank>
            ) : bannerList.length > 0 ? (
              <a>
                <img
                  src={bannerList[0].path}
                  alt=""
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </a>
            ) : (
              ''
            )}

            <div className={styles.shadowBox} />
          </div>
          <span className={styles.CarouselNum}>
            {this.state.bannerIndex + 1}/{bannerList.length}
          </span>
          <div className={styles.top}>
            <div className={styles.title}>
              <div onClick={() => this.toStoreInfo(StoreInfo ? StoreInfo.id : '')}>
                <b>{StoreInfo ? StoreInfo.storeName : ''}</b>
                <span />
              </div>

              <Share
                className={styles.shareBtn}
                title={StoreInfo && StoreInfo.storeName}
                desc={StoreInfo && StoreInfo.info}
                link={shareLink}
                imageUrl={bannerList[0] ? bannerList[0].path : BannerrImg}
              />
            </div>
            <div className={styles.address}>
              <div className={styles.addressinfo} onClick={this.toCMap}>
                {StoreInfo ? (
                  StoreInfo.distance ? (
                    <div>
                      <p>{StoreInfo ? StoreInfo.address : ''}</p>
                      <span>
                        距您
                        {distanceNum.toFixed(2)}
                        {StoreInfo.distance > 1000 ? 'km' : 'm'}
                      </span>
                    </div>
                  ) : (
                    <p className={styles.noAddress}>{StoreInfo ? StoreInfo.address : ''}</p>
                  )
                ) : (
                  ''
                )}
              </div>
              {StoreInfo ? (
                StoreInfo.linkPhone ? (
                  // <a href={'tel:' + StoreInfo.linkPhone}>
                  <div
                    className={styles.phone}
                    onClick={() => this.callPhone(StoreInfo.linkPhone)}
                  />
                ) : (
                  // </a>
                  ''
                )
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <div className={listStyle.listTitleT}>
          <span>热门商品</span>
          <b onClick={() => this.toProductList()}>查看全部商品</b>
        </div>
        <div className={listStyle.serverList}>
          <ul>
            {AppHotOffers
              ? AppHotOffers.length > 0
                ? AppHotOffers.map(itme => {
                    const marketingPrice = itme.marketingPrice ? itme.marketingPrice / 100 : 0;
                    return (
                      <li onClick={() => this.toProductInfo(itme.id, itme.offerName)} key={itme.id}>
                        <img className={listStyle.liLeft} src={itme.fileBo.path} />
                        <div className={listStyle.liRight}>
                          <div className={listStyle.liTitle}>
                            {itme.isHot == 1 ? <span>hot</span> : ''}
                            {itme.tagNames ? '[' + itme.tagNames.split(',')[0] + ']' : ''}
                            {itme.offerName}
                          </div>
                          <div className={listStyle.liPrice}>
                            <b>¥{marketingPrice > 0 ? marketingPrice.toFixed(2) : 0}</b>
                          </div>
                        </div>
                        <div className={listStyle.num}>
                          已预约
                          {itme.orderNumber}人
                        </div>
                      </li>
                    );
                  })
                : ''
              : ''}
          </ul>
        </div>
        {serviceName.length > 1 ? (
          <div className={listStyle.listTitleT}>
            <span>开通服务</span>
          </div>
        ) : (
          ''
        )}
        {serviceName.length > 1 ? (
          <div className={styles.serverNav}>
            <ul>
              {serviceName.length > 0
                ? serviceName.map(item => (
                    <li onClick={() => this.toProductList(item)}>
                      <img src={Active} />
                      <span>{item}</span>
                    </li>
                  ))
                : ''}
            </ul>
          </div>
        ) : (
          ''
        )}

        {isShowImgPreview && (
          <ImgPreview
            currIndex={bannerIndex}
            imgList={bannerList}
            onClose={this.handleImgPreviewClose}
          />
        )}
      </div>
    );
  }
}
export default StoreHome;
