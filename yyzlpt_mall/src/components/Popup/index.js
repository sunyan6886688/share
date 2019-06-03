import ReactDOM from 'react-dom';
import { appendToBody, removeBodyEnd } from 'utils/dom'
// {id,className} = options
let defaultOpts = {
  id: 'pickerRadio',
  className: 'picker-radio'
}
class TransfromDom {
  constructor( options) {
    this.options = { ...defaultOpts, ...options }
    this.createElm()
  }
  createElm() {
    let { id, className } = this.options
    let dom = document.querySelector(`#${id}`)
    if (dom) {
      this.dom = dom
    } else {
      this.dom = document.createElement('div')
      this.dom.id = id
      this.dom.className = className
      appendToBody(this.dom)
    }
  }
  renderToDom(reactElm) {
    ReactDOM.render(reactElm, this.dom)
  }
  destroy() {
    this.dom && removeBodyEnd(this.dom)
  }
}

export default TransfromDom