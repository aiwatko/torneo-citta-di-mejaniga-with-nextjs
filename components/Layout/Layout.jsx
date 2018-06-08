import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import './index.scss'

export default ({children}) => 
    <div className="template">
    <Header/>
        <main className="home template__container">
               {children}
        </main>
    <Footer/>
    </div>    