import { useState } from 'react'
import ChatScreen from '../screens/ChatScreen'
import QuizScreen from '../screens/QuizScreen'
import VocabScreen from '../screens/VocabScreen'

type Word = {
    swedish: string
    english: string
}

type Tab = 'chat' | 'quiz' | 'vocabulary'

export default function Layout() {
    const [currentScreen, setCurrentScreen] = useState<Tab>('chat')
    const [words, setWords] = useState<Word[]>([
    { swedish: 'hej', english: 'hello' },
    { swedish: 'tack', english: 'thank you' },
    { swedish: 'idag', english: 'today' },
    
])


    return (
        <div className='layout'>

            <header className='header'>
                <div className='header-dots'>
                    <span className='dot' />
                    <span className='dot' />
                    <span className='dot' />
                </div>
                <div className='header-logo'>
                    <span className='logo-pr'>pr</span>
                    <span className='logo-a'>a</span>
                    <span className='logo-ta'>ta</span>
                    <span className='header-subtitle'>Swedish, one chat at a time</span>
                </div>
            </header>

            <main className='main'>
                {currentScreen === 'chat' && <ChatScreen />}
                {currentScreen === 'vocabulary' && <VocabScreen words={words} setWords={setWords} />}
                {currentScreen === 'quiz' && <QuizScreen words={words} />}
            </main>

            <nav className='navbar'>
                <button
                    className={currentScreen === 'chat' ? 'navBtn active' : 'navBtn'}
                    onClick={() => setCurrentScreen('chat')}>
                    Chat
                </button>
                <button
                    className={currentScreen === 'quiz' ? 'navBtn active' : 'navBtn'}
                    onClick={() => setCurrentScreen('quiz')}>
                    Quiz
                </button>
                <button
                    className={currentScreen === 'vocabulary' ? 'navBtn active' : 'navBtn'}
                    onClick={() => setCurrentScreen('vocabulary')}>
                    Vocab
                </button>
            </nav>

        </div>
    )
}