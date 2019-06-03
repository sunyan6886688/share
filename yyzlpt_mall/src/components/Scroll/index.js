import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import Style from './index.less'
import { getTimeFomater } from 'utils/date.js'
import { getRect } from 'utils/dom'

let defaultPullDownRefresh = {
  threshold: 100,
  stop: 80,
  stopTime: 600,
  txt: {
    success: '刷新成功',
  },
}

let defaultPullUpLoad = {
  threshold: 50,
  txt: {
    more: '加载更多',
    nomore: '— 已加载全部 —',
  },
}


class Scroll extends Component {
  static defaultProps = {
    probeType: 3,
    click: true,
    startY: 0,
    scrollY: true,
    scrollX: false,
    freeScroll: false,
    scrollbar: false,
    pullDownRefresh: defaultPullDownRefresh,
    pullUpLoad: defaultPullUpLoad,
    bounce: true,
    preventDefaultException: {
      className: /(^|\s)originEvent(\s|$)/,
      tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|TABLE)$/,
    },
    eventPassthrough: 'horizontal',
    isPullUpTipHide: true,
    disabled: false,
    stopPropagation: true,
    fiexedElm: ''
  }

  static propTypes = {
    children: PropTypes.any,
    probeType: PropTypes.number,
    startY: PropTypes.number,
    click: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    scrollY: PropTypes.bool,
    scrollX: PropTypes.bool,
    freeScroll: PropTypes.bool,
    scrollbar: PropTypes.bool,
    pullDownRefresh: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    pullUpLoad: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    pullUpLoadMoreData: PropTypes.func,
    canRenderPullUpTip: PropTypes.bool,
    doPullDownFresh: PropTypes.func,
    doScroll: PropTypes.func,
    doScrollStart: PropTypes.func,
    doScrollEnd: PropTypes.func,

    preventDefaultException: PropTypes.object,
    eventPassthrough: PropTypes.string,
    isPullUpTipHide: PropTypes.bool,
    bounce: PropTypes.bool,
    disabled: PropTypes.bool,
    stopPropagation: PropTypes.bool,
    fiexedElm: PropTypes.any
  }

  constructor(props, context) {
    super(props, context)

    this.scroll = null // scroll 实例

    this.isRebounding = false
    this.pulling = false

    this.pullDownInitTop = -80

    this.state = {
      upDate: getTimeFomater(new Date()),
      isPullUpLoad: false,
      beforePullDown: true,
      pulling: false,
      pullDownStyle: {
        top: `${this.pullDownInitTop}px`,
      },
      bubbleY: 0,
    }

  }
  createScrollId() {
    return Math.random().toString(36).substr(3, 10);
  }
  componentDidMount() {
    this.initScroll()
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      if (!this.state.pulling) {
        this.scroll.refresh()
      }
      if (prevProps.disabled !== this.props.disabled) {
        this.props.disabled ? this.scroll.disable() : this.scroll.enable();
      }
    }
  }

  componentWillUnmount() {
    this.scroll.stop()
    this.scroll.destroy()
    this.scroll = null;
    clearTimeout(this.TimerA)
    clearTimeout(this.TimerB)
  }

  initScroll() {
    let { probeType, click, startY, scrollY, scrollX, freeScroll, scrollbar, pullDownRefresh, pullUpLoad, preventDefaultException, eventPassthrough, bounce, stopPropagation } = this.props
    let _pullDownRefresh = typeof pullDownRefresh === 'object' ? {
      ...defaultPullDownRefresh,
      ...pullDownRefresh
    } : (pullDownRefresh ? defaultPullDownRefresh : false)

    let _pullUpLoad = typeof pullUpLoad === 'object' ? {
      ...defaultPullUpLoad,
      ...pullUpLoad
    } : (pullUpLoad ? defaultPullUpLoad : false)

    this.options = {
      probeType,
      click:false,
      startY,
      scrollY,
      freeScroll,
      scrollX,
      scrollbar,
      pullDownRefresh: _pullDownRefresh,
      pullUpLoad: _pullUpLoad,
      preventDefaultException,
      eventPassthrough,
      bounce: bounce,
      stopPropagation: stopPropagation,
    }
    let wrapper = this.refs.$dom
    this.scroll = new BScroll(wrapper, this.options)
    this.initEvents()
    setTimeout(() => {
      if (this.content) {
        this.content.style.minHeight = getRect(wrapper).height + 10 + 'px'
      }
    }, 300)
  }

  initEvents() {
    if (this.options.pullUpLoad) {
      this._initPullUpLoad()
    }
    if (this.options.pullDownRefresh) {
      this._initPullDownRefresh()
    }
    if (this.props.doScrollStart) {
      this.scroll.on('scrollStart', (pos) => {
        this.props.doScrollStart(pos)
      })
    }
    if (this.props.doScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.doScroll(pos)
      })
    }
    if (this.props.doScrollEnd) {
      this.scroll.on('scrollEnd', (pos) => {
        this.props.doScrollEnd(pos)
      })
    }
    if (this.props.disabled) {
      this.scroll.disable()
    }
  }


  getScrollObj = () => {
    return this.scroll
  }
  scrollToElement = (...args) => {
    this.scroll && this.scroll.scrollToElement(...args)
  }
  _initPullDownRefresh() {
    this.scroll.on('pullingDown', () => {
      this.setState({
        beforePullDown: false,
        pulling: true,
      })

      this.props.doPullDownFresh()
        .then(() => {
          if (!this.scroll) { return }
          this.setState({
            pulling: false,
            upDate: getTimeFomater(new Date())
          })
          this._reboundPullDown()
            .then(() => {
              this._afterPullDown()
            })
        })
    })

    this.scroll.on('scroll', (pos) => {
      const { beforePullDown } = this.state
      if (pos.y < -80) {
        return
      }
      this.setState({
        pullDownStyle: {
          top: `${pos.y - 80}px`,
        },
      })
    })
  }

  _reboundPullDown = () => {
    let { stopTime = 600 } = this.options.pullDownRefresh
    return new Promise((resolve) => {
      this.TimerA = setTimeout(() => {
        this.isRebounding = true
        this.scroll.finishPullDown()
        resolve()
      }, stopTime)
    })
  }

  _afterPullDown() {
    this.TimerB = setTimeout(() => {
      this.setState({
        beforePullDown: true,
        pullDownStyle: {
          top: `${this.pullDownInitTop}px`,
        },
      })
      this.isRebounding = false
      this.scroll.refresh()
    }, this.scroll.options.bounceTime)
  }

  _initPullUpLoad = () => {
    this.scroll.on('pullingUp', () => {
      this.setState({
        isPullUpLoad: true,
      })
      this.props.pullUpLoadMoreData().then(() => {
        if (!this.scroll) { return }
        this.setState({
          isPullUpLoad: false,
          upDate: getTimeFomater(new Date())
        })
        this.scroll.finishPullUp()
        this.scroll.refresh()
      })
    })
  }

  renderPullUpLoad() {
    let { pullUpLoad, isPullUpTipHide } = this.props
    let { beforePullDown, pulling, isPullUpLoad, upDate } = this.state
    if (pullUpLoad && isPullUpTipHide) {
      return (
        <div className={Style.pullUpfresh}  >
          <span className={Style.refreshLoadding}></span>
          <p className={Style.loaddingText}>上次更新时间:{upDate}</p>
        </div>
      )
    }
    if (!pullUpLoad || !isPullUpLoad) {
      return (
        <div className={Style.pullUpfresh} >
          <p className={Style.loadAll}>— 已加载全部 —</p>
        </div>
      )
    }
  }

  renderPullUpDown() {
    let { pullDownRefresh } = this.props
    let { beforePullDown, pulling, pullDownStyle, upDate } = this.state
    if (pullDownRefresh && beforePullDown) {
      return (
        <div className={Style.pullRefresh} style={pullDownStyle} >
          <span className={Style.refreshLoadding}></span>
          <p className={Style.loaddingText}>上次更新时间:{upDate}</p>
        </div>
      )
    }

    if (pullDownRefresh && !beforePullDown && pulling) {
      // this.scroll.disable()
      return (
        <div className={Style.pullRefresh} style={pullDownStyle} >
          <span className={Style.refreshLoadding}></span>
          <p className={Style.loaddingText}>正在更新数据</p>
        </div>
      )
    }

    if (pullDownRefresh && !beforePullDown && !pulling) {
      return (
        <div className={Style.pullRefresh} style={pullDownStyle} >
          <span className={Style.refreshLoadding}></span>
          <p className={Style.loaddingText}>数据已经更新</p>
        </div>
      )
    }
  }

  render() {
    let { className, fiexedElm } = this.props
    return (
      <div className={`${Style.scroll} ${className}`} ref="$dom">
        <div  >
          <div ref={ref => { this.content = ref }}>
            {this.props.children}
          </div>
        </div>
        {fiexedElm}
        {this.renderPullUpLoad()}
        {this.renderPullUpDown()}
      </div>
    )
  }
}

export default Scroll