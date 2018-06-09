import React, { Component } from 'react'
import styled from 'styled-components';

import Layout from '../components/Layout'
import getContactsContent from '../api/content/contacts'

const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;  
`;

const Title = styled.h1`
    text-align: center; 
`;

const Subtitle = styled.p`
    text-align: center; 
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    list-style: none;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ListItem = styled.li`
    flex: 1 0 0;
`;

const Link = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    text-decoration: none;
    color: black;
`;

const Image = styled.img`
    width: 200px;
`;

const Text = styled.span`
    margin-top: 20px;
    text-align: center;
`;

class Contacts extends Component {
    constructor() {
        super();
        this.state = { 
            contactsContent: null 
        }

        getContactsContent.then(data => {
            this.setState({
                contactsContent: data           
            });
        }, console.error);
    }

    render() {
        return (
            <Layout>
                {
                    this.state.contactsContent &&
                    <Container>
                        <Title>{this.state.contactsContent.title}</Title>    
                        <Subtitle>{this.state.contactsContent.sub_title}</Subtitle>
                        <List>
                        {
                            Object.values(this.state.contactsContent.contact_types).map(item => {
                                return(
                                <ListItem key={item.type}>
                                    <Link
                                    href= {item.type === 'email' ? `mailto:${item.link}`
                                            : item.type === 'whatsapp' ? `tel:${item.link}` 
                                            : item.link}
                                    >
                                        <Image 
                                            src={item.type === 'email' ? '/static/contacts/email.png'
                                                : item.type === 'whatsapp' ? '/static/contacts/whatsapp.png' 
                                                : '/static/contacts/facebook.png'}
                                            alt="Contact type icon"
                                        />
                                        <Text>{item.text}</Text>
                                    </Link>
                                </ListItem>
                                );
                            })
                        }
                        </List>    
                    </Container>
                }
            </Layout>
        );
    }
  }
  
export default Contacts;