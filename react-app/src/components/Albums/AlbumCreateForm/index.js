import React, { useEffect } from "react";
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import { thunkCreateSingleAlbum } from "../../../store/albumsReducer";
import { thunkReadAllPhotosByUser } from '../../../store/photosReducer'
import './AlbumCreateForm.css'

function AlbumCreateForm() {
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [photos, setPhotos] = useState([])
    
    const history = useHistory()
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const userPhotos = useSelector(state => Object.values(state.photos.userPhotos))

    if (!sessionUser) {
        history.push('/')
    }

    useEffect(()=>{
        dispatch(thunkReadAllPhotosByUser())
    },[dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        let errors = [];

        setSubmitted(true)

        if(!name) errors.push('You must enter a name between 2 and 5 characters.')
        if(!about) errors.push('You must enter a about between 35 and 500 characters.')
        if(errors.length >= 1) 
            setValidationErrors(errors);
        else
            dispatch(thunkCreateSingleAlbum(name, about, photos.toString()))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setValidationErrors(data.errors)
            })
        
        if(errors.length <= 0) {
            setName('')
            setAbout('')
            history.push('/')
        }
    }

    return (


        <div className='page-wrapper-container'>
            <h1>AlbumCreateForm component waiting to be built!</h1>
            <form onSubmit={onSubmit}>
                <div>
                    { validationErrors && submitted && (
                        <ul className='create-event-errors'>
                            {validationErrors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))} 
                        </ul>
                    )}
                </div>
                <label>Name</label>
                <input type='text' onChange={e => setName(e.target.value)} value={name} placeholder='Enter a Name' minLength={2} maxLength={50} required></input>
                <label>About</label>
                <input type='text' onChange={e => setAbout(e.target.value)} value={about} placeholder='Enter a Description' minLength={25} maxLength={500} required></input>
                <label>Choose Photos</label>
                <div>
                {userPhotos && (
                    <div className='album-photo-wrapper'>
                        {userPhotos.map(photo => {
                            if(!photo.albumId){
                           return ( <div id={photo.id} className='album-photo-container'>
                           <input className='Checkbox' type='checkbox' onChange={()=> {
                                let currentPhotos = [...photos]
                                if(currentPhotos.find(e => e === photo.id)) {
                                    let i = currentPhotos.findIndex(e => e === photo.id)
                                    currentPhotos.splice(i, 1)
                                } else {
                                    currentPhotos.push(photo.id)
                                }
                                setPhotos(currentPhotos)
                           }} checked={photos.find(e => e === photo.id)}/>
                           <img src={photo.url} alt='' className={photos.find(e => e === photo.id) ? 'checked' : 'not-checked'} key={photo.id} onClick={() => {
                           let currentPhotos = [...photos]
                           if(currentPhotos.find(e => e === photo.id)) {
                               let i = currentPhotos.findIndex(e => e === photo.id)
                               currentPhotos.splice(i, 1)
                           } else {
                               currentPhotos.push(photo.id)
                           }
                           setPhotos(currentPhotos)
                           }} />
                      </div>
                            )
                            }}
                        )}
                     </div>
                )}
                </div>
                <button type='submit'>Create Album</button>
            </form>
        </div>
    )
}


export default AlbumCreateForm
