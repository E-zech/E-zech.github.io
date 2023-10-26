import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NavbarLandingPage from "../components/NavbarLandingPage";

export default function LandingPage() {
    const [card, setCard] = useState({})
    const { id } = useParams();

 
        useEffect(() => {
        fetch(`https://api.shipap.co.il/cards/${id}?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setCard(data)
            });
    }, []);
   
    return (
        <>
      
        <section className="">
          
            <header>
            <h1>{card.title}</h1>
            <h3>{card.description}</h3>
            </header>

           
        </section>
        </>
        
    )
}


