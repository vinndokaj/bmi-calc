import React from 'react'
// import BmiCalc from '../components/BmiCalc';

import Form from '../components/Form'
import { Field, BMIValues } from '../types'
import { calculateBMI } from '../utils/validate'

interface IState {
    values : BMIValues;
    bmi : number;
    showBMI : boolean;
}

const formFields = [
    { name: 'name', type: 'text', labelText: 'Enter name:' },
    { name: 'gender', type: 'select', labelText: 'Choose a gender:', options: [{ value: 1, name: 'Male' }, { value: 2, name: 'Female' }] },
    { name: 'height', type: 'number', labelText: 'Enter a height in inches:' },
    { name: 'weight', type: 'number', labelText: 'Enter weight in pounds:' }
] as Array<Field>

//should values be a state or part of the array
const defaultState = {
    values: {
        name: "",
        gender: 0,
        height: 0,
        weight: 0,
    },
    bmi: 0,
    showBMI: false
};

export class Main extends React.Component<{}, IState> {
    state : IState = defaultState;

    clearState = () => {
        this.setState(defaultState)
    }

    //can maybe be optimized to reduce redundency 
    updateInformation = (field : string, payload : string) => {
        let temp = this.state.values;
        if(field === "name"){
            temp.name = payload;
        } else if(field === "gender"){
            temp.gender = parseInt(payload);
        } else if(field === "height"){
            temp.height = parseInt(payload);
        } else if(field === "weight"){
            temp.weight = parseInt(payload);
        } 
        this.setState({values : temp})
    }

    //toggle whether bmi is showing and if it is recalculate to ensure accurate data
    toggleBMI = () => {
        if(!this.state.showBMI){
            this.setState({showBMI: true, bmi: calculateBMI(this.state.values.weight, this.state.values.height)})
        } else {
            this.setState({showBMI: false})
        }
    }

    render() {
        return (
            <div className="mt-3 text-center align-center">
                <Form updateValues={this.updateInformation} toggleBMI={this.toggleBMI} myFields={formFields} values={this.state.values}/>
                {this.state.showBMI ?
                    <p>Hi {this.state.values.name}, your bmi is {this.state.bmi.toFixed(2)}</p>
                    :
                    ""
                } 
            </div>
        )
    }
}

export default Main
