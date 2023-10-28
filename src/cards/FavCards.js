import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import { GeneralContext } from "../App";
import CardComponent from './CardComponent';

export default function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const { setAllCard, filteredCards } = useContext(GeneralContext);

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

    const filteredFavCards = filteredCards.length > 0 ? favCards.filter(card => {
        return filteredCards.some(filteredCard => filteredCard.id === card.id);
    }) : favCards;

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