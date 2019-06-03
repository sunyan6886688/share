import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './popup.less'
import { getRect } from 'utils/dom'
import { CSSTransition } from 'react-transition-group';

class Model extends Component {
  maskClick = () => {
    let { maskClose } = this.props
    if (maskClose) {
      maskClose()
    }
  }
  render() {
    let { isCenter, children, showModel, useAnimate, top, animateName } = this.props
    let centerClass = isCenter ? styles.isCenter + ' ' : ''
    let display = showModel ? 'block' : 'none'
    let height = centerClass?'100%':'auto'
    return (
      <div className={styles.model} style={{ top: top + 'px', display }}>
        {<div className={styles.modelMask} onClick={this.maskClick}></div>}
        <div className={styles.base  }  style={{height}}>
        <CSSTransition in={showModel}   timeout={1000} classNames={animateName} >
          {<div className={centerClass} >
            {children}
          </div>}
        </CSSTransition>
        </div>
      </div>
    )
  }
}

Model.defaultProps = {
  top: 0,
  maskClose: null,
  isCenter: false,
  animateName: 'move-up'
};

Model.propTypes = {
  top: PropTypes.number,
  maskClose: PropTypes.func,
  isCenter: PropTypes.bool,
  useAnimate: PropTypes.bool,
  animateName: PropTypes.string
};

export default Model