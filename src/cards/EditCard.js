import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../App';

export default function EditCards() {
    const [formData, setFormData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { setLoader, snackbar, filteredCards, setFilteredCards } = useContext(GeneralContext);

    useEffect(() => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
            }).finally(()=>{
                setLoader(false);
            })
    }, [id]);


    const handleSubmit = (ev) => {
        ev.preventDefault();
        setLoader(true);  
        fetch(`https://api.shipap.co.il/business/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((data) => {
                if (data.ok) {
                    if(filteredCards.some(card => card.id === formData.id)){
                        setFilteredCards(prevFilteredCards => {
                            return prevFilteredCards.map(card => {
                                return card.id === formData.id ? { ...card, ...formData } : card;
                            });
                        }); 
                    }
                    snackbar('Card updated successfully');
                    navigate('/my-cards'); 
                } else {
                    snackbar('Error updating card');
                }
            })
            .finally(() => setLoader(false));
    };

    return (
        <>
        <header>
            <h1 className='main-title'>Edit Card</h1>
        </header>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        {
                            Object.keys(formData).map((propertyName) => (
                                <Grid key={propertyName} item xs={12} sm={6}>
                                    {
                                        propertyName === "favorite" ? (
                                            ""
                                        ) : (<TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id={propertyName}
                                            label={propertyName}
                                            name={propertyName}
                                            type="text"
                                            autoComplete={propertyName}
                                            value={formData[propertyName]}
                                            onChange={(ev) =>
                                                setFormData({ ...formData, [propertyName]: ev.target.value })
                                            }
                                        />)
                                    }
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, marginBottom:"100px" }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Container>
        </>
        
    );
}