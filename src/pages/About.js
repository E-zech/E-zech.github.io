import React from 'react';
import "./About.css";
import "./AboutMediaQ.css";

export default function About() {
    return (
        <>
            <div>
                <h1 className='main-title'>About Us</h1>
                <br />

                <section className='container-about'>
                    <div className='about-grid'>
                        <div className='div1 txt'>
                            Welcome to our world of adventure and excitement in the stunning Queenstown, New Zealand! At <b>Queenstown Activities</b>, we're passionate about bringing you some of the most thrilling and awe-inspiring activities and experiences this breathtaking region has to offer.
                        </div>

                        <div className='div2 txt'>
                            Our mission is to provide you with a one-of-a-kind experience, whether it's exploring the majestic landscapes of New Zealand, embarking on heart-pounding adventures like skydiving over Queenstown, or discovering the incredible activities this region has in store.
                        </div>

                        <div className='div3 txt'>
                            We believe in making dreams come true, creating unforgettable memories, and turning everyday moments into extraordinary adventures. Our platform is your gateway to a world of exhilaration, discovery, and pure adrenaline, all set against the backdrop of this incredible destination.
                        </div>

                        <div className='div4 txt'>
                            Join us on this journey and let's explore Queenstown's most exciting activities and adventures together. Your next thrilling adventure in this beautiful corner of the world awaits!
                        </div>

                        <div className="div5 bgc">🚁</div>
                        <div className="div6 bgc">🚢</div>
                        <div className="div7 bgc">🧳</div>
                        <div className="div8 bgc">✈️</div>

                    </div>
                </section>

            </div>
        </>
    )
}
