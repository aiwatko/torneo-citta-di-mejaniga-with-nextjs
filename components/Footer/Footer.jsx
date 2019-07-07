import React from 'react';
import styled from 'styled-components';

const FooterSC = styled.footer`
  height: 50px;
  padding: 4px 8px;
`;

const Container = styled.div`
  position: relative;
  max-width: 1024px;
`;

const Text = styled.p`
  width: 100%;
  text-align: right;
  font-size: 14px;
  color: white;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: white;
  }
`;

const Footer = props => (
  <FooterSC>
    <Container>
      <Text>
        Made with ❤ by <Link href="https://oktawiakata.com">Oktawia Kata</Link>
      </Text>
    </Container>
  </FooterSC>
);

export default Footer;
