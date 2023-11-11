import { useContext, useEffect, useState } from "react";
import CardComponent from "../cards/CardComponent";
import { GeneralContext } from "../App";
import './HomePage.css';
import NotFound from "../components/NotFound";

export default function HomePage() {
  const [allCards, setAllCard] = useState([]);
  const { loader, setLoader, filteredCards ,setFilteredCards } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setAllCard(data);
      }).finally(()=> setLoader(false))
  }, []);

  return (
    <>
      <header className="header body-color"> 
      <h1 className="main-title">Queenstown Activities</h1>
      <h3 className="sec-title">Explore Queenstown's Most Thrilling and Breathtaking Adventures !</h3>
      </header>
      <section className="container-cards">
                {loader ? (
                    <h1>Loading...</h1>
                ) : (
                    <div className="grid-cards">
                        {filteredCards.length > 0 ? (
                            filteredCards.map(card => (
                                <CardComponent key={card.id} card={card} setAllCard={setFilteredCards} />
                            ))
                        ) : (
                            <NotFound />
                        )}
                    </div>
                )}
            </section>
    </>
  );
}