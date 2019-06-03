import React, { Component, Fragment } from 'react';
import { loadding, loaddingImg, loaddingWrap, loaddingText } from './loadding.less'

class Loading extends Component {
  render() {
    return (
      <div className={loadding}>
        <div className={loaddingImg}>
          <div className={loaddingWrap}></div>
        </div>
        <p className={loaddingText}>加载中...</p>
      </div>
    )
  }
}


export default Loading