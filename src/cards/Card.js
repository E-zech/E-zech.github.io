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

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../App';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';


export default function EditCards() {
    const [formData, setFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
                console.log(data)
            });
    }, [id]);


    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(formData);

        fetch(`https://api.shipap.co.il/business/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(data => {
                console.log(data)

            }).finally(() => navigate('/'))
    };

//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//             >

//                 <Typography component="h1" variant="h5">
//                     Edit
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                     <Grid container spacing={2}>
//                         {
//                             Object.keys(formData).map((propertyName) => (
//                                 <Grid key={propertyName} item xs={12} sm={6}>
//                                     {
//                                         propertyName === "favorite" ? (
//                                             ""
//                                         ) : (<TextField
//                                             margin="normal"
//                                             required
//                                             fullWidth
//                                             id={propertyName}
//                                             label={propertyName}
//                                             name={propertyName}
//                                             type="text"
//                                             autoComplete={propertyName}
//                                             value={formData[propertyName]}
//                                             onChange={(ev) =>
//                                                 setFormData({ ...formData, [propertyName]: ev.target.value })
//                                             }
//                                         />)
//                                     }

//                                 </Grid>
//                             ))
//                         }
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Save
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// }