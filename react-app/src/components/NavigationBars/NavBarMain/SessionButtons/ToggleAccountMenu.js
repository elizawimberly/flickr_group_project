/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// local files
import './SessionButtons.css'
import profilePic from "../../../../assets/buddyicon.png"
import LogoutButton from "./LogoutButton";


/******************************* COMPONENT *******************************/
function ToggleAccountMenu({ user }) {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session)

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
                    Welcome!
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
