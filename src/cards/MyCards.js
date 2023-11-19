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
import Joi from 'joi';
import "./MyCards.css";
import ResultNotFound from '../components/ResultNotFound.js';

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
    { name: 'zip', type: 'text', label: 'Zip', required: true },];

export default function MyCards() {
    const [allMyCards, setAllMyCards] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { filteredCards, setFilteredCards , snackbar , loader , setLoader } = useContext(GeneralContext);

    const schema = Joi.object({
      title: Joi.string().required().min(2).max(30),
      description: Joi.string().required().min(6).max(999),
      subtitle: Joi.string().required().min(2).max(30),
      phone: Joi.string().required().pattern(/^\d{10}$/).message('"Phone number" must be 10 digits long'),
      email: Joi.string().email({ tlds: false }).required(),
      web:Joi.string().required().uri({ scheme: ['http', 'https'] }).message('"web" must be a valid link (HTTP or HTTPS).') ,
      imgUrl: Joi.string().required().uri({ scheme: ['http', 'https'] }).message('"Img Url" must be a valid link (HTTP or HTTPS).'),
      imgAlt: Joi.string().required().min(2).max(20),
      state: Joi.string().required().min(4).max(56),
      country: Joi.string().required().min(2).max(56),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.number().required(),
    });

    useEffect(() => {
      setLoader(true);
        fetch(`https://api.shipap.co.il/business/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setAllMyCards(data);
            }).finally(()=> setLoader(false))
    }, [filteredCards])
    const toggleForm = () => {
        setIsFormVisible(!isFormVisible); 
        if (!isFormVisible) {
          setFormData({});
          setErrors({});
        }};
    
  const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

    const validate = schema.validate({ ...formData, [name]: value }, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[name];

    if (validate.error) {
      const item = validate.error.details.find(e => e.context.key == name);
      if (item) {
        tempErrors[name] = item.message;
      }};
      
    setIsFormValid(!validate.error);
    setErrors(tempErrors)};
    
  const handleSubmit = (ev) => {
      ev.preventDefault();
      setLoader(true);
        const obj = {};
        const elements = ev.target.elements;    
        inputsForCard.forEach((s) => {
          if (s.type === 'boolean') {
            obj[s.name] = elements[s.name].checked;
          } else {
            obj[s.name] = elements[s.name].value;
          }});
        
      fetch(`https://api.shipap.co.il/business/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
          })
            .then(res => res.json())
            .then(data => {
                setFormData(formData);
                setFilteredCards([...filteredCards, data]);
            }).finally(()=>{
              toggleForm();
               snackbar('Card added');
            }).finally(()=> setLoader(false))};
    
      const filteredMyCards = allMyCards.filter(card => {
      return filteredCards.some(filteredCard => filteredCard.id === card.id);
  });

    return (
      <>
       <header>
        <h1 className='main-title leftFix'>My Cards </h1>
        <br />
        </header>
        <section className="container-cards">
                {loader ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {filteredMyCards.length > 0 ? (
                            filteredMyCards.map(card => (
                                <CardComponent key={card.id} card={card} setAllCard={setFilteredCards} />
                            ))
                        ) : (
                            <ResultNotFound />
                        )}
                    </div>
                )}
            </section>

        <a href="#addCard" className='addCardBtn'>  <Button
            variant="contained"
            color={isFormVisible ? 'secondary' : 'primary'}
            onClick={toggleForm} 
            sx={{ backgroundColor: 'indigo' ,
            '&:hover':{
             backgroundColor:'#7e30b7' 
            }}}>        
            {isFormVisible ? 'Close' : 'Add Card'}
          </Button></a> <br />   
        <>
        <section className='form-container' id='addCard'>
          {isFormVisible && (
            <Container component="main" maxWidth="xs"  >
              <CssBaseline />
              <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',}}>
                <Typography component="h1" variant="h5">
                  Add Card
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
                          error={Boolean(errors[i.name])}
                          helperText={errors[i.name]}
                          autoComplete="off" 
                        />
                      </Grid>))}                  
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2,
                      backgroundColor: 'indigo',
                      '&:hover':{
                          backgroundColor:'#7e30b7' 
                         } }} disabled={!isFormValid}>
                    Add Card
                  </Button>
                </Box>
              </Box>
            </Container>
          )}
        </section></></>);
    }
