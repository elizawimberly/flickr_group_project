import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

function TagCreateForm() {

    const dispatch = useDispatch();

    const photosState = useSelector((state) => state.photos);

    const photo = photosState.singlePhotoDetails;


    return (
        <div className='page-wrapper-container'>
            <p>Tag Create Form</p>

        </div>
    )
}


export default TagCreateForm
