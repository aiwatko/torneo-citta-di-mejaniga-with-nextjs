import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    margin: 4px 0;
    padding: 8px;
    font-size: 16px;
    font-family: sans-serif;
    border: 1px solid lightgray;  
`;

const InputField = (props) => (
    <Input 
        value={props.value} 
        data-id={props.dataID} 
        onChange={props.onChange} 
        type={props.type} 
        placeholder={props.placeholder
    }/>
)

export default InputField
