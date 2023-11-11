import React from 'react';
import "./About.css";

export default function About() {
    return (
        <>  
        <div style={{ textAlign: 'center' }}>
            <h1 className='main-title'>About Us</h1>
            <section className='container-about'>
            <div className='about-grid'>
            <div className='div1 txt'>
               <b>1.</b> Welcome to our world of adventure and excitement in the stunning Queenstown, New Zealand! At [Your Company Name], we're passionate about bringing you some of the most thrilling and awe-inspiring activities and experiences this breathtaking region has to offer.
            </div>

            <div className='div2 txt'>
            <b>2.</b>Our mission is to provide you with a one-of-a-kind experience, whether it's exploring the majestic landscapes of New Zealand, embarking on heart-pounding adventures like skydiving over Queenstown, or discovering the incredible activities this region has in store.
            </div>

            <div className='div3 txt'>
            <b>3.</b>We believe in making dreams come true, creating unforgettable memories, and turning everyday moments into extraordinary adventures. Our platform is your gateway to a world of exhilaration, discovery, and pure adrenaline, all set against the backdrop of this incredible destination.
            </div>

            <div className='div4 txt'>
            <b>4.</b>Join us on this journey and let's explore Queenstown's most exciting activities and adventures together. Your next thrilling adventure in this beautiful corner of the world awaits!
            </div>

            </div>
            </section>
        </div>
        </>
    )
}
