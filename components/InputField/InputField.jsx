import React from 'react'

import './index.css';

const InputField = (props) => (
    <input className="input-field" value={props.value} data-id={props.dataID} onChange={props.onChange} type={props.type} placeholder={props.placeholder}/>
)

export default InputField
