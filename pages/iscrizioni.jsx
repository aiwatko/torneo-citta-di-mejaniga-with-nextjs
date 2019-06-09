import React, { Component } from 'react'
import * as firebase from 'firebase'
import shortid from 'shortid'
import styled from 'styled-components'

import Layout from '../components/Layout'
import InputField from '../components/InputField'
import InputFieldWithLabel from '../components/InputFieldWithLabel'

import { db, firebaseAuth } from '../api/setup'
import getContent from '../api/content/enrollment'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1024px; 
    padding: 8px;
    margin: 0 auto;   
    text-align: center;

    @media (min-width: 768px) {
        padding: 0;
    }
`;

const Title = styled.h1`
    text-align: center;
`;

const Subtitle = styled.h2`
    text-align: center;
`;

const TextContainer = styled.div`
    max-width: 768px;
    margin: 8px auto;
    font-family: sans-serif;
    font-size: 16px;
    text-align: left;
`;

const Text = styled.p`
    font-family: sans-serif;
    margin: 8px 0;
    font-size: 16px;
    text-align: left;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    width: 100%;
    min-width: ${props => props.small ? '300px' : ''};
    margin: 8px 0;

    @media (min-width: 768px) {
        padding: 0;
    }
`;

const RoundButton = styled.button`
    align-self: center;
    width: 32px;
    height: 32px;
    margin: 8px;
    border-radius: 50%;
    text-align: center;
    font-size: 20px;
    border: 1px solid #376513;
    background: transparent;
`;

const ErrorMsg = styled.div`
    margin: 8px 0;
    font-family: sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: red;
`;

const List = styled.ul`
    margin: 8px 0;
    padding: ${props => props.decorated ? 'auto' : '0'};
    list-style: ${props => props.decorated ? '' : 'none'};
    font-family: sans-serif;
    font-size: 16px;
    text-align: left;
`;

const ListItem = styled.li`
    margin-bottom: 8px;
`

const PlayerItem = styled.li`
    padding: 8px;
    border-bottom: 1px solid lightgray;

    &:first-of-type {
        border-top: 1px solid lightgray;
    }
`;

const PlayerItemMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LoginForm = styled.form`
    max-width: 768px;
    margin: 0 auto;
`;

const Button = styled.button`
    flex: ${props => props.grow ? '1' : ''};;
    padding: 8px 16px;
    font-size: 16px;
    font-family: sans-serif;
    margin-right: ${props => props.first ? '8px' : '0'};
    background: ${props => props.primary ? '#376513' : 'white'};
    color: ${props => props.primary ? 'white': '#376513'};
    border: 1px solid ${props => props.primary ? 'transparent': '#376513'};
`;

class Enrollment extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            loginMsg: null,
            enrollmentContent: null,
            enrollmentMsg: null,
            currentUser: null,
            teamName: '',
            restDay: '',
            players: null,
            captain: false,
            goalkeeper: false
        }

        getContent.then(data => {
            this.setState({
                enrollmentContent: data           
            });
        }, console.error);

        this.playersCollection = db.collection('teams2019');
    }

    onFieldChange = e => {
        const key = e.target.dataset.id
        let val;
        if(e.target.type === 'checkbox'){
            val = e.target.checked
        } else {
            val = e.target.value
        }
        this.setState({ [key]: val})
    }

    onAuthStateChange = firebaseAuth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            const currentUserId = firebase.auth().currentUser.email;            
            this.setState(
                {
                    loginMsg: 'Sei collegato, registra la tua squadra!',
                    loggedIn: true,
                    currentUser: currentUserId
                }
            )
            this.fetchTeamData();
            this.fetchPlayersData();   
        } else {
            this.setState(
                {
                    loginMsg: 'Nessuno è connesso :(',
                    loggedIn: false
                }
            )
        };
    });

    onLogin = () => {
        firebaseAuth.signInWithEmailAndPassword(this.state.loginEmail, this.state.loginPwd) 
            .catch(e => {
                this.setState(
                    {
                        loginMsg: e.message
                    }
                )
            })           
    }

    onSignUp = () => {
        firebaseAuth.createUserWithEmailAndPassword(this.state.loginEmail, this.state.loginPwd) 
            .catch(e => {
                this.setState(
                    {
                        loginMsg: e.message
                    }
                )
            })           
    }

    onLogOut = () => {
        firebase.auth().signOut();
    }

    onSaveTeamData = () => {
        this.playersCollection.doc(this.state.currentUser).set({
            __teamName: this.state.teamName,
            _restDay: this.state.restDay,
        }, { merge: true })
    }

    onSavePlayersData = () => {
        const playerID = shortid.generate();
        const playerData = {
            id: playerID,
            name: this.state.playerName,
            surname: this.state.playerSurame,
            birthYear: this.state.playerBirthYear,
            residence: this.state.playerResidence,
            phoneNb: this.state.playerPhoneNb,
            shirtNb: this.state.playerShirtNb,
            captain: this.state.captain,
            goalkeeper: this.state.goalkeeper
        }
        
        if(playerData.name !== undefined || playerData.surname !== undefined || playerData.surname !== undefined || playerData.birthYear !== undefined || playerData.residence !== undefined || playerData.phoneNb !== undefined || playerData.shirtNb !== undefined){
            this.playersCollection.doc(this.state.currentUser).set({
                players: {
                    [playerID]: playerData
                }
            }, { merge: true });
            this.fetchPlayersData();
        } else {
            this.setState({
                enrollmentMsg: 'Inserisci tutti i dati prima di procedere!'
            })
        }
    }

    validateData =  () => {
        if(this.state.teamName && this.state.restDay) {
            this.onSaveTeamData();

            if(this.state.players && Object.keys(this.state.players).length > 6) {
                this.setState({
                    enrollmentMsg: 'Tutti i tuoi dati sono stati salvati, ci vediamo al torneo!'
                })
            } else {
                console.log('else');
                this.setState({
                    enrollmentMsg: 'Inserisci tutti i dati richiesti, ci vogliono almeno 7 giocatori!'
                })
            }
        } else {
            this.setState({
                enrollmentMsg: 'Inserisci il nome della squadra e la preferenza giorno di riposo!'
            })
        }
    }

    onSaveAllData = () => {
        this.validateData();
        this.fetchPlayersData();
        this.fetchTeamData();
    }

    fetchPlayersData = () => {
        this.playersCollection.doc(this.state.currentUser).get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data()
                } else {
                    console.log("No such document!");
                }
            })
            .then(data => {
                this.setState({
                    players: data.players
                })
                this.hidePlayerInput()
            })
            .catch(error => {
                console.log("Error getting document:", error);
            }
        );
    }

    fetchTeamData = () => {
        this.playersCollection.doc(this.state.currentUser).get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data()
                } else {
                    console.log("No such document!");
                }
            })
            .then(data => {
                this.setState({
                    teamName: data.__teamName,
                    restDay: data._restDay,
                })
                this.hidePlayerInput()
            })
            .catch(error => {
                console.log("Error getting document:", error);
            }
        );
    }

    hidePlayerInput = () => {
        if(Object.keys(this.state.players).length > 10) {
            this.setState({
                enrollmentMsg: 'Hai raggiunto il limite dei giocatori registrati'
            })
        }
    }

    onRemovePlayer = e => {
        const playerID = `players.${e.target.dataset.id}`
        console.log(playerID)
        this.playersCollection.doc(this.state.currentUser).update({
            [playerID]: firebase.firestore.FieldValue.delete()
        });
        this.fetchTeamData()
    }

    render() {
        const restDay = this.state.restDay
        const teamName = this.state.teamName
        const players = this.state.players
        const enrollmentMsg = this.state.enrollmentMsg
        const isLoggedIn = this.state.loggedIn
        const content = this.state.enrollmentContent
        return(
            <Layout>
            {   
                isLoggedIn
                ?   
                content && 
                    <Container>
                        <Title>{content.enrollment.title}</Title>
                        <InnerContainer>
                                <InputFieldWithLabel 
                                    onChange={this.onFieldChange} 
                                    text={content.enrollment.team.team_name.label} 
                                    dataID={content.enrollment.team.team_name.id} 
                                    type={content.enrollment.team.team_name.type} 
                                    key={content.enrollment.team.team_name.order}
                                    value={teamName} 
                                />
                                <InputFieldWithLabel 
                                    onChange={this.onFieldChange} 
                                    text={content.enrollment.team.rest_day.label} 
                                    dataID={content.enrollment.team.rest_day.id} 
                                    type={content.enrollment.team.rest_day.type} 
                                    key={content.enrollment.team.rest_day.order}
                                    value={restDay} 
                                />
                        </InnerContainer>
                        <Subtitle>{content.enrollment.sub_title}</Subtitle>
                        <InnerContainer>
                        {      
                            Object.values(content.enrollment.player).sort((a, b) => a.order - b.order).map((item, index) => {
                                return(
                                    <InputFieldWithLabel onChange={this.onFieldChange} text={item.label} dataID={item.id} type={item.type} key={index}/>
                                )
                            })
                        }
                        </InnerContainer>
                        <RoundButton onClick={this.onSavePlayersData}>+</RoundButton>
                        { 
                            enrollmentMsg && <ErrorMsg>{enrollmentMsg}</ErrorMsg> 
                        }
                        <List>
                            {   players &&   
                                Object.values(players).map((item, index) => {
                                    return(
                                        <PlayerItem key={index}>
                                            <PlayerItemMain>
                                                <Text>{index + 1}. {item.name} {item.surname}</Text>
                                                <Button data-id={item.id} onClick={this.onRemovePlayer}>Rimuovi</Button>
                                            </PlayerItemMain>
                                            <b>Anno di nascita:</b> {item.birthYear}<br/>
                                            <b>Residenza:</b> {item.residence}<br/>
                                            <b>Numero di telefono:</b> {item.phoneNb}<br/>
                                            <b>Numero maglietta:</b> {item.shirtNb}<br/>
                                            {
                                                item.captain && <b>Capitano<br/></b>
                                            }
                                            {
                                                item.goalkeeper && <b>Portiere</b>
                                            }
                                        </PlayerItem>
                                    )
                                })
                            }
                        </List>
                        <InnerContainer row>
                            <Button primary first grow onClick={this.onSaveAllData}>Salva i tuoi dati</Button>
                            <Button grow onClick={this.onLogOut}>Scollegati</Button>
                        </InnerContainer>
                    </Container>
                : 
                content &&
                    <Container>
                        <Title>{content.login.title}</Title>
                        <LoginForm onSubmit={(e) => e.preventDefault()}>
                            <InnerContainer small>
                                <InputField onChange={this.onFieldChange} dataID="loginEmail" type="email" placeholder={content.login.email_placeholder}/>
                                <InputField onChange={this.onFieldChange} dataID="loginPwd" type="password" placeholder={content.login.password_placeholder}/>                                    
                            </InnerContainer>
                            <InnerContainer row> 
                                <Button primary first onClick={this.onLogin}>{content.login.login_button}</Button>
                                <Button onClick={this.onSignUp}>{content.login.signup_button}</Button>
                            </InnerContainer>
                        </LoginForm>   
                        <ErrorMsg>{this.state.loginMsg}</ErrorMsg>
                        <Text>{content.login.info}</Text>
                        <Subtitle>{content.login.sub_title}</Subtitle>
                        <TextContainer>
                            {
                                content.login.rules.map((rule, index) => {
                                    if(typeof rule === 'object'){
                                        return(
                                            <List decorated key={index}>
                                                {
                                                    Object.values(rule).map((item, index) => {
                                                        return(
                                                            <ListItem key={index}>{item}</ListItem>                                                            
                                                        )
                                                    })
                                                }
                                            </List>
                                        )
                                    } else {
                                        return <Text key={index}>{rule}</Text>
                                    }
                                })
                            }
                        </TextContainer>
                    </Container>
            }
            </Layout>   
        );
    }
  }
  
export default Enrollment;