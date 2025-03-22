import './App.css'
import Footer from './components/Footer/Footer'
import InfoBox from './components/InfoBox/InfoBox'
import LangSelect from './components/LangSelect/LangSelect'
import Title from './components/Title/Title'

function App() {
    return (
        <div className='container'>
            <div className='wrapper'>
                <LangSelect />
                <Title />
                <InfoBox />
                <Footer />
            </div>
        </div>
    )
}

export default App
