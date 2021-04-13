import React, { Component } from 'react'

import FormField from './FormField'
import { BMIValues, Field } from '../types'
import { validateEntry } from '../utils/validate'

interface IProps {
    myFields : Array<Field>
    values: BMIValues;
    updateValues: Function;
    toggleBMI: VoidFunction;
}

interface IState {
    currentField: number;
    error: boolean;
    redirect: boolean;
}


class Form extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { currentField: 0, error: false, redirect: false }

        this.next = this.next.bind(this)
        this.back = this.back.bind(this)
    }

    //next button event handler
    //calls validation and whether previous field is possible
    //when clicking next on final field should calculate bmi
    next = () => {
        let formData = document.getElementById(this.props.myFields[this.state.currentField].name) as HTMLInputElement;
        if (validateEntry(formData, this.props.updateValues)) {
            this.setState((state, props) => {
                let index = state.currentField + 1;
                if(index === this.props.myFields.length){
                    if(!this.state.redirect){
                        this.props.toggleBMI();
                    }
                    return { currentField: index-1, error: false, redirect: true };
                } else if (index < this.props.myFields.length) {
                    return { currentField: index, error: false, redirect: false };
                }
                return state;
            });
        } else {
            this.setState({error:true})
        }
    }

    //back button event handler
    //calls validation and checks whether previous field is possible
    back = () => {
        this.setState((state, props) => {
            let index = state.currentField - 1;
            if (index >= 0) {
                if(this.state.redirect){
                    this.props.toggleBMI();
                }
                return { currentField: index, error: false, redirect: false };
            }
            return state;
        });
    }

    render() {
        //form with no submit so prevent submit on enter key click
        //could be used to validate form (next) on enter key
        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault()
            this.next()
        }

        const getVal = () => {
            let value_name = this.props.myFields[this.state.currentField].name
            if(value_name === "name"){
                return this.props.values.name
            } else if (value_name === "gender") {
                return this.props.values.gender
            } else if (value_name === "height") {
                return this.props.values.height
            } else if (value_name === "weight") {
                return this.props.values.weight
            } else {
                return "";
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <button className="btn btn-secondary mr-5" type="button" onClick={this.back}>Back</button>
                    <button className="btn btn-primary ml-5" type="button" onClick={this.next}>Next</button>
                </div>
                <FormField {...this.props.myFields[this.state.currentField]} value={getVal()} updateVals={this.props.updateValues}/>
                <br/>
                {this.state.error ?
                    <p className="text-danger">Please fill out form field before proceeding</p>
                    :
                    ""
                }
            </form>

        )
    }
}

export default Form;