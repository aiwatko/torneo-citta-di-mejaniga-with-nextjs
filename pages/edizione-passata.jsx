import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const Subtitle = styled.h2`
  text-align: center;
`;

const Image = styled.img`
  position: relative;
  width: 100%;
`;

class EdizionePassata extends Component {
  static async getInitialProps({ query }) {
    const { number, title } = query;
    return { title, number };
  }

  render() {
    return (
      <Layout>
        {
          <Container>
            <Title>{this.props.title}</Title>
            <Subtitle>Calendario</Subtitle>
            <Image
              src={`static/edizioni-passate/gironi_${this.props.number}.jpg`}
              alt={`Caldenario ${this.props.title}`}
            />
            <Subtitle>Fasi finali</Subtitle>
            <Image
              src={`static/edizioni-passate/ff_${this.props.number}.jpg`}
              alt={`Fasi finali ${this.props.title}`}
            />
            <Subtitle>Gironi</Subtitle>
            <Image
              src={`static/edizioni-passate/gironi_${this.props.number}.jpg`}
              alt={`Gironi ${this.props.title}`}
            />
            <Subtitle>Rose</Subtitle>
            <Image
              src={`static/edizioni-passate/rose_${this.props.number}.jpg`}
              alt={`Rose ${this.props.title}`}
            />
          </Container>
        }
      </Layout>
    );
  }
}

export default EdizionePassata;
