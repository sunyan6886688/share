// 返回一个日期对象
function dateFormat(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let sdate = date.getDate()
  let weeklyDay = date.getDay()
  return {
    year,
    month: month < 10 ? "0" + month : month,
    date: sdate < 10 ? "0" + sdate : sdate,
    weekly: weeklyDay
  }
}

export const getTimeFomater = (date,formart) => {
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  hh=hh<10?'0'+hh:hh.toString()
  mm=mm<10?'0'+mm:mm.toString()
  ss=ss<10?'0'+ss:ss.toString()
  return `${hh}:${mm}:${ss}`
} 

// 取得当前日期的第n天
export const getDate = (date, n) => {
  let day = date.getDate()
  let newDate = date.setDate(day + n)
  return new Date(newDate)
}

export const lastDate = (n)=>{
  return getDate(new Date(),n)
}


// 满足格式化的日期如 2019-03-21
export const getFormatDate = (n,split='-') => {
    let getDay = lastDate(n)
    let {year,month,date}= dateFormat(getDay)
  return `${year}${split}${month}${split}${date}`
}


function createDateArray(date) {
  let dateArr = []
  for (let i = 0; i < 8; i++) {
      dateArr.push(lastDate(i))
  }
  return dateArr
}
// 格式化日期
export const spliteDate = (dateStr, split) => {
  let curDate = new Date(dateStr)
  let { year, month, date } = dateFormat(curDate)
  return year + split + month + split + date
}
export const createDateMap = () => {
  // 创建今天以后的七天数据
  const transformWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let date = new Date()
  let obj = {}
  let dateArray = createDateArray(date)
  dateArray.forEach((item, index) => {
      let tempDate = dateFormat(item)
      let key = tempDate.year + tempDate.month + tempDate.date 
      obj[key] = {
          weekly: transformWeek[tempDate.weekly],
          month: parseInt(tempDate.month),
          date: tempDate.date,
          list: []
      }
  })
  return obj
}




