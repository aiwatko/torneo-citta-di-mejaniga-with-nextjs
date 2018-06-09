import React from 'react'
import InputField from '../InputField/InputField.jsx'

import './index.scss';

const InputFieldWithLabel = (props) => (
    <label className="input-label">
        <span className="input-label__text">{props.text}:</span>
        <InputField value={props.value} dataID={props.dataID} onChange={props.onChange} type={props.type} placeholder={props.placeholder}/>
    </label>
)

export default InputFieldWithLabel
