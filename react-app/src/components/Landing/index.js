import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LandingNoSession from "./LandingNoSession";
import LandingSession from "./LandingSession";
import './Landing.css'

function Landing() {

    const sessionState = useSelector(state => state.session)
    // console.log(sessionState)


    return (
        <div className='page-wrapper-container'>

          <NavLink to="/landing/no-session">
            <button type="submit">Landing No Session</button>
          </NavLink>

          <NavLink to="/landing/session">
            <button type="submit">Landing Session</button>
          </NavLink>

        </div>
    )
}

export default Landing
