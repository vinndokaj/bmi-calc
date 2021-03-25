import React, { Component } from 'react'

import { Field } from '../types'

class FormField extends Component<Field> {
    
    getOptions = () => {
        let myOptions : Array<JSX.Element> = []
        if(this.props.options){
            this.props.options.forEach(option => {
                myOptions.push(<option key={option.name} {...option}>{option.name}</option>)
            });
        }
        return myOptions;
    }

    render() {
        return (
            <div>
                <label>{this.props.labelText}</label>
                {this.props.type === 'select' ? 
                    <select name={this.props.name} id={this.props.name}>
                        {this.getOptions()}   
                    </select>
                    :
                    <input type={this.props.type} name={this.props.name} id={this.props.name}/>
                }
            </div>
        )
    }
}

export default FormField
