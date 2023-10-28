import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import { GeneralContext } from "../App";
import CardComponent from './CardComponent';

export default function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const { setAllCard, filteredCards, setFilteredCards } = useContext(GeneralContext);

    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/favorite?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(data => {
                setFavCards(data);
            });
    }, [favCards]); 

    const filteredFavCards = favCards.filter(card => {
     filteredCards.some(filteredCard => filteredCard.id === card.id);
    }) ;

    return (
        <>
        <header>
        <h1>כותרת מתאימה לדף זה</h1>
        </header>
            <section className="container-cards">
                {filteredFavCards.length > 0 ? (
                    filteredFavCards.map(card => (
                        <CardComponent key={card.id} card={card} setAllCard={setFavCards} />
                    ))
                ) : (
                    <div>Results not found</div>
                )}
            </section>
        </>
    )
}