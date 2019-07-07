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
  width: 100%;
`;

class EdizionePassata extends Component {
  static async getInitialProps({ query }) {
    const { number, title } = query;
    return { title, number };
  }

  render() {
    const { number, title } = this.props;
    return (
      <Layout>
        {
          <Container>
            <Title>{title}</Title>
            {[4, 5, 6, 7].includes(Number(number)) && (
              <>
                <Subtitle>Calendario</Subtitle>
                <Image
                  src={`../static/edizioni-passate/calendario_${number}.jpg`}
                  alt={`Caldenario ${title}`}
                />
              </>
            )}
            {[3, 4, 5, 7].includes(Number(number)) && (
              <>
                <Subtitle>Fasi finali</Subtitle>
                <Image
                  src={`../static/edizioni-passate/ff_${number}.jpg`}
                  alt={`Fasi finali ${title}`}
                />
              </>
            )}
            {[3, 4, 5, 6, 7].includes(Number(number)) && (
              <>
                <Subtitle>Gironi</Subtitle>
                <Image
                  src={`../static/edizioni-passate/gironi_${number}.jpg`}
                  alt={`Gironi ${title}`}
                />
              </>
            )}
            {[4, 5, 6].includes(Number(number)) && (
              <>
                <Subtitle>Rose</Subtitle>
                <Image
                  src={`../static/edizioni-passate/rose_${number}.jpg`}
                  alt={`Rose ${title}`}
                />
              </>
            )}
          </Container>
        }
      </Layout>
    );
  }
}

export default EdizionePassata;
