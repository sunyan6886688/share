import { PureComponent } from 'react'
import Scroll from 'components/Scroll/index'
import ViewBox from 'components/ViewBox/index'
import Style from './index.less'
import { connect } from 'dva';
import { Button, WingBlank } from 'antd-mobile';

function random(){
  return Math.floor(Math.random()*100000)
}

class scrollDemo extends PureComponent {
  constructor() {
    super()
    this.state = {
      pullUpLoad:true,
      areaList: []
    }
  }
  componentDidMount() {
    this.count = 0
    this.addData()
  }
  onPullDown=()=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if( this.count<5){
          this.addData()
          resolve()
        }else{
          resolve()
          this.count = 0
        }
      },1500)
    })
  }
  onPullUp=()=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if( this.count<2){
          this.addData(true)
          this.count++
          resolve()
        }else{
          this.setState({
            pullUpLoad:false
          })
          this.count = 0
          reject()
        }
      },1500)
    })
  }
  addData = (isAdd) => {
    let list = [random(),random(),random(),random(),random(),random()]
    let {areaList} = this.state
    areaList = isAdd?[...areaList,...list]:list
    this.setState({
      areaList
    })
  }
  render() {
    let { areaList,pullUpLoad } = this.state
    return (
      <ViewBox header={<Button type="primary"  onClick={this.addData} >default</Button>}>
        <Scroll className={Style.scroll} 
                data={areaList}
                pullUpLoad={pullUpLoad} 
                doPullDownFresh={this.onPullDown}
                pullUpLoadMoreData={this.onPullUp}
                ref={ref => { this.scroll = ref }}>
          <ul>
            {areaList.map(item => {
              return (
                <li key={item} className={Style.item}>
                  {item}
                </li>
              )
            })}
          </ul>
        </Scroll>
      </ViewBox>
    )
  }
}

export default scrollDemo;
