
import jkdh from './jkdh'

export default function userStatisticPage(statisticType,eventId,expand,startTime,endTime){
  const value=statisticType==0?{
    statisticType:statisticType,
    eventId:eventId,
    expand:expand
  }:{
    statisticType:statisticType,
    eventId:eventId,
    expand:expand,
    startTime:String(startTime),
    endTime:String(endTime)
  }
  jkdh.device.UserStatisticPage(value)
  
  
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}
