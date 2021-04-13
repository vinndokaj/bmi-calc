import React, { Component } from 'react'

import { Field } from '../types'

type IProps = Field & {value : string | number, updateVals: Function};


class FormField extends Component<IProps> {
    constructor(props : IProps){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    //returns all the options if there are any present
    getOptions = () => {
        let myOptions : Array<JSX.Element> = []
        if(this.props.options){
            this.props.options.forEach(option => {
                myOptions.push(<option key={option.name} {...option}>{option.name}</option>)
            });
        }
        return myOptions;
    }

    handleChange(event: { target: { value: any; }; }){
        this.props.updateVals(this.props.name, event.target.value)
    } 

    render() {
        return (
            <div>
                <label>{this.props.labelText}</label>
                <br/>
                {this.props.type === 'select' ? 
                    <select name={this.props.name} id={this.props.name} defaultValue={this.props.value}>
                        {this.getOptions()}   
                    </select>
                    :
                    <input type={this.props.type} name={this.props.name} id={this.props.name} value={this.props.value} onChange={this.handleChange}/>
                }
            </div>
        )
    }
}

export default FormField
