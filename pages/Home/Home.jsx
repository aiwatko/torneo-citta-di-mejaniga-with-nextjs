import React, { Component } from 'react'
import getHomeContent from '../../api/content/home'

import './index.scss';

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
            this.state.homeContent &&
            <div className="home__container">
                <h1 className="home__title">{this.state.homeContent.title}</h1>    
                <p className="home__text">{this.state.homeContent.sub_title1}</p>    
                <p className="home__text">{this.state.homeContent.sub_title2}</p>    
                <img className="home__logo" src="static/logo.png" alt="Tournament's logo"/>                    
            </div>
        );
    }
  }
  
export default Home;