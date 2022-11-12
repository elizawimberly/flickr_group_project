import React from "react";
import { NavLink } from "react-router-dom";
import background from '../../assets/background-landing-no-session.jpg'
import './Landing.css'

function LandingNoSession() {



    return (
        <div className='page-wrapper-container'>

            <div className="background-image-container">
                <img className="background-image" src={background}></img>

                <h1>Find your inspiration</h1>
                <h2>Join the Flickr community, home to tens of billions of photos and 2 million groups.</h2>

                <NavLink to="/explore">
                <button id="explore-button" type="submit">Explore</button>
                </NavLink>
            </div>

        </div>
    )
}


export default LandingNoSession
