import React, { Component } from 'react'
import styled from 'styled-components';

import Layout from '../components/Layout'
import getHomeContent from '../api/content/home'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;  
    max-width: 1024px;
    margin: 0 auto;
    padding: 8px;
`;

const Title = styled.h1`
    margin-top: 0;
    text-align: center;
`;

const Text = styled.p`
    margin: 8px 0;
    text-align: center;
`;

const Logo = styled.img`
    height: auto;
    width: 250px;
`;

class Home extends Component {
    constructor() {
        super();
        this.state = { 
            homeContent: null 
        }

        getHomeContent.then(data => {
            this.setState({
                homeContent: data           
            });
        }, console.error);
    }

    render() {
        return (
            <Layout>
                {
                    this.state.homeContent &&
                    <Container>
                        <Title>{this.state.homeContent.title}</Title>    
                        <Text>{this.state.homeContent.sub_title1}</Text>    
                        <Text>{this.state.homeContent.sub_title2}</Text>    
                        <Logo src="static/home/logo.png" alt="Tournament's logo"/>                    
                    </Container>
                }
            </Layout>
        );
    }
  }
  
export default Home;