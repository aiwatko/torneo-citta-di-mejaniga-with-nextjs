import styled from 'styled-components'

import Header from './Header/Header'
import Footer from './Footer/Footer'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    background: #376513;
    background-size: cover;
`

const Container = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    background: white;
`

export default ({children}) => 
    <Wrapper>
        <Header/>
            <Container>
                {children}
            </Container>
        <Footer/>
    </Wrapper>    