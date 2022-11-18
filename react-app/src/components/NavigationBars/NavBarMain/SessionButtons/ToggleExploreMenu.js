/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// local files
import './SessionButtons.css'


/******************************* COMPONENT *******************************/
function ToggleExploreMenu() {

    /****************** access store *******************/

    /************ reducer/API communication ************/

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
        <p onClick={openMenu}>Explore</p>


        {showMenu && (

        <div className="dropdown-menu" id="features-dropdown-menu">

            <div>
                <NavLink to='/explore' exact={true}>
                    Recent Photos
                </NavLink>
            </div>

            {/* <div>
                <NavLink to='/trending' exact={true}>
                    Read All Tags Component
                </NavLink>
            </div> */}

        </div>
        )}

        </>
    );
}


/******************************** EXPORTS ********************************/
export default ToggleExploreMenu;
