import React from 'react'

import { BMIValues } from '../types'

type IProps = {bmi:number} & BMIValues;

class BmiCalc extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                Hi {this.props.name}, your bmi is {this.props.bmi}
            </div>
        )
    }
}

export default BmiCalc
