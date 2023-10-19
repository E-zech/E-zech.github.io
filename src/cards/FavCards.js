// import './Card.css';
import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import { GeneralContext } from "../App";
import CardComponent from './CardComponent';

export default function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const { setAllCard } = useContext(GeneralContext);

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
                setFavCards(data)
            });
    }, [favCards])
    return (
        <>
            <section className="container-cards">
                {
                    favCards.map(card => (
                        <CardComponent key={card.id} card={card} setAllCard={setFavCards} />
                    ))
                }
            </section>
        </>
    )
}

