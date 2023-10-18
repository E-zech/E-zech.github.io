// import './Card.css';
import { useEffect, useState, useContext } from 'react';
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { GeneralContext } from "../App";
import { RoleTypes } from "../components/Navbar";
import CardComponent from './Cards';

export default function FavCards() {
    const [favCards, setFavCards] = useState([]);
    const { user, userRoleType } = useContext(GeneralContext);

    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/favorite?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setFavCards(data)
            });
    }, [])
    return (
        <>

            <section className="container-cards">
                {
                    favCards.map(c => (
                        <CardComponent />
                    ))
                }
            </section>
        </>
    )
}
