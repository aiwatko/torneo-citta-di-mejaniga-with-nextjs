import React, { Component } from 'react'
import styled from 'styled-components';

import Layout from '../components/Layout'
import getContent from '../api/content/sponsors'


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

class Sponsors extends Component {
    constructor() {
        super();
        this.state = { 
            sponsorsContent: null 
        }

        getContent.then(data => {
            this.setState({
                sponsorsContent: data           
            });
        }, console.error);
    }

    render() {
        return (
            <Layout>
                {
                    this.state.sponsorsContent &&
                    <Container>
                        <Title>{this.state.sponsorsContent.title}</Title>    
                        <Image src='static/sponsors/sponsors.jpg' alt="Sponsors"/>                    
                    </Container>
                }
            </Layout>    
        );
    }
  }
  
export default Sponsors;