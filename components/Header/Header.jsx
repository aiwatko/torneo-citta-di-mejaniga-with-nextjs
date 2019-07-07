import React, { Component } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import getNavItems from '../../api/content/navItems';

const HeaderSC = styled.header`
  min-height: 50px;
  padding: 4px 8px;
`;

const Container = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

const PrimaryNav = styled.nav`
  width: 100%;
`;

const NavToggleLabel = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerBar = css`
  display: block;
  position: relative;
  width: 35px;
  height: 3px;
  border-radius: 2px;
  background-color: white;
  margin-top: 8px;
  transition: all 0.3s ease-in-out;
`;
const HamburgerTop = styled.span`
  ${HamburgerBar}
`;
const HamburgerMiddle = styled.span`
  ${HamburgerBar}
`;
const HamburgerBottom = styled.span`
  ${HamburgerBar}
`;

const NavHeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #376513;
  top: 0;
  right: -100%;
  bottom: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    position: relative;
    height: auto;
    right: 0;
    background: transparent;
  }
`;

const NavToggle = styled.input`
  display: none;

  &:checked + ${NavToggleLabel} {
    ${HamburgerTop} {
      transform: rotate(-45deg);
      margin-top: 25px;
    }

    ${HamburgerMiddle} {
      transform: rotate(45deg);
      margin-top: -3px;
    }

    ${HamburgerBottom} {
      opacity: 0;
      transform: rotate(45deg);
    }
  }

  &:checked + ${NavToggleLabel} + ${NavHeaderContainer} {
    right: 0;
  }
`;

const NavInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  overflow-y: auto;
  height: 100%;
`;

const NavList = styled.ul`
  padding: 0;
  margin: 40px 0 0 0;
  list-style: none;
  text-align: center;

  @media (min-width: 768px) {
    width: 100%;
    justify-content: space-between;
    display: flex;
    margin-top: 0;
  }
`;

const NavListItem = styled.li``;

const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: white;
  font-size: 24px;
  display: inline-block;
  margin-top: 36px;
  transition: color 0.2s ease-in-out;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    margin: 12px 4px;
  }

  &:hover,
  &:visited {
    color: white;
  }

  &:hover {
    &:before {
      height: 100%;
    }
  }

  &:before {
    content: '';
    height: 0;
    position: absolute;
    width: 2px;
    background-color: white;
    left: -8px;
    transition: all 0.2s ease-in-out;

    @media (min-width: 768px) {
      content: none;
    }
  }
`;

const NavSublist = styled.ul`
  background-color: #376513;
  list-style: none;
  padding: 0;
  display: none;

  &.active {
    display: block;
  }
`;

const NavSublistItem = styled.li``;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      navItems: null
    };

    getNavItems.then(data => {
      this.setState({
        navItems: data
      });
    }, console.error);
  }

  openNav = () => {
    const nav = document.getElementsByClassName('header__nav-container')[0];
    nav.style.display = 'block';
  };

  closeNav = () => {
    const nav = document.getElementsByClassName('header__nav-container')[0];
    nav.style.display = 'none';
  };

  showSubnNav = e => {
    const subitems = e.target.nextSibling;
    subitems.classList.toggle('active');
  };

  render() {
    return (
      <HeaderSC>
        <Container>
          <PrimaryNav>
            <NavToggle type="checkbox" id="header__nav-toggle" />

            <NavToggleLabel htmlFor="header__nav-toggle">
              <HamburgerTop />
              <HamburgerMiddle />
              <HamburgerBottom />
            </NavToggleLabel>

            <NavHeaderContainer className="header__nav-container">
              <NavInner>
                <NavList>
                  {this.state.navItems &&
                    Object.values(this.state.navItems).map(item => {
                      return (
                        <NavListItem key={item.label}>
                          {item.subitems ? (
                            <div>
                              <NavLink onClick={this.showSubnNav}>
                                {item.label}
                              </NavLink>
                              <NavSublist>
                                {item.subitems.map(subitem => {
                                  if (subitem.active) {
                                    return (
                                      <NavSublistItem key={item.label}>
                                        <Link href={`/${subitem.link}`}>
                                          <NavLink>{subitem.nav_label}</NavLink>
                                        </Link>
                                      </NavSublistItem>
                                    );
                                  }
                                })}
                              </NavSublist>
                            </div>
                          ) : (
                            <Link href={`/${item.link}`}>
                              <NavLink>{item.label}</NavLink>
                            </Link>
                          )}
                        </NavListItem>
                      );
                    })}
                </NavList>
              </NavInner>
            </NavHeaderContainer>
          </PrimaryNav>
        </Container>
      </HeaderSC>
    );
  }
}

export default Header;
