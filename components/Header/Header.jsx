import React, { Component } from 'react'
import Link  from 'next/link'

import './index.scss';
import getNavItems from '../../api/content/navItems'

class Header extends Component {
    constructor() {
        super();
        this.state = { 
            navItems: null 
        }

        getNavItems.then(data => {
            this.setState({
                navItems: data           
            });
        }, console.error);
    }
    
    
    openNav = () => {
        const nav = document.getElementsByClassName('header__nav-container')[0];
        nav.style.display = 'block';
    }
    
    closeNav = () => {
        const nav = document.getElementsByClassName('header__nav-container')[0];
        nav.style.display = 'none';
    }

    render() {
        return (
            <div className="header">
                <div className="header__container">
                    <div className="header__nav">
                        <input id="header__nav-toggle" type="checkbox"></input>

                        <label className="header__nav-hamburger" htmlFor="header__nav-toggle">
                            <div className="header__nav-hamburger-top"></div>
                            <div className="header__nav-hamburger-middle"></div>
                            <div className="header__nav-hamburger-bottom"></div>
                        </label>

                        <div className="header__nav-container">
                            <nav className="header__nav-inner">
                                <ul className="header__nav-list">
                                    {
                                        this.state.navItems && Object.values(this.state.navItems).map(item => {
                                            return(
                                            <li className="header__nav-item" key={item.label}>
                                                <Link className="header__nav-item-link" href={`/${item.link}`}>{item.label}</Link>
                                            </li>
                                            );
                                        })
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }
  
export default Header;