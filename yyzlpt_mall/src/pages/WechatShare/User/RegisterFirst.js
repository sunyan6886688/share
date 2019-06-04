import React from 'react';
import { Toast } from 'antd-mobile';
import styles from './RegisterFirst.less';
import ConfirmModal from '@/components/ComfirmModal';
import router from 'umi/router';
import { connect } from 'dva';
import Picker from '@/components/Picker';
import options from '@/components/Picker/options.json';

export default class RegisterFirst extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isConfirmModalShow: false,
      confirmTip: '账号已存在，请直接登录',
      idCardType: '1',
      sexType: '',
      nation: '',
      name: '',
      codeNo: '',
    };
  }

  handleCloseModal = modalName => {
    this.setState({ [modalName]: false });
  }

  handleConfirm = (type) => {
    this.setState({ isConfirmModalShow: false });
    if (type === 1) {
      router.replace({pathname: '/share/login', query: {cardNo: this.state.cardNo}});
    }
  }

  handleCardChange = value => {
    this.setState({idCardType: value})
  }

  handleCardChange = value => {
    this.setState({idCardType: value})
  }

  handleSexChange = value => {
    this.setState({sex: value})
  }

  handleNationChange = value => {
    const findItem = options.nation.find(item => item.value == value);
    this.setState({nation: findItem.label}); 
  }

  hanleCardNoChange = e => {
    console.log(e.target.value);
    this.setState({cardNo: e.target.value})
  }

  hanleNameChange = e => {
    this.setState({name: e.target.value})
  }

  handleSumbit = () => {
    const {idCardType, cardNo} = this.state;
    if (this.state.idCardType === '1') {
      // if ()
    }
  }

  render() {
    const {
      isConfirmModalShow,
      confirmTip,
      nation,
      sexType,
      cardNo,
      name,
      idCardType
    } = this.state;
    
    let canSubmit;
    if (idCardType === "1") {
      canSubmit = name && nation && cardNo.length >= 8;
    } else {
      canSubmit = name && sex && cardNo.length >= 8;
    }

    return (
      <section className={styles.page}>
        <p className={styles.error}>请正确填写您的证件信息</p>
        
        <Picker
            label={"证件类型"}
            options={options.idCard}
            onChange={this.handleCardChange}/>

        <div className={styles.formItem}>
          <label className={styles.label} htmlFor="cardNo">证件号码</label>
          <input
            className={styles.input}
            name="cardNo"
            type="text"
            placeholder="请输入证件号码，英文须大写"
            maxLength="18"
            value={cardNo}
            onChange={this.hanleCardNoChange}/>
        </div>
        <div className={styles.formItem}>
          <p className={styles.label} htmlFor="name">真实姓名</p>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="请输入与证件一致的真实姓名"
            value={name}
            onChange={this.hanleNameChange}/>
        </div>

        {
          idCardType === '1' ?
          <Picker
            key={'nation'}
            label={"民族"}
            options={options.nation}
            placeholder={"请选择民族"}
            onChange={this.handleNationChange}/> :
          <Picker
            key={'sex'}
            label={"性别"}
            options={options.sex}
            placeholder={"请选择性别"}
            onChange={this.handleSexChange}/>  
        }

        <div className={styles.btnWrap}>
          <button
            className={styles.btn}
            type="button"
            disabled={!canSubmit}
            onClick={this.handleSumbit}>下一步</button>
        </div>

        <ConfirmModal
          isShow={isConfirmModalShow}
          tip={confirmTip}
          confirmBtn={'登录'}
          onCancel={() => this.handleCloseModal('isConfirmModalShow')}
          onConfirm={this.handleConfirm} />
      </section>
    )
  }
}