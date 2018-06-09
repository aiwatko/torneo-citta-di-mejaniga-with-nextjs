import React from 'react'
import styled from 'styled-components'

import InputField from './InputField'

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    font-size: 16px;
    margin-bottom: 12px;
`;


const InputText = styled.span`
    display: inline-block;
    font-weight: 800;
    font-size: 14px;
    text-align: left;
`;


const InputFieldWithLabel = (props) => (
    <Label>
        <InputText>{props.text}:</InputText>
        <InputField value={props.value} dataID={props.dataID} onChange={props.onChange} type={props.type} placeholder={props.placeholder}/>
    </Label>
)

export default InputFieldWithLabel
