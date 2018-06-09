import React, { Component } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import getContent from '../api/content/structure'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1024px; 
    padding: 8px;
    margin: 0 auto;  

    @media (min-width: 768px) {
        padding: 0;
    }
`;

const Title = styled.h1`
    text-align: center;
`;


const Subtitle = styled.h2`
    text-align: center;
`

const DatesList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;

    @media (min-width: 768px) {
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
`;

const TextContainer = styled.div`
    margin-bottom: 8px;
`;

const DatesListItem = styled.li`
    margin-bottom: 16px;
    font-family: sans-serif; 
    font-size: 16px; 
`;

const ItemTitle = styled.h3`
    display: block;
    margin: 4px;
`;

const ItemSubtitle = styled.span`
    display: block;
    margin: 4px;
`;

const Image = styled.img`
    height: 300px;
`;

const RulesList = styled.ul`
    max-width: 768px;
    padding-left: 24px;
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
`;

const RulesListItem = styled.li`
    margin-bottom: 8px;
`;


class Structure extends Component {
    constructor() {
        super();
        this.state = { 
            structureContent: null 
        }

        getContent.then(data => {
            this.setState({
                structureContent: data           
            });
        }, console.error);
    }

    render() {
        return (
            <Layout>
                {
                    this.state.structureContent &&
                    <Container>
                        <Title>{this.state.structureContent.title}</Title>
                        <DatesList>
                            {
                                Object.values(this.state.structureContent.dates).map(item => {
                                    return(
                                        <DatesListItem key={item.title}>
                                            <TextContainer>
                                                <ItemTitle>{item.title}</ItemTitle>
                                                <ItemSubtitle>{item.sub_title}</ItemSubtitle>
                                            </TextContainer> 
                                            <Image
                                                src={item.label === 'phase1' ? '/static/structure/phase1.png'
                                                : item.label === 'phase2' ? '/static/structure/phase2.png' 
                                                : '/static/structure/phase3.png'} 
                                                alt="Fase del torneo" />
                                        </DatesListItem>
                                    );
                                })
                            }  
                        </DatesList>
                        {
                            Object.values(this.state.structureContent.rules_lists).map((item, index) => {
                                const subtitle = item.title
                                const rules = item.rules
                                return(
                                        <div key={index}>
                                            {
                                                subtitle && 
                                                    <Subtitle>{subtitle}</Subtitle>
                                            }     
                                            {
                                                rules &&
                                                <RulesList>
                                                    {
                                                        rules.map((item, index) => {
                                                            return(
                                                                <RulesListItem key={index}>{item}</RulesListItem>
                                                            )
                                                        })
                                                    }
                                                </RulesList> 
                                            }   
                                        </div>                                             
                                    );
                                })
                        }  
                    </Container>
                }
            </Layout>    
        );
    }
  }
  
export default Structure;