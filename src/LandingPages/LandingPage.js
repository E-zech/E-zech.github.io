import { useContext, useEffect, useState } from "react";
import { GeneralContext } from '../App';
import { useParams } from "react-router-dom"
import LPNavbar from "./LPNavbar";
import './LandingPage.css';
import './LPNabvbar.css';
import './LPFooter.css';
import './LandingPageMediaQ.css';

export default function LandingPage() {
    const [card, setCard] = useState({})
    const { id } = useParams();
    const { setLoader} = useContext(GeneralContext);

        useEffect(() => {
            setLoader(true);
        fetch(`https://api.shipap.co.il/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setCard(data);
            }).finally(()=> setLoader(false))
    }, []);

    

return (
<>
<LPNavbar card={card}/>

<section className="LP-body-container">
    <header>
        <h1 className="LP-main-title ">{card.title}</h1>
        <h2 className="LP-sub-title ">{card.subtitle}</h2>
    </header>
    <br/><br/>
    
    <div className="LP-photos-container">
        <img className="LP-photo" src={card.imgUrl}/>
    </div>
    <br /><br />
    
    <div className="LP-description">
        <h1 className="LP-description-headline">A little bit about {card.title}</h1>
        <h3 className="LP-description-txt">{card.description}</h3>
        <h4 className="LP-description-bottomline">For more information please contact us ⬇️</h4>
    </div>    
    <br /><br />

    <hr className="LP-hr"/>

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

    <a href="#up">
        <div className="LP-up-button">⬆️</div>
    </a>
   
</section>
</>        
)
}


