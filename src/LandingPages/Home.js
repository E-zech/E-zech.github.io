import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './style.css';
import './FooterLandingPage.css';
import Map from "./Map";



export default function Home() {
    const [card, setCard] = useState({})
    const { id } = useParams();

 
        useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setCard(data);
                console.log(data);
            });
    }, []);
    return (
        <>
      
        <section className="body-container" id="about">
            <header id="about-us">
            <h1 className="main-title ">{card.title}</h1>
            <h2 className="sub-title ">{card.subtitle}</h2>
            
            </header>
    
<br></br>
            <div className="photos-container">
                <img src={card.imgUrl}/>
            </div>
            <h3 className="description" id="about">{card.description}</h3>
<br /><br />
          
               <section className="location">
            <Map id={id}/>
            <h4>{card.country}</h4>
            <h4>{card.state}</h4>
            <h4>{card.city}</h4>
            <h4>{card.street}</h4>
            <h4>{card.houseNumber}</h4>
            <h4>{card.zip}</h4>
        </section>
            
<br /><br />
     
            <footer className="footer">
                <h1 className="footer-headline">Contact Us</h1>
                <h1 className="footer-secHeadLine">{card.title}</h1>
                <div className="footer-contactWrapeer">
                <h4 className="footer-txt"> Email : {card.email}</h4>
                <h4 className="footer-txt"> Phone : {card.phone}</h4>
                <h4 className="footer-txt">
                    {card.country}, {card.city}, {card.street} {card.houseNumber}, {card.zip}
                </h4>
                </div>
            </footer>
        </section>
        </>
        
    )
}


