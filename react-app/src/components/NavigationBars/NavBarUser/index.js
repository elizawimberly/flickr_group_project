import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarUser.css";

function NavBarUser() {


    return (
        <div className='page-wrapper-container'>

            <div className='navigation-bar' id="navbar-user">
                <NavLink to='/photostream' exact={true}>
                    Photostream
                </NavLink>

                <NavLink to='/albums' exact={true}>
                    Albums
                </NavLink>
            </div>

        </div>
    )
}


export default NavBarUser
