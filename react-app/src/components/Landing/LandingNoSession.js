import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import background from '../../assets/background-landing-no-session.jpg'
import img1 from '../../assets/carousel-images/landing-carousel-1.jpg'
import img2 from '../../assets/carousel-images/landing-carousel-2.jpeg'
import img3 from '../../assets/carousel-images/landing-carousel-3.jpeg'
import img4 from '../../assets/carousel-images/landing-carousel-4.jpeg'
import img5 from '../../assets/carousel-images/landing-carousel-5.jpeg'
import img6 from '../../assets/carousel-images/landing-carousel-6.jpeg'
import img7 from '../../assets/carousel-images/landing-carousel-7.jpeg'
import { useState } from "react";
import './Landing.css'



function LandingNoSession() {
    // let landingNoSession = true;
    let [img, setImg] = useState(background)
    let [count, setCount] = useState(0)

    function carousel() {
        const images = [
            img1,
            img2,
            img3,
            img4,
            img5,
            img6,
            img7,           
        ]
        setImg(images[count])
        setCount(count + 1)
        if(count + 1 === images.length ) {
            clearInterval(carouselSet)
            setCount(0)
        }
        }

    let carouselSet = setInterval(carousel, 5000)


    return (
        <div className='page-wrapper-container'>
            {img && (
                <div>
                    <div className="background-image-container">
                <img className="background-image" src={img} alt=''></img>
            </div>


            <div className="landing-no-session-component">
                <div className="landing-no-session-text-box-container">
                    <h1>Find your inspiration.</h1>
                    <h2>Join the Flare community, home to tens of billions of photos and 2 million groups.</h2>

                    <NavLink to="/explore">
                    <button id="landing-explore-button" type="submit">Explore</button>
                    </NavLink>
                </div>
            </div> 
                </div>
            )}
           

        </div>
    )
}


export default LandingNoSession
