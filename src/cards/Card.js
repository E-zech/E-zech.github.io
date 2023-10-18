// import './Card.css';
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
import { useContext } from "react";
import { GeneralContext } from "../App";
import { RoleTypes } from "../components/Navbar";
import { useEffect } from 'react';
import { useState } from 'react';

//DSFKKSDKFJSDKJFKSDJFKJSDKFJSKJFK
export default function CardComponent() {
  const [allCards, setAllCard] = useState([]);
  const { user, setUser, setLoader, setUserRoleType, userRoleType, setFavCards } = useContext(GeneralContext);


  useEffect(() => {
    fetch(`https://api.shipap.co.il/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setAllCard(data);
        setLoader(false);
      });
  }, [])

  const toggleFavOrNot = (id, favorite) => {
    setLoader(true);
  
    const apiUrl = favorite
      ? `https://api.shipap.co.il/cards/${id}/unfavorite?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`
      : `https://api.shipap.co.il/cards/${id}/favorite?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`;
  
    fetch(apiUrl, {
      credentials: 'include',
      method: 'PUT',
    })
      .then(() => {
        // Update the allCards state to mark the card as a favorite or not
        setAllCard((allCards) =>
          allCards.map((card) =>
            card.id === id ? { ...card, favorite: !favorite } : card
          )
        );
        setLoader(false);
      });
  };
  
  
  return (

    <>
      <section className='container-cards' >
        {
          allCards.map(c => (
            <Card Card sx={{ maxWidth: 345 }}
              key={c.id}
              className='card' >
              <CardMedia
                component="img"
                height="194"
                image="https://picsum.photos/500/300" // {c.imgUrl}
                alt="Paella dish"
              />
              <CardHeader title={c.title} subheader={c.subtitle} />

              <CardContent>
                <Typography color="text.secondary">

                  <b>phone:</b> {c.phone}
                  <br />
                  <br />
                  <b>Adress:</b> {c.state} {c.city} {c.street} {c.houseNumber} {c.zip}
                  <br />
                  <br />
                  <b>Card Number:</b> {c.id}
                </Typography>
              </CardContent>

              {/*---- the div that wrap the buttons at the bottom of the card--- */}

              <CardActions disableSpacing>
                <IconButton>
                  < LocalPhoneIcon aria-label="phone" />
                </IconButton>
                {

                  user &&
                  <IconButton id='favoriteBtn' IconButton aria-label="add to favorites"
                    onClick={() => toggleFavOrNot(c.id, c.favorite)
                    } >
                    <FavoriteIcon color={c.favorite ? "error" : ""} />
                  </IconButton>}
                {
                  userRoleType == RoleTypes.business &&
                  console.log("busiines")
                }
                {
                  userRoleType == RoleTypes.admin &&
                  <IconButton IconButton aria-label="delete" >
                    < DeleteIcon />
                  </IconButton>
                  // onClick={() => deleteCard(c.id)}
                }
              </CardActions>

            </Card >
          ))
        }
      </section>

    </>
  );
}