import React, { Component } from 'react'
import styled from 'styled-components';

import Layout from '../components/Layout'

const Container = styled.div`
    max-width: 1024px; 
    margin: 0 auto; 
`;

const Title = styled.h1`
    text-align: center;
`;

const Image = styled.img`
    position: relative;
    width: 100%;
`;

class Gironi extends Component {
    render() {
        return (
            <Layout>
                {
                    <Container>
                        <Title>Gironi</Title>    
                        <Image src='/static/aggiornamenti/gironi.jpg' alt="Gironi"/>                    
                    </Container>
                }
            </Layout>    
        );
    }
  }
  
export default Gironi;