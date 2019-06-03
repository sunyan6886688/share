/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */
import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './Home.less';
import NavImg from '../../assets/NavImg.png'
import BannerrImg from '../../assets/banner@2x.png'
import { Carousel, WingBlank,PullToRefresh , ListView} from 'antd-mobile';
import List from './list'
function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}
const NUM_ROWS = 20;
let pageIndex = 0;
const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
class Index extends PureComponent {
  
  constructor(props) {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      dataSource,
      height: document.documentElement.clientHeight,
      data1: ['1', '2', '3', '4'],
      imgHeight: ' 180px',
      refreshing:false,
      useBodyScroll:true
    };
  }
  onEndReached = (event) => {
    console.log('0000')
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };
  onRefresh = () => {
    console.log('111')
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };
  componentDidMount() {
    const hei = this.state.height
    // const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}
          style={{
            padding: '0 15px',
            backgroundColor: 'white',
          }}
        >
          <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
            {obj.title}
          </div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
            <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ display: 'inline-block' }}>
              <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
              <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <PullToRefresh
      distanceToRefresh={100}
      refreshing={this.state.refreshing}
      onRefresh={() => {
        this.onRefresh()
      }}
      damping={100}
      ref={el => this.ptr = el}
      style={{
        height: this.state.height,
        overflow: 'auto',
      }}
      >
      <div className={styles.body} >
        <header className={styles.header}>
          <div className={styles.address}>
            <i>杭州</i>
            <span></span>
          </div>
          <div className={styles.search}>
            <span></span>
            <input
              placeholder='医疗机构/商家/项目'
            ></input>
            <span></span>
          </div>
        </header>
        <nav>
          <ul>
            <li>
              <img src={NavImg}></img>
              <span>挂号</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>体检</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>口腔科</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>眼科</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>母婴</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>医美</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>中医</span>
            </li>
            <li>
              <img src={NavImg}></img>
              <span>全部</span>
            </li>
          </ul>
        </nav>
        <div className={styles.banner}>
          <WingBlank>
            <Carousel
              autoplay={true}
              autoplayInterval='3000'
              infinite
              dotStyle={{ width: '0.08rem', height: '0.08rem', background: 'rgba(225,228,232,1)' }}
              dotActiveStyle={{ width: '0.08rem', height: '0.08rem', background: 'rgba(0,127,255,1)' }}
              // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}//切换面板前回调
              // afterChange={index => console.log('slide to', index)}//切换面板后回调
              slideWidth={1}
            >
              {this.state.data1.map(val => (
                <a
                  key={val}
                >
                  <img
                    src={BannerrImg}
                    alt=""
                    onLoad={() => {
                      window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
        </div>
        <div className={styles.listTitle}>
          <span>精选机构</span><b>查看更多</b>
        </div>
        <div>
        <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        onEndReachedThreshold={1}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
        </div>
      </div>
      </PullToRefresh>
    );
  }
}

export default Index;
