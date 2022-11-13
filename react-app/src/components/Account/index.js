import React from "react";
import coverphoto from '../../assets/coverphoto.jpg'
import './Account.css'
import profilePic from '../../assets/buddyicon.png';

function Account() {

    return (
        <div className='page-wrapper-container'>
            <div className="account-component" style={{backgroundImage:`url(${coverphoto})`}}>

                {/* <div className="account-coverphoto-container">
                    <img className="account-coverphoto" src={coverphoto}></img>
                </div> */}


                <div className="account-info-container">
                    <div className="account-info-left-container">
                        <div className="account-profile-pic-container">
                            <img src={profilePic} className="account-profile-pic"></img>
                        </div>
                        <div className="account-profile-names-container">
                            <h1 style={{color:"white"}}>First Last</h1>
                            <p style={{color:"white"}}>username</p>
                        </div>
                    </div>

                    <div className="account-info-right-container">
                        <div style={{color:"white"}}># Photos</div>
                        <div style={{color:"white"}}>Joined YYYY</div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Account
