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

const HamburgerIcon = styled.button`
  position: absolute;
  right: 0;
  z-index: 5;
  background: transparent;
  border: none;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerBarStyle = css`
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
  ${HamburgerBarStyle};

  ${({ isNavOpen }) =>
    isNavOpen
      ? `transform: rotate(-45deg);
    margin-top: 25px;`
      : ''}
`;

const HamburgerMiddle = styled.span`
  ${HamburgerBarStyle};

  ${({ isNavOpen }) =>
    isNavOpen
      ? `transform: rotate(45deg);
    margin-top: -3px;`
      : ''}
`;

const HamburgerBottom = styled.span`
  ${HamburgerBarStyle};

  ${({ isNavOpen }) =>
    isNavOpen
      ? `opacity: 0;
    transform: rotate(45deg);`
      : ''}
`;

const NavHeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #376513;
  top: 0;
  right: ${({ isNavOpen }) => (isNavOpen ? '0' : '-100%')};
  bottom: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  display: ${({ isNavOpen }) => (isNavOpen ? 'block' : 'none')};
  position: ${({ isNavOpen }) => (isNavOpen ? 'fixed' : '')};

  @media (min-width: 768px) {
    display: block;
    height: auto;
    right: 0;
    background: transparent;
  }
`;

const NavInner = styled.div`
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

const NavLinkStyle = css`
  position: relative;
  text-decoration: none;
  color: white;
  font-size: 24px;
  display: inline-block;
  margin-top: 36px;
  transition: color 0.2s ease-in-out;
  letter-spacing: 1px;
  font-family: inherit;
  border: none;
  background: transparent;

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

const NavLink = styled.a`
  ${NavLinkStyle}
`;
const NavLinkButton = styled.button`
  ${NavLinkStyle}
`;

const NavSublist = styled.ul`
  background-color: #376513;
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
  display: none;
  z-index: 5;
  min-width: 195px;

  @media (min-width: 768px) {
    position: absolute;
  }

  &.active {
    display: block;
  }
`;

const NavSublistItem = styled.li``;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      navItems: null,
      isNavOpen: false
    };

    getNavItems.then(data => {
      this.setState({
        navItems: data
      });
    }, console.error);
  }

  toggleMainNav = () => {
    this.setState(prevState => ({
      isNavOpen: !prevState.isNavOpen
    }));
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
            <HamburgerIcon onClick={this.toggleMainNav}>
              <HamburgerTop isNavOpen={this.state.isNavOpen} />
              <HamburgerMiddle isNavOpen={this.state.isNavOpen} />
              <HamburgerBottom isNavOpen={this.state.isNavOpen} />
            </HamburgerIcon>

            <NavHeaderContainer isNavOpen={this.state.isNavOpen}>
              <NavInner>
                <NavList>
                  {this.state.navItems &&
                    Object.values(this.state.navItems).map(item => {
                      return (
                        <NavListItem key={item.label}>
                          {item.subitems ? (
                            <>
                              <NavLinkButton onClick={this.showSubnNav}>
                                {item.label}
                              </NavLinkButton>
                              <NavSublist>
                                {item.subitems.map((subitem, i) => {
                                  if (subitem.active) {
                                    return (
                                      <NavSublistItem
                                        key={`${i}-${subitem.link}`}
                                      >
                                        {item.label === 'Edizioni passate' ? (
                                          <Link
                                            href={`/${item.link}/${
                                              subitem.link
                                            }`}
                                            as={`/${item.link}/${subitem.link}`}
                                            passHref
                                          >
                                            <NavLink>
                                              {subitem.nav_label}
                                            </NavLink>
                                          </Link>
                                        ) : (
                                          <Link
                                            href={`/${subitem.link}`}
                                            passHref
                                          >
                                            <NavLink>
                                              {subitem.nav_label}
                                            </NavLink>
                                          </Link>
                                        )}
                                      </NavSublistItem>
                                    );
                                  }
                                })}
                              </NavSublist>
                            </>
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
