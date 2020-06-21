import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ data, setPoints }) {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')
    const [answered, setAnswered] = useState(null)
    const [choice, setChoice] = useState(null)

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight, [data.question, data.answer, data.options])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    const handleChoice = (e, option, i) => {
        e.preventDefault()
        if (!option && answered) {
            setFlip(!flip)
            return
        } else if (!option && !answered) {
            return
        } else if (option === data.answer) {
            setAnswered("right")
            setPoints()
        }
        else setAnswered("wrong")
        setFlip(!flip)
        setChoice(i)
    }

    return (
        <div
            className={`card ${flip ? 'flip' : ''} ${answered ? "pointer" : ""}`}
            style={{ height: height }}
            onClick={e => handleChoice(e)}
        >
            <div className="front" ref={frontEl}>
                {data.question}
                <div className="flashcard-options">
                    {data.options.map((option, i) => {
                        return <div onClick={e => !answered ? handleChoice(e, option, i) : ""} className={`${!answered ? "flashcard-option" : choice !== i ? `flashcard-option--selected` : `flashcard-option--selected--${answered}`}`} key={option}>{option}</div>
                    })}
                </div>
            </div>
            <div onClick={() => setFlip(!flip)} className={`back pointer ${!answered ? "" : answered === "right" ? "back--right" : "back--wrong"}`} ref={backEl}>{data.answer}</div>
        </div>
    )
}
