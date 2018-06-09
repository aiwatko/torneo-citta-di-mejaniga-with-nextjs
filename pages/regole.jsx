import React, { Component } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import getContent from '../api/content/rules'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 8px 16px 8px;
`;

const Title = styled.h1`
    text-align: center;
`;

const Subtitle = styled.h2`
    text-align: center;
`;

const RulesList = styled.ul`
    max-width: 768px;
    margin: 0;
    padding-left: 24px;
    font-family: sans-serif;
    font-size: 16px;
`;

const ListItem = styled.li`
    margin-bottom: 8px;
`;

const Link = styled.a`
    color: #376513;

    &:visited {
        color: #376513;
    }
`;

const Text = styled.span`
    display: inline;
`; 

const Image = styled.img`
    max-width: 300px;
`;


class Rules extends Component {
    constructor() {
        super();
        this.state = { 
            rulesContent: null 
        }

        getContent.then(data => {
            this.setState({
                rulesContent: data           
            });
        }, console.error);
    }

    render() {
        return (
            <Layout>
                {
                    this.state.rulesContent &&
                    <Container>
                        <Title>{this.state.rulesContent.title}</Title>
                        <RulesList>
                            {
                                Object.values(this.state.rulesContent.rules).map((item, index) => {
                                    if(typeof item === 'object'){
                                        return(
                                            <ListItem key={item.index}>
                                                <Text>{item.title}</Text>
                                                <Link href={item.link}>{item.link_label}</Link>
                                            </ListItem>
                                        )
                                    } else {
                                        return(
                                            <ListItem key={item.index}>
                                                <Text>{item}</Text>
                                            </ListItem>
                                        );
                                    }
                                })
                            }  
                        </RulesList>
                        <Subtitle>{this.state.rulesContent.sub_title}</Subtitle>
                        <RulesList>
                        {
                            Object.values(this.state.rulesContent.goalkeeper_rules).map(item => {
                                return(
                                    <ListItem key={item}>
                                        <Text>{item}</Text>
                                    </ListItem>
                                );
                            })
                        } 
                        </RulesList>
                        <Image src='static/rules/rules.png' alt="Rules' mascot"/>
                    </Container>
                }
            </Layout>    
        );
    }
  }
  
export default Rules;