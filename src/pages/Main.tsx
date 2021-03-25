import React from 'react'
import BmiCalc from '../components/BmiCalc';

import Form from '../components/Form'
import { Field, BMIValues } from '../types'

interface IState {
    values : BMIValues;
    bmi : number;
}

const formFields = [
    { name: 'name', type: 'text', labelText: 'Enter name:' },
    { name: 'gender', type: 'select', labelText: 'Choose a gender:', options: [{ value: 1, name: 'Male' }, { value: 2, name: 'Female' }] },
    { name: 'height', type: 'number', labelText: 'Enter a height in inches:' },
    { name: 'weight', type: 'number', labelText: 'Enter weight in pounds:' }
] as Array<Field>

const defaultState = {
    values: {
        name: "",
        gender: 0,
        height: 1,
        weight: 0,
    },
    bmi: 0
};

export class Main extends React.Component<{}, IState> {
    state : IState = defaultState;

    clearState = () => {
        this.setState(defaultState)
    }

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

    componentDidUpdate(prevProps: {}, prevState: IState){
        let newBMI = this.state.values.weight / this.state.values.height / this.state.values.height * 703;
        if(prevState.bmi !== newBMI){
            this.setState({bmi: newBMI})
        }
    }

    render() {
        return (
            <>
                <Form updateBMI={this.updateInformation} myFields={formFields} values={this.state.values}/>
                <BmiCalc bmi={this.state.bmi} {...this.state.values}/>
            </>
        )
    }
}

export default Main
