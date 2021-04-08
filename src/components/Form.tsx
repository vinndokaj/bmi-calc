import React, { Component } from 'react'

import FormField from './FormField'
import { BMIValues, Field } from '../types'

interface IProps {
    myFields : Array<Field>
    values: BMIValues;
    updateBMI: Function;
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
        this.validateEntry = this.validateEntry.bind(this)
        this.validateAux = this.validateAux.bind(this)
    }

    //next button event handler
    //calls validation and whether previous field is possible
    //when clicking next on final field should calculate bmi
    next = () => {
        if (this.validateEntry()) {
            this.setState((state, props) => {
                let index = state.currentField + 1;
                if(index === this.props.myFields.length){
                    this.props.toggleBMI();
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
                if((state.currentField + 1) === this.props.myFields.length){
                    this.props.toggleBMI();
                }
                return { currentField: index, error: false, redirect: false };
            }
            return state;
        });
    }

    //validates entry then saves it to array with values 
    validateEntry = () => {
        let formData = document.getElementById(this.props.myFields[this.state.currentField].name) as HTMLInputElement;
        // console.log(formData.name)

        if(this.validateAux(formData)){
            this.props.updateBMI(formData.name, formData.value)
            return true
        }

        return false
    }

    // validate entry whether it is a number or string
    // string checks for empty and number must be greater than 0
    validateAux = (data: HTMLInputElement) => {
        if (data.type === "text") {
            return !(data.value.trim() === '');
        }
        return parseInt(data.value) > 0;
    }
    // module.exports = validateAux;

    render() {
        //form with no submit so prevent submit on enter key click
        //could be used to validate form (next) on enter key
        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault()
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <button className="btn btn-secondary mr-5" type="button" onClick={this.back}>Back</button>
                    <button className="btn btn-primary ml-5" type="button" onClick={this.next}>Next</button>
                </div>
                <FormField {...this.props.myFields[this.state.currentField]} />
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