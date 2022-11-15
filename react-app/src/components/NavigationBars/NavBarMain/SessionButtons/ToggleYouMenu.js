/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// local files
import './SessionButtons.css'


/******************************* COMPONENT *******************************/
function ToggleYouMenu({ user }) {

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
        <p onClick={openMenu}>You</p>


        {showMenu && (

        <div className="dropdown-menu" id="features-dropdown-menu">


            <div id="account-listings-button">
                <NavLink to='/photostream' exact={true}>
                    Photostream
                </NavLink>
            </div>

            <div id="account-listings-button">
                <NavLink to='/albums' exact={true}>
                    Albums
                </NavLink>
            </div>



        </div>
        )}

        </>
    );
}


/******************************** EXPORTS ********************************/
export default ToggleYouMenu;
