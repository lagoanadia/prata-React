import { useState } from 'react'


   

    
type Word = {
    swedish: string
    english: string
}

type Props = {
    words: Word[]
}

export default function QuizScreen({ words }: Props) {

    const [current, setCurrent] = useState(0) // pointer that will run through the array words
    const [input, setInput] = useState('')
    const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

/** 
*
* Checks if user's input equals to the current's word translation to english
*/
    function check() {
        if (input.trim().toLowerCase() === words[current].english) {
            setResult('correct')
        } else {
            setResult('wrong')
        }
    }
/**
 * Increases pointer's value causing it to run through the array of the displayed words.
 * If said pointer's value is bigger than the array's size itself the quiz counts as comepleted
 * Resets input bar and result.
 */
    function next() {
        setCurrent(current + 1)
        setInput('')
        setResult(null)
    }

    if (current >= words.length) {
        return (
            <div className="quiz-container">
                <p className="quiz-done">Quiz complete!</p>
            </div>
        )
    }

    return (
        <div className="quiz-container">
            <div className="quiz-progress-bar">
                <div
                    className="quiz-progress-fill"
                    style={{ width: `${(current / words.length) * 100}%` }}
                />
            </div>
            <p className="quiz-counter">Word {current + 1} of {words.length}</p>
            <div className="quiz-card">
                <p className="quiz-label">SVENSKA — TRANSLATE TO ENGLISH</p>
                <p className="quiz-word">{words[current].swedish}</p>
            </div>
            {result && (
                <p className={result === 'correct' ? 'quiz-correct' : 'quiz-wrong'}>
                    {result === 'correct' ? '✓ Correct!' : `✗ It was: ${words[current].english}`}
                </p>
            )}
            <div className="quiz-input-area">
                <input
                    className="quiz-input"
                    type="text"
                    placeholder="Type the English translation..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (result ? next() : check())}
                    disabled={result !== null}
                />
                {/*
                One button two functions : if result isn't null it means the word has been checked meaning the button now has a "next" function
                If result is null it means the word hasn't been checked yet so it serves as a check button. 
                */}
                {result
                    ? <button className="quiz-btn" onClick={next}>Next →</button>
                    : <button className="quiz-btn" onClick={check}>Check</button>
                }
            </div>
        </div>
    )
}