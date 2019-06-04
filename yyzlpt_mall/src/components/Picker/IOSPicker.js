import React from 'react';
import styles from './IOSPicker.less';
import PropTypes from 'prop-types';

export default class IOSPicker extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      valueColor: props.placeholder ? '#A6AEBC' : '#0A1F44'
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
  }

  componentDidMount() {
    console.log(12324341);
  }

  handleSelect = e => {
    if (this.state.valueColor === '#A6AEBC') {
      this.setState({valueColor: '#0A1F44'});
    }
    this.props.onChange(e.target.value);
  }

  render() {
    
    const {options, placeholder, label} = this.props;
    const {valueColor} = this.state;
    console.log(placeholder);
    return (
      <div className={styles.formItem}>
        <p className={styles.label}>{label}</p>
        <select
          defaultValue={placeholder ? "0" : "1"}
          style={{color: valueColor}}
          onChange={this.handleSelect}>
          {placeholder && <option value="0" disabled>{placeholder}</option>}
          {
            options.map(item => <option key={item.label} value={item.value}>{item.label}</option>)
          }
        </select>
        <span className={styles.arrow} />
      </div>
    )
  }
}