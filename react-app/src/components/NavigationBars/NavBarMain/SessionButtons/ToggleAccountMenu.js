/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// local files
import './SessionButtons.css'
import profilePic from "../../../../assets/buddyicon.png"
import LogoutButton from "./LogoutButton";
import { generateInternationalGreeting } from "../../../../component-resources";


/******************************* COMPONENT *******************************/
function ToggleAccountMenu({ user }) {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session)

    /************ key into pertinent values ************/
    const userName = sessionState.user.first_name
    let greeting = generateInternationalGreeting()


    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    /***************** handle events *******************/
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    /**************** render component *****************/
    return (
        <>
        <img src={profilePic} className="navBar-profile-pic" onClick={openMenu}></img>

        {showMenu && (
            <div className="dropdown-menu" id="account-dropdown-menu">

                <div id="welcome-user">
                    <div id="menu-greeting">
                        {greeting.greeting}, {userName}!
                    </div>
                    <div id="menu-language">
                        <p>Now you know how to greet people</p>
                        <p>in {greeting.language}</p>
                    </div>
                </div>

                <div id="logout-button">
                    <LogoutButton />
                </div>

            </div>
        )}

        </>
    );
}


/******************************** EXPORTS ********************************/
export default ToggleAccountMenu;
