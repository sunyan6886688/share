import React from 'react';
import { Picker, List } from "antd-mobile";
import PropTypes from 'prop-types';
import styles from './AndroidPicker.less';

const CustomChildren = props => (
  <div className={styles.formItem} onClick={props.onClick}>
    <p className={styles.label}>{props.children}</p>
    <p className={styles.select} style={{color: props.value.length > 0 ? '#0A1F44' : '#A6AEBC'}}>{props.extra}</p>
    <span className={styles.arrow} />
  </div>
);

export default class AndroidPicker extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pickerValue: props.placeholder ? [] : [props.options[0].label],
    }
  }

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
      })
    ).isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    // selectIndex: PropTypes.number
  }

  handlePickerChange = pickerValue => {
    this.setState({pickerValue});
    this.props.onChange(pickerValue[0]);
  }

  render() {
    const {options, placeholder, label} = this.props;
    const {pickerValue} = this.state;
    
    return (
      <div>
        <Picker
          data={options}
          cols={1}
          value={pickerValue}
          extra={placeholder || pickerValue[0]}
          onChange={this.handlePickerChange}>
          <CustomChildren value={pickerValue}>{label}</CustomChildren>
        </Picker>
      </div>
    );
  }
}
