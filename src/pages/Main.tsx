import React from 'react'
// import BmiCalc from '../components/BmiCalc';

import { Field } from '../types'
import { calculateBMI, validateAux } from '../utils/validate'

interface IState { 
    showBMI: boolean, 
    fieldIndex: number, 
    error: boolean, 
    formFields: Array<Field>
};

export class Main extends React.Component<{}, IState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            fieldIndex: 0,
            showBMI: false,
            error: false,
            formFields: [
                { value: "", name:"name", type: 'text', labelText: 'Enter name:' },
                { value: 0, name:"gender", type: 'select', labelText: 'Choose a gender:', options: [{ value: 1, name: 'Male' }, { value: 2, name: 'Female' }] },
                { value: 0, name:"height", type: 'number', labelText: 'Enter a height in inches:' },
                { value: 0, name:"weight", type: 'number', labelText: 'Enter weight in pounds:' }
            ]
        };
        this.changeForm = this.changeForm.bind(this)
        this.getOptions = this.getOptions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    private changeForm = (direction: number) => {
        let formData = this.state.formFields[this.state.fieldIndex]
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
                    if (newIndex === this.state.formFields.length) {
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

    private getOptions = () => {
        let myOptions: Array<JSX.Element> = []
        let options = this.state.formFields[this.state.fieldIndex].options
        if (options) {
            options.forEach(option => {
                myOptions.push(<option key={option.name} {...option}>{option.name}</option>)
            });
        }
        return myOptions;
    }

    private handleChange = (event: any) => {
        let num = +event.target.value
        let tmp = this.state.formFields;
        if (isNaN(num)) {
            tmp[this.state.fieldIndex].value = event.target.value;
            this.setState({formFields : tmp})
        } else {
            tmp[this.state.fieldIndex].value = num;
            this.setState({formFields : tmp})
        }
    }

    private handleSubmit = (e: any) => {
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
                        <p>Hi {this.state.formFields[0].value}, your bmi is {calculateBMI(+this.state.formFields[3].value, +this.state.formFields[2].value).toFixed(2)}</p>
                        :
                        <div>
                            <label>{this.state.formFields[this.state.fieldIndex].labelText}</label>
                            <br />
                            {this.state.formFields[this.state.fieldIndex].type === 'select' ?
                                <select name={this.state.formFields[this.state.fieldIndex].name} defaultValue={this.state.formFields[this.state.fieldIndex].value} onChange={this.handleChange}>
                                    <option key="default" value="">-- Select --</option>
                                    {this.getOptions()}
                                </select>
                                :
                                <input
                                    type={this.state.formFields[this.state.fieldIndex].type}
                                    name={this.state.formFields[this.state.fieldIndex].name}
                                    value={this.state.formFields[this.state.fieldIndex].value === 0 ? "" : this.state.formFields[this.state.fieldIndex].value}
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