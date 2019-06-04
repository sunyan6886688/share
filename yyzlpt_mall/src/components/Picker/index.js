import React, { PureComponent } from 'react';
import IOSPicker from './IOSPicker';
import AndroidPicker from './AndroidPicker';


export default class Picker extends PureComponent {
    constructor(props) {
        super(props);
        this.isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    }
    render() {
        return this.isIOS ?
               <IOSPicker {...this.props}/> :
               <AndroidPicker {...this.props}/>
    }
}




