import React from "react";
import coverphoto from '../../assets/coverphoto.jpg'
import './Account.css'
import profilePic from '../../assets/buddyicon.png';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState} from 'react';
import { thunkReadAllPhotos } from "../../store/photosReducer";

function Account() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user )
    const photos = useSelector(state => Object.values(state.photos.allPhotos))

    console.log(photos)
    
    useEffect(()=> {
        dispatch(thunkReadAllPhotos())
    },[dispatch])


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
                            {/* <h1 style={{color:"white"}}>{sessionUser.first_name} {sessionUser.last_name}</h1>
                            <p style={{color:"white"}}>{sessionUser.username}</p> */}
                        </div>
                    </div>

                    <div className="account-info-right-container">
                        <div style={{color:"white"}}>
                            { photos && (
                                <div>
                                    {photos.map(photo => {
                                        <img id={photo.id} src={photo.url} alt=''/>
                                    })}
                                </div>
                            )} 
                        </div>
                        <div style={{color:"white"}}>Joined 2022</div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Account
