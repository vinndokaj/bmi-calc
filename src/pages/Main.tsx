import React from 'react'
// import BmiCalc from '../components/BmiCalc';

import Form from '../components/Form'
import { Field, BMIValues } from '../types'

interface IState {
    values : BMIValues;
    bmi : number;
    showBMI : boolean;
}

//too large to make into a state - inefficent
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
        height: 1,
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

    //can be optimized to reduce redundency 
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

    toggleBMI = () => {
        this.setState({showBMI: !this.state.showBMI})
    }

    componentDidUpdate(prevProps: {}, prevState: IState){
        let newBMI = this.state.values.weight / this.state.values.height / this.state.values.height * 703;
        if(prevState.bmi !== newBMI){
            this.setState({bmi: newBMI})
        }
    }

    render() {
        return (
            <div className="mt-3 text-center align-center">
                <Form updateBMI={this.updateInformation} toggleBMI={this.toggleBMI} myFields={formFields} values={this.state.values}/>
                <br/>
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
