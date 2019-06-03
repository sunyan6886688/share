import React, { PureComponent } from 'react';
import styles from './Index.less';
import listStyle from '../list.less'
import NoSearch from './NoSearch'
import SerachList from './SearchList'
import BannerrImg from '../../assets/banner@2x.png'
import { connect } from 'dva';
import router from 'umi/router';
import loadIngImg from '../../assets/loading.gif'
import Scroll from 'components/Scroll/index'
import ViewBox from 'components/ViewBox/index'
import userStatisticPage from "utils/utils"
let allSearchList = {
  storeInfoList: [],
  offerInfoList: []
};
let startTime=''
let endTime=''
@connect(({ search }) => ({
  AppKeyWordList: search.AppKeyWordList,
  searchList: search.searchList,
  haveNext: search.haveNext,
}))
class ShopList extends PureComponent {
  state = {
    HistorySearchList: JSON.parse(localStorage.getItem('HistorySearchList')),
    changState: 0,
    searchType:0,
    keyWord:'',
  }
  pageNum = 1;
  searchVal = '';
  componentWillUnmount =()=> {
    endTime=new Date().getTime()
    if(endTime-startTime>2000){
      userStatisticPage(1,"hcHomeSaerchPage",{},startTime,endTime)
    } 
  }
  componentDidMount = () => {
    startTime=new Date().getTime()
    if(localStorage.getItem('keyWord')){
      this.setState({
        changState: localStorage.getItem('changState'),
      searchType:localStorage.getItem('searchType'),
      keyWord:localStorage.getItem('keyWord')
      },()=>{
        this.getSearchList()
      })
    }
    
    // 修改默认搜索历史状态
    const HistorySearchListnew = this.state.HistorySearchList
    HistorySearchListnew ? HistorySearchListnew.map((item) => {
      item.isShow = false
      return item
    }) : ''
    localStorage.setItem('HistorySearchList', JSON.stringify(HistorySearchListnew));
    this.setState({
      HistorySearchList: JSON.parse(localStorage.getItem('HistorySearchList'))
    })
    // 获取热门搜索关键字
    this.getAppKeyWordList()
  }
  // 子组建修改父组建state
  changeStateAll = (valueName, key) => {
    const value = this.state
    value[valueName] = key
    this.setState({
      value
    })
    if(valueName=='searchType'){
      this.getSearchList()
    }
  }
  // 获取热门搜索关键字
  getAppKeyWordList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'search/getAppKeyWordList'
    })
  }
  // 长按修改状态
  changeState = (value) => {
    const HistorySearchListnew = this.state.HistorySearchList
    HistorySearchListnew.map((item) => {
      item.name == value.name ? item.isShow = true : ''
      return item
    })
    localStorage.setItem('HistorySearchList', JSON.stringify(HistorySearchListnew));
    this.setState({
      HistorySearchList: JSON.parse(localStorage.getItem('HistorySearchList'))
    })
  }

  handleSearchChange = e => {
    this.setState({
      keyWord: e.target.value
    })
  }

  handleSearchSubmit = e => {
    const expand={
      key:this.state.keyWord,
    }
    userStatisticPage(0,'hcSearchPageToSearchClickEvent',expand,)
    e.preventDefault();
    let HistorySearchList = JSON.parse(localStorage.getItem('HistorySearchList')) || [];
      const newValue = {
        name: this.state.keyWord,
        isShow: false
      }
    
      HistorySearchList.findIndex(item => item.name === newValue.name) < 0 ? HistorySearchList.push(newValue) : '';
      HistorySearchList.length > 10 ? HistorySearchList.shift() : '';
      localStorage.setItem('HistorySearchList', JSON.stringify(HistorySearchList));
      this.setState({
        HistorySearchList: JSON.parse(localStorage.getItem('HistorySearchList')),
        searchType:0
      }, () => this.getSearchList())
  }


  // 搜索
  getSearchList = (value, isLoadMore,clickSrarch) => {
    this.searchVal = value || '';
    if(this.props.haveNext===false&&isLoadMore){
      return Promise.resolve()
    }
    if(clickSrarch){
      this.setState({
        searchType:0
      })
    }
    this.pageNum = 1;
    allSearchList = {
      storeInfoList: [],
      offerInfoList: []
    };
    
    if(value || this.state.keyWord){
      this.setState({
        changState: 1
      })
      let HistorySearchList = JSON.parse(localStorage.getItem('HistorySearchList')) || [];
      const newValue = {
        name:value,
        isShow: false
      }
  
      HistorySearchList.findIndex(item => item.name === newValue.name) < 0 ? HistorySearchList.push(newValue) : '';
      HistorySearchList.length > 10 ? HistorySearchList.shift() : '';
      localStorage.setItem('HistorySearchList', JSON.stringify(HistorySearchList));
      this.setState({
        HistorySearchList: JSON.parse(localStorage.getItem('HistorySearchList'))
      })
      const { dispatch } = this.props
      if (value) {
        this.setState({
          keyWord: value
        })
      }
      localStorage.setItem('changState',2)
      localStorage.setItem('keyWord', value || this.state.keyWord)
      localStorage.setItem('searchType',this.state.searchType)
      return dispatch({
        type: 'search/searchList',
        payload: {
          keyWord: value || this.state.keyWord,
          searchType: this.state.searchType,
          "gisLat": localStorage.getItem('UserCityLat'),
          "gisLng": localStorage.getItem('UserCityLng'),
          pageNum: this.pageNum,
          pageSize: 10
        }
      }).then(()=>{
        this.setState({
            changState: 2
          })
      })
    }
    
  }

  getMoreSearchList = (isLoadMore) => {
    if(this.props.haveNext===false&&isLoadMore){
      return Promise.resolve()
    }
    if( !(this.value || this.state.keyWord)){
      return Promise.resolve()
    }
    this.pageNum = isLoadMore ? this.pageNum + 1 : 1;
    if (!isLoadMore) {
      allSearchList = {
        storeInfoList: [],
        offerInfoList: []
      };
    }
       
    return this.props.dispatch({
      type: 'search/searchList',
      payload: {
        keyWord: this.value || this.state.keyWord,
        searchType: this.state.searchType,
        "gisLat": localStorage.getItem('UserCityLat'),
        "gisLng": localStorage.getItem('UserCityLng'),
        pageNum: this.pageNum,
        pageSize: 10
      }
    })
    
  }

  // 删除搜索历史
  delHistorySearchList = (value) => {
    if (typeof value == 'string') {
      let HistorySearchList = JSON.parse(localStorage.getItem('HistorySearchList'))
      HistorySearchList.splice(HistorySearchList.findIndex(item => item.name === value), 1)
      localStorage.setItem('HistorySearchList', JSON.stringify(HistorySearchList));
    } else {
      localStorage.setItem('HistorySearchList', '[]');
    }

    this.setState({
      HistorySearchList: JSON.parse(localStorage.getItem('HistorySearchList'))
    })
  }
  
  // 取消
  cancelFun = () => {
    if (this.state.changState == 2) {
      this.setState({
        changState: 0
      })
    } else {
      router.goBack()
    }
    localStorage.setItem('changState',0)
    localStorage.setItem('keyWord','')
    localStorage.setItem('searchType','')
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'search/clearStroeList'
    });
  }
  createNewList(listName) {
    const {searchList} = this.props;
    if (!searchList) return;
    const idName = this.state.searchType == 1 ? 'id' : 'commodityId';
    searchList[listName] && searchList[listName].forEach(item => {
      if (allSearchList[listName].findIndex(innerItem => innerItem[idName] === item[idName]) < 0) {
        allSearchList[listName].push(item);
      }
    })
  }

  render() {
    let tip;
    if (this.state.searchType == 0) {
      allSearchList = this.props.searchList;
    } else if (this.state.searchType == 1) {
      this.createNewList('storeInfoList');
      if (allSearchList && allSearchList.storeInfoList && allSearchList.storeInfoList.length > 0) {
        tip =  <footer>— 已加载全部 —</footer>
      } else {
        tip = null
      }
    } else {
      this.createNewList('offerInfoList');
      if (allSearchList && allSearchList.offerInfoList && allSearchList.offerInfoList.length > 0) {
        tip =  <footer>— 已加载全部 —</footer>;
      } else {
        tip = null;
      }
    }



    return (

      <Scroll className={styles.scroll}
          ref={ref => { this.scrollCt = ref }}
          doPullDownFresh={() => this.getMoreSearchList(false)}
          pullUpLoadMoreData={() => this.getMoreSearchList(true)}
          pullUpLoad={this.props.haveNext}
          disabled={this.state.changState == 0}
        >
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.search}>
            <span></span>
            <form action="#" onSubmit={this.handleSearchSubmit}>
              <input
                type="search"
                placeholder='医疗机构/商家/商品'
                value={this.state.keyWord}
                onChange={this.handleSearchChange}/>
            </form>
            <span></span>
          </div>
          <button onClick={this.cancelFun}>取消</button>
        </header>
        {this.state.changState == 0 ?
          <NoSearch
            AppKeyWordList={this.props.AppKeyWordList}
            HistorySearchList={this.state.HistorySearchList}
            delHistorySearchList={this.delHistorySearchList}
            getSearchList={this.getSearchList}
            changeState={this.changeState}
          ></NoSearch> :this.state.changState == 1 ?
          <div className={styles.loadIng}>
          <p>加载中...</p>
          {/* <img src={loadIngImg}></img> */}
          </div>
          :
          <SerachList
            searchList={allSearchList}
            searchType={this.state.searchType}
            changeStateAll={this.changeStateAll}
            searchKey={this.state.keyWord}
          ></SerachList>
        }
        {
          this.state.changState == 2 && this.state.searchType != 0 ? (this.props.haveNext ? <footer>— 加载中 —</footer> : tip) : null
        }
      
      </div>
      </Scroll>
    );
  }
}

export default ShopList;
