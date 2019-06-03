import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getRect } from 'utils/dom'
class ViewBox extends PureComponent {
  componentDidUpdate  (newProps){
    let {header,foot} = newProps
    if(header||foot){
      setTimeout(() => {
        this.initBodyHeight(header,foot)
      }, 20)
    }
  }
  initBodyHeight = (header,foot) => {
    let { footDom, headerDom, wraperDom, bodyDom } = this
    let wraperHgt = getRect(wraperDom).height
    let headerHgt = header ? getRect(headerDom).height : 0
    let footHgt = foot ? getRect(footDom).height : 0
    bodyDom.style.height = wraperHgt - bodyDom.offsetTop - footHgt + 'px'
  }
  render() {
    let { header, foot, children } = this.props
    return (
      <div ref={ref => { this.wraperDom = ref }} style={{height:'100vh',overflow:'hidden'}}>
        {header && <div ref={ref => { this.headerDom = ref }}>
          {header}
        </div>}
        <div ref={ref => { this.bodyDom = ref }}>
          {children}
        </div>
        {foot && <div ref={ref => { this.footDom = ref }}>
          {foot}
        </div>}
      </div>
    );
  }
}

ViewBox.defaultProps = {
  header: null,
  foot: null,
  wrapClass: '',
};

ViewBox.propTypes = {
  header: PropTypes.object,
  foot: PropTypes.object
};

export default ViewBox;
