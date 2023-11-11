import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './LandingPage.css';
import Map from "./Map";
/* class that start with LP mean Landing Page*/


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
            });
    }, []);
    return (
        <>
      
        <section className="LP-body-container" >
            <header id="about-us">
            <h1 className="LP-main-title ">{card.title}</h1>
            <h2 className="LP-sub-title ">{card.subtitle}</h2>
            
            </header>
    
<br/><br/>
            <div className="LP-photos-container">
                <img className="LP-photo" src={card.imgUrl}/>
            </div>
<br /><br />
            <div>
                <h3 className="LP-description" id="about">{card.description}</h3>
            </div>
            
<br /><br />
          
            {/* <section className="LP-location">
            <Map id={id}/>
        </section> */}
            
<br /><br />
     <hr className="LP-hr" id="contact" />
            <footer className="LP-footer">
                <h1 className="LP-footer-headline">Contact Us</h1>
                <h1 className="LP-footer-secHeadLine">{card.title}</h1>
                <div className="LP-footer-contactWrapeer">
                <h4 className="LP-footer-txt"> Email : {card.email}</h4>
                <h4 className="LP-footer-txt"> Phone : {card.phone}</h4>
                <h4 className="LP-footer-txt">
                   Location : {card.country}, {card.city}, {card.street} {card.houseNumber}, {card.zip}
                </h4>
                </div>
            </footer>

    <a href='#up'>
        <div className="LP-up-button">
                    ⬆️
        </div>
    </a>
         
        </section>
        </>
        
    )
}


