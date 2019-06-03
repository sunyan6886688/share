import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class TextOverflow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowBtn: false,
            isShow: false
        };
        this.textContent = React.createRef();
        this.textContentElem = null;
        this.resizeTimer = null;
    }

    static propTypes = {
        line: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.textContentElem = this.textContent.current;
        this.initBtn();
    }
   
    initBtn() {
        const height = this.textContentElem.clientHeight;
        const computedStyle = document.defaultView.getComputedStyle(this.textContentElem, null); 
        const lineHeight = parseInt(computedStyle.lineHeight);

        if (height > this.props.line * lineHeight) {
            this.setState({isShowBtn: true})
        } else {
            this.setState({isShowBtn: false})
        }
    }

    showMore = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        const {text, line} = this.props;
        const {isShowBtn, isShow} = this.state;
        return (
            <div style={{paddingBottom: isShowBtn ? 0 : '.24rem'}}>
                <div className={styles.textOverflow}
                     ref={this.textContent} 
                     style={isShowBtn && !isShow ? {WebkitLineClamp: line} : null}>
                    {text}
                </div>
                {
                    isShowBtn &&
                    <button className={styles.moreBtn}
                            onClick={this.showMore}>
                        {isShow ? '收起全文' : '展示全文'}
                        {isShow ? <span className={styles.upArrow}/> : <span className={styles.downArrow}/>}
                    </button>
                }
            </div>
        )
    }
}