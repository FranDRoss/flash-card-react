import React from 'react'
import Card from './Card'

export default function CardList({ flashCards, setPoints }) {
    return (
        <div className="card-grid">
            {flashCards.map(flashcard => {
                return <Card data={flashcard} setPoints={setPoints} key={flashcard.id} />
            })}
        </div>
    )
}
