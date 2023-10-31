import { useContext, useEffect, useState } from "react";
import CardComponent from "../cards/CardComponent";
import { GeneralContext } from "../App";

export default function HomePage() {
  const [allCards, setAllCard] = useState([]);
  const { setLoader, filteredCards ,setFilteredCards } = useContext(GeneralContext);

  useEffect(() => {
    fetch(`https://api.shipap.co.il/cards?token=d29611be-3431-11ee-b3e9-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setAllCard(data);
        setLoader(false);
      });
  }, []);

  return (
    <>
      <header>
      <h1>Plan Yout Next Trip Here</h1>
      <h3>Discover the World's Most Thrilling and Breathtaking Adventures!</h3>
      
      </header>
      <section className="container-cards">
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <CardComponent key={card.id} card={card} setAllCard={setFilteredCards} />
          ))
        ) : (
          <div>Results not found</div>
        )}
      </section>
    </>
  );
}