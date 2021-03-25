import React, { Component } from 'react'

import FormField from './FormField'
import { BMIValues, Field } from '../types'

interface IProps {
    myFields : Array<Field>
    values: BMIValues;
    updateBMI: Function;
}

interface IState {
    currentField: number;
    redirect: boolean;
}


class Form extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { currentField: 0, redirect: false }
    }

    //next button event handler
    //calls validation and whether previous field is possible
    //when clicking next on final field should calculate bmi
    next = () => {
        if (this.validateEntry()) {
            this.setState((state, props) => {
                let index = state.currentField + 1;
                if(index === this.props.myFields.length){
                    return { currentField: index-1, redirect: true };
                } else if (index < this.props.myFields.length) {
                    return { currentField: index, redirect: false };
                }
                return state;
            });
        }
    }

    //back button event handler
    //calls validation and checks whether previous field is possible
    back = () => {
        if (this.validateEntry()) {
            this.setState((state, props) => {
                let index = state.currentField - 1;
                if (index >= 0) {
                    return { currentField: index, redirect: false };
                }
                return state;
            });
        }
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
    //string checks for empty and number must be greater than 0
    validateAux = (data: HTMLInputElement) => {
        if (data.type === "text") {
            return !(data.value.trim() === '');
        }
        return parseInt(data.value) > 0;
    }

    render() {
        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault()
        }

        return (
            <form onSubmit={handleSubmit}>
                <button type="button" onClick={this.back}>Back</button>
                <button type="button" onClick={this.next}>Next</button>
                <FormField {...this.props.myFields[this.state.currentField]} />
            </form>

        )
    }
}

export default Form;