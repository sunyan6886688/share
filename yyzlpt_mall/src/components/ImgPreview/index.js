import React, {PureComponent} from 'react';
import { Carousel, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';
import PinchZoom from './pinch-zoom';

export default class ImgPreview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currIndex: this.props.currIndex
        }
        this.imgPreviewRef = React.createRef();
    }

    static defaultProps = {
        currIndex: 0
    }

    static propTypes = {
        currIndex: PropTypes.number,
        imgList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                path: PropTypes.string.isRequired
            })
        ).isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        const imgPreview = this.imgPreviewRef.current;
        setTimeout(() => {
            Array.from(imgPreview.querySelectorAll('img'))
                 .forEach(el => new PinchZoom(el, {draggableUnzoomed: false}))
        }, 0)
        imgPreview.addEventListener('touchmove', this.handleTouchMove, {passive: false});
    }

    componentWillUnmount() {
        this.imgPreviewRef.current.removeEventListener('touchmove', this.handleTouchMove, {passive: false});
    }

    handleAtferChange = index => {
        this.setState({currIndex: index})
    }

    handleClose = e => {
        if (e.target && e.target.tagName !== 'IMG') {
            this.props.onClose(this.state.currIndex);
        }
    }

    handleTouchMove = e => {
        // e.stopPropagation();
        e.preventDefault();
    }
  
    render() {
        const {imgList} = this.props;
        const {currIndex} = this.state;
        return(
            <section className={styles.modal}
                     ref={this.imgPreviewRef}
                     onClick={this.handleClose}> 
                <span className={styles.label}>{currIndex + 1}/{imgList.length}</span>
                <Icon className={styles.cross} type="cross" size='md' />
                {
                    imgList.length > 1 ?
                    <Carousel
                        infinite
                        selectedIndex={currIndex}
                        afterChange={this.handleAtferChange}
                        dots={false}
                        autoplay={false} >
                        {
                            imgList.map(item => (
                                <div className={styles.imgBox} key={item.id}>
                                     <img className={styles.img} src={item.path}/>
                                </div>
                            ))
                        }
                    </Carousel> :
                    <div className={styles.imgBox}>
                        <img className={styles.img} src={imgList[0].path}/>
                    </div>
                }
            </section>
        )
    }


}