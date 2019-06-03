/*
 * @Author: Jan-superman 
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */
import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import styles from './ChooseCity.less';
import listStyle from '../../list.less'
import NavImg from '@/assets/NavImg.png'
import BannerrImg from '@/assets/banner@2x.png'
import { Carousel, WingBlank, PullToRefresh, ListView } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
@connect(({ home }) => ({
  AareByParentCode: home.AareByParentCode,
}))
class Index extends PureComponent {
  // 获取浙江所有的市
queryAareByParentCode = () => {
  const { dispatch } = this.props;
  dispatch({
    type: 'home/queryAareByParentCode',
    payload: {
      "areaCode": "330000"
    }
  })
}
chooseCity=(item)=>{
  if(item){
    let cityName=item.areaName.replace('市','')
    localStorage.setItem('UserChooseCity',cityName)
    localStorage.setItem('areaName',cityName)
    localStorage.setItem('UserChooseCityCode',item.areaCode)
    localStorage.setItem('areaCode',item.areaCode)
    router.goBack()
  }else{
    localStorage.setItem('UserChooseCity','全部')
    localStorage.setItem('UserChooseCityCode','')
    localStorage.setItem('areaCode','')
    localStorage.setItem('areaName','全部')
    router.goBack()
  }
 
}
componentDidMount=()=>{
  const UserChooseCity=localStorage.getItem('UserChooseCity')
  const UserCityCode=localStorage.getItem('UserCityCode')
  const UserCity=localStorage.getItem('UserCity')
  !UserChooseCity?localStorage.setItem('UserChooseCity',UserCity):''
  !UserChooseCity?localStorage.setItem('UserChooseCityCode',UserCityCode):''
  this.queryAareByParentCode()
}
  render() {
    const {AareByParentCode}=this.props
    console.log(AareByParentCode)
    return ( 
      <div className={styles.body}>
      <ul>
        {
          localStorage.getItem('UserChooseCity')=='全部'?
          <li className={styles.choose} onClick={()=>this.chooseCity()}>
          全部
        </li>:
          <li onClick={()=>this.chooseCity()}>
          全部
        </li>
        }
      
        {
          AareByParentCode?AareByParentCode.pubAreaBoList.length>0?
          AareByParentCode.pubAreaBoList.map(item=>{
            let cityName=item.areaName.replace('市','')
            const UserCity=localStorage.getItem('UserCity')
            const UserChooseCity=localStorage.getItem('UserChooseCity')
            const className=cityName==UserChooseCity?styles.choose:''
            return(
              <li key={item.areaCode} className={className} onClick={()=>this.chooseCity(item)}>
              {cityName}  
              {cityName==UserCity?<span>(当前定位城市)</span>:''}
              </li>
            )
          })
          :'':''
        }
      </ul>
      </div>
      
    );
  }
}

export default Index;
