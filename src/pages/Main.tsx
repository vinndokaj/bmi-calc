import React from 'react'
// import BmiCalc from '../components/BmiCalc';

import { Field } from '../types'
import { calculateBMI, validateAux } from '../utils/validate'

type IState = { showBMI: boolean; fieldIndex: number; error: boolean; }

let formFields = [
    { value: "", name: 'name', type: 'text', labelText: 'Enter name:' },
    { value: 0, name: 'gender', type: 'select', labelText: 'Choose a gender:', options: [{ value: 1, name: 'Male' }, { value: 2, name: 'Female' }] },
    { value: 0, name: 'height', type: 'number', labelText: 'Enter a height in inches:' },
    { value: 0, name: 'weight', type: 'number', labelText: 'Enter weight in pounds:' }
] as Array<Field>

export class Main extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            fieldIndex: 0,
            showBMI: false,
            error: false
        };
        this.changeForm = this.changeForm.bind(this)
        this.getOptions = this.getOptions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    changeForm = (direction: number) => {
        let formData = formFields[this.state.fieldIndex]
        let newIndex = this.state.fieldIndex + direction;

        if (direction === -1 && newIndex >= 0) {
            if(this.state.showBMI){
                this.setState({ showBMI: false })
            } else {
                this.setState({ fieldIndex: newIndex, showBMI: false, error: false })
            }
        } else if (direction === 1 && !this.state.showBMI) {
            if (validateAux(formData.type, formData.value)) {
                this.setState(() => {
                    if (newIndex === formFields.length) {
                        return { showBMI: true, fieldIndex: this.state.fieldIndex, error: false }
                    } else {
                        return { showBMI: false, fieldIndex: newIndex, error: false }
                    }
                });
            } else {
                this.setState({ error: true })
            }
        }
    }

    getOptions = () => {
        let myOptions: Array<JSX.Element> = []
        let options = formFields[this.state.fieldIndex].options
        if (options) {
            options.forEach(option => {
                myOptions.push(<option key={option.name} {...option}>{option.name}</option>)
            });
        }
        return myOptions;
    }

    handleChange(event: { target: { value: string | number } }) {
        let num = +event.target.value
        if (isNaN(num)) {
            formFields[this.state.fieldIndex].value = event.target.value;
        } else {
            formFields[this.state.fieldIndex].value = num;
        }
    }

    handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        this.changeForm(1)
    }

    render() {
        return (
            <div className="mt-3 text-center align-center">
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-2">
                        <button className="btn btn-secondary mr-5" type="button" onClick={(e) => this.changeForm(-1)}>Back</button>
                        <button className="btn btn-primary ml-5" type="button" onClick={(e) => this.changeForm(1)}>Next</button>
                    </div>

                    {this.state.showBMI ?
                        <p>Hi {formFields[0].value}, your bmi is {calculateBMI(+formFields[3].value, +formFields[2].value).toFixed(2)}</p>
                        :
                        <div>
                            <label>{formFields[this.state.fieldIndex].labelText}</label>
                            <br />
                            {formFields[this.state.fieldIndex].type === 'select' ?
                                <select name={formFields[this.state.fieldIndex].name} defaultValue={formFields[this.state.fieldIndex].value} onChange={this.handleChange}>
                                    <option key="default" value="">-- Select --</option>
                                    {this.getOptions()}
                                </select>
                                :
                                <input
                                    type={formFields[this.state.fieldIndex].type}
                                    name={formFields[this.state.fieldIndex].name}
                                    defaultValue={formFields[this.state.fieldIndex].value === 0 ? "" : formFields[this.state.fieldIndex].value}
                                    onChange={this.handleChange}
                                />
                            }

                        </div>
                    }

                    <br />

                    {this.state.error ?
                        <p className="text-danger">Please fill enter a valid option before proceeding</p>
                        :
                        ""
                    }
                </form>

            </div>
        )
    }
}

export default Main
