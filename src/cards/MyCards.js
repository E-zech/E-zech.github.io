import React, { useState, useEffect, useContext } from 'react';
import { GeneralContext } from "../App";
import CardComponent from './CardComponent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const inputsForCard = [
    { name: 'title', type: 'text', label: 'title', required: true },
    { name: 'description', type: 'text', label: 'description', required: true },
    { name: 'subtitle', type: 'text', label: 'subtitle', required: true },
    { name: 'phone', type: 'tel', label: 'Phone', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'web', type: 'text', label: 'web', required: true },
    { name: 'imgUrl', type: 'text', label: 'Img Url', required: true },
    { name: 'imgAlt', type: 'text', label: 'Img Alt', required: true },
    { name: 'state', type: 'text', label: 'State', required: true },
    { name: 'country', type: 'text', label: 'Country', required: true },
    { name: 'city', type: 'text', label: 'City', required: true },
    { name: 'street', type: 'text', label: 'Street', required: true },
    { name: 'houseNumber', type: 'number', label: 'House Number', required: true },
    { name: 'zip', type: 'text', label: 'Zip', required: true },
];

export default function MyCards() {
    const [allMyCards, setAllMyCards] = useState([]);
    const [formData, setFormData] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { setAllCard } = useContext(GeneralContext);

    useEffect(() => {
        fetch(`https://api.shipap.co.il/business/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setAllMyCards(data)
            });
    }, [])

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible); 
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`https://api.shipap.co.il/business/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                setFormData(formData)
            }).finally(toggleForm());
    }

    return (
        <>
          <div>
            <h3>ניהול הכרטיסים שלי : הוספה\צפייה\עריכה\מחיקה</h3>
          </div>
          <Button
            variant="contained"
            color={isFormVisible ? 'secondary' : 'primary'}
            onClick={toggleForm}
          >
            {isFormVisible ? 'Close' : 'Add Card'}
          </Button>
          {isFormVisible && (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Edit
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    {inputsForCard.map((i) => (
                      <Grid key={i.name} item xs={12}>
                        <TextField
                          margin="normal"
                          required={i.required}
                          fullWidth
                          id={i.name}
                          label={i.label}
                          name={i.name}
                          type={i.type}
                          value={formData[i.name] || ''}
                          onChange={handleChange}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Container>
          )}
          <section className="container-cards">
            {allMyCards.map((card) => (
              <CardComponent key={card.id} card={card} setAllCard={setAllMyCards} />
            ))}
          </section>
        </>
      );
    }
