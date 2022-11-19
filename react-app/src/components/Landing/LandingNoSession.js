import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import background from '../../assets/background-landing-no-session.jpg'
import img1 from '../../assets/carousel-images/landing-carousel-1.jpg'
import img2 from '../../assets/carousel-images/landing-carousel-2.jpeg'
import img3 from '../../assets/carousel-images/landing-carousel-3.jpeg'
import img4 from '../../assets/carousel-images/landing-carousel-4.jpeg'
import img5 from '../../assets/carousel-images/landing-carousel-5.jpeg'
import img6 from '../../assets/carousel-images/landing-carousel-6.jpeg'
import img7 from '../../assets/carousel-images/landing-carousel-7.jpeg'
import img8 from '../../assets/carousel-images/landing-carousel-8.jpeg'
import img9 from '../../assets/carousel-images/landing-carousel-9.jpeg'
import img10 from '../../assets/carousel-images/landing-carousel-10.jpeg'
import img11 from '../../assets/carousel-images/landing-carousel-11.jpeg'
import img12 from '../../assets/carousel-images/landing-carousel-12.jpeg'
import img13 from '../../assets/carousel-images/landing-carousel-13.jpeg'
import img14 from '../../assets/carousel-images/landing-carousel-14.jpeg'
import img15 from '../../assets/carousel-images/landing-carousel-15.jpeg'
import img16 from '../../assets/carousel-images/landing-carousel-16.jpeg'
import img17 from '../../assets/carousel-images/landing-carousel-17.jpeg'
import { useState } from "react";
import './Landing.css'
import FooterMain from "../Footer/FooterMain";
// import { carousel } from '../../component-resources'



function LandingNoSession() {
    // let landingNoSession = true;
    let [img, setImg] = useState(background)
    let [count, setCount] = useState(0)


    const carousel = useCallback(() => {
        const images = [
            img1,
            img2,
            img3,
            img4,
            img5,
            img6,
            img7,
            img8,
            img9,
            img10,
            img11,
            img12,
            img13,
            img14,
            img15,
            img16,
            img17
        ]
        setImg(images[count])
        setCount(count + 1)
        if(count + 1 === images.length ) {
            setCount(0)
        }
        },[count])

    useEffect(() => {
        const interval = setInterval(() => carousel(), 5000);
        return () => clearInterval(interval);
    }, [img, count, carousel]);


    return (
        <>
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
            <FooterMain />
        </>
    )
}


export default LandingNoSession
