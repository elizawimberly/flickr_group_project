/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from "react";
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
// local files
import { thunkCreateSingleAlbum } from "../../../store/albumsReducer";
import { thunkReadAllPhotosByUser } from '../../../store/photosReducer'
import FooterAccount from "../../Footer/FooterAccount";
import './AlbumCreateForm.css'


/******************************* COMPONENT *******************************/
function AlbumCreateForm() {

    /****************** access store *******************/
    const sessionUser = useSelector(state => state.session.user)
    const userPhotos = useSelector(state => Object.values(state.photos.userPhotos))

    /****************** manage state *******************/
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [photos, setPhotos] = useState([])

    /************ reducer/API communication ************/
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(thunkReadAllPhotosByUser())
    }, [dispatch])

    /***************** handle events *******************/
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault()

        let errors = [];
        let newAlbum

        setSubmitted(true)

        if (!name) errors.push('You must enter a name between 2 and 5 characters.')
        if (!about) errors.push('You must enter a about between 35 and 500 characters.')

        if (errors.length >= 1)
            setValidationErrors(errors);
        if (errors.length <= 1 && validationErrors <= 1)
            newAlbum = await dispatch(thunkCreateSingleAlbum(name, about, photos.toString())
            ).catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setValidationErrors(data.errors)
            })
        console.log(newAlbum.id)
        if (errors.length <= 0) {
            setName('')
            setAbout('')
            history.push(`/albums/${newAlbum.id}`)
        }
    }

    /**************** render component *****************/
    if (!sessionUser) {
        history.push('/')
    }

    return (
        <>
        <div className='page-wrapper-container'>
            <div id="AlbumCreateForm-component">
                <div id="AlbumCreateForm-title">Create a New Album</div>

            <form onSubmit={onSubmit} className="album-form-container">

                <div className="album-form-top-sub-container">

                    <div className="album-form-top-left-sub-container">
                        <input
                            type='text'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder='Name'
                            minLength={2}
                            maxLength={50}
                            className="album-form-name"
                            required>
                        </input>

                        <textarea
                            type='textarea'
                            onChange={e => setAbout(e.target.value)}
                            value={about}
                            placeholder='Description'
                            minLength={25}
                            maxLength={500}
                            className="album-form-description"
                            required>
                        </textarea>

                        <button type='submit' id="photo-form-submit-button">Looks good</button>

                    </div>

                    <div className="album-form-top-right-sub-container">
                        <div id="photo-checklist-instructions"><p>Select which photos to add to the album</p></div>

                        <div className='photo-checklist-container'>

                                {userPhotos && userPhotos.map( photo => {

                                    if(!photo.albumId) {
                                        return (

                                            <div id={photo.id} className='photo-item-container'>
                                                <input
                                                    className='checkbox'
                                                    type='checkbox'
                                                    checked={photos.find(e => e === photo.id)}
                                                    onChange={()=> {
                                                        let currentPhotos = [...photos]
                                                        if (currentPhotos.find(e => e === photo.id)) {
                                                            let i = currentPhotos.findIndex(e => e === photo.id)
                                                            currentPhotos.splice(i, 1)
                                                        } else {
                                                            currentPhotos.push(photo.id)
                                                        }
                                                        setPhotos(currentPhotos)
                                                    }}
                                                    ></input>

                                                    <div
                                                        id={photos.find(e => e === photo.id) ? 'photo-checked' : 'photo-not-checked'}
                                                    >
                                                        <img
                                                            src={photo.url}
                                                            alt=''
                                                            className="photo-item-thumbnail"
                                                            key={photo.id}
                                                            // onClick={() => {
                                                                //     let currentPhotos = [...photos]
                                                                //     if (currentPhotos.find(e => e === photo.id)) {
                                                                //         let i = currentPhotos.findIndex(e => e === photo.id)
                                                                //         currentPhotos.splice(i, 1)
                                                                //     } else {
                                                                //         currentPhotos.push(photo.id)
                                                                //     }
                                                                //     setPhotos(currentPhotos)
                                                            // }}
                                                        ></img>
                                                    </div>

                                                <div className="photo-item-description">
                                                    <p className='photo-item-name'>{photo.name}</p>
                                                    <p className="photo-item-about">{photo.about}</p>
                                                </div>
                                            </div>
                                    )}
                                    else return <></>}
                                    )}

                        </div>

                            { validationErrors && submitted && (
                                <ul className='create-event-errors'>
                                    {validationErrors.map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                        ))}
                                </ul>
                            )}
                        </div>
                </div>

                {/* <div className="album-form-bottom-sub-container">
                    <div className="album-form-submit-container">
                        <button type='submit' id="photo-form-submit-button">Create album</button>
                    </div>
                </div> */}

            </form>
        </div>
    </div>
    <FooterAccount />
    </>
    )
}


export default AlbumCreateForm
