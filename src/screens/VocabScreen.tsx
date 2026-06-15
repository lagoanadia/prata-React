import { useState } from 'react'

type Word = {
    swedish: string
    english: string
}

type Props = {
    words: Word[]
    setWords: (words: Word[]) => void
}

export default function VocabScreen({ words, setWords }: Props) {
  
   
    const [inputSwedish, setInputSwedish] = useState('')
    const [inputEnglish, setInputEnglish] = useState('')

    /**
     * 
     * @returns if the input bar is empty when the add button is clicked
     * 
     */
    function addWord() {
        if (inputSwedish.trim() === '') return
        setWords([...words, { swedish: inputSwedish, english: inputEnglish }])
        setInputSwedish('')
        setInputEnglish('')
    }

    function deleteWord(index: number) {
        setWords(words.filter((_, i) => i !== index))
    }

    return (
        <div className="vocab-container">
            <p className="vocab-title">ORDFÖRRÅD · VOCABULARY</p>
            <div className="vocab-grid">
                {words.map((word, i) => (
                    <div key={i} className="word-card">
                        <p className="word-swedish">{word.swedish}</p>
                        <p className="word-english">{word.english}</p>
                        <div className="word-actions">
                            <button className="word-btn" onClick={() => deleteWord(i)}>🗑</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="vocab-input-area">
                <input
                    className="vocab-input"
                    type="text"
                    placeholder="Swedish word..."
                    value={inputSwedish}
                    onChange={(e) => setInputSwedish(e.target.value)}
                />
                <input
                    className="vocab-input"
                    type="text"
                    placeholder="Translation..."
                    value={inputEnglish}
                    onChange={(e) => setInputEnglish(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addWord()}
                />
                <button className="vocab-add-btn" onClick={addWord}>+ Add</button>
            </div>
        </div>
    )
}