/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useSelector } from "react-redux";
// local files
import LandingNoSession from "./LandingNoSession";
import './Landing.css'
import Explore from "../Photos/Explore"


/******************************* COMPONENT *******************************/
function Landing() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session)

    /************* conditional components **************/
    let landingComponent = sessionState.user ? <Explore /> : <LandingNoSession />


    /**************** render component *****************/
    return (
      <>
        <div className='page-wrapper-container'>

          {/* <div className="landing-component"> */}
            { landingComponent }
          {/* </div> */}

        </div>
      </>
    )
}

export default Landing
