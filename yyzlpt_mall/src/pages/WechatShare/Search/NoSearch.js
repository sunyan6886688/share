import React, { PureComponent } from 'react';
import styles from './Index.less';
import listStyle from '../../list.less'
import userStatisticPage from "utils/utils"
import BannerrImg from '@/assets/banner@2x.png'
function CreatSpan({ item, thisObj }) {
  const styleO = item.isShow ? {
    display: 'block'
  } : {
      display: 'none'
    }
  return (
    <span
      onTouchStart={() => thisObj.touchStart(item)}
      onTouchMove={thisObj.touchMove}
      onTouchEnd={()=>thisObj.touchEnd(item,thisObj)}
    >{item.name}
      <b style={styleO} onTouchStart={(e) => {
         e.preventDefault()
        thisObj.props.delHistorySearchList(item.name)
      }
      }></b>
    </span>
  )
}
let timeOutEvent;
let longClick =0;
class NoSearch extends PureComponent {
  touchStart = (item) => {
    const thisObj = this
    longClick=0;//设置初始为0
    timeOutEvent = setTimeout(function (e) {
      thisObj.props.changeState(item)
      longClick=1;//假如长按，则设置为1
    }, 500);
  }
  touchMove = (e) => {
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
    e.preventDefault();
  }
  touchEnd = (item,thisObj) => {
    event.preventDefault()
    clearTimeout(timeOutEvent);
    if (timeOutEvent!=0 && longClick==0) {//点击
      thisObj.props.getSearchList(item.name,'',true)
      //此处为点击事件----在此处添加跳转详情页
    }
    return false;
  }
  hotKeySearch=(item)=>{
    const expand={
      key:item,
    }
    userStatisticPage(0,'hcSearchPageToHotKeyItemEvent',expand,)
    this.props.getSearchList(item,'',true)
  }
  componentWillReciveProps(nextProps) {
    console.log(nextProps);
  }
  render() {
    const style1 = {
      display: 'none'
    }
    const style2 = {
      display: 'block'
    }
    const AppKeyWordList = this.props.AppKeyWordList || [];
    const HistorySearchList = this.props.HistorySearchList ? this.props.HistorySearchList : []
    let showFlage=false
    HistorySearchList.map(item=>{
      item.name?showFlage=true:''
    })
    return (
      <div className={styles.nosearchBox}>
        {AppKeyWordList.length > 0 ?
          <div className={styles.hotSearchBox}>
            <h2>热门搜索</h2>
            <div>
              {
                AppKeyWordList.map(item => (
                  <span
                    onClick={() => this.hotKeySearch(item)}
                    key={item}>{item}</span>
                ))
              }
            </div>
          </div>
          : ''}
        {
          showFlage?
            <div className={styles.hisSearchBox}>
              <h2>搜索历史 <span
                onClick={this.props.delHistorySearchList}
              ></span><b>长按可单个删除</b></h2>
              <div>
                {
                  HistorySearchList.map((item, index) => {
                    if (item.name) {
                      return(
                        <CreatSpan
                        key={item.name}
                        item={item}
                        thisObj={this}
                      >
                      </CreatSpan>
                      )
                     
                    }

                  }

                  )
                }
              </div>
            </div>
            : ''
        }
      </div>

    );
  }
}

export default NoSearch;
