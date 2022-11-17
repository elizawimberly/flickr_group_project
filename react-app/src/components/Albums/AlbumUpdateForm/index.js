import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import { thunkUpdateSingleAlbum, thunkReadSingleAlbumDetails } from "../../../store/albumsReducer";
import './AlbumUpdateForm.css'
import { thunkReadAllPhotosByUser } from '../../../store/photosReducer'

function AlbumUpdateForm() {
    const sessionUser = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums.singleAlbumDetails)
    const userPhotos = useSelector(state => Object.values(state.photos.userPhotos))
    const albumPhotos = Object.values(album.Photos)

    const [name, setName] = useState(null)
    const [about, setAbout] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    const [photos, setPhotos] = useState(null)
    const [loaded, setLoaded] = useState(false)
    
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    const { albumId } = params

    if (!sessionUser) {
        history.push('/')
    }

    console.log('PHOTOS', photos)

    useEffect(()=> {
        dispatch(thunkReadSingleAlbumDetails(albumId))
    }, [dispatch])

    useEffect(()=> {
        dispatch(thunkReadAllPhotosByUser())
        console.log('------album-----', album)
        if(album && albumPhotos){
            if(name === null || name === undefined) setName(album.name)
            if(about === null || about === undefined) setAbout(album.about)
            let photoList = albumPhotos.map(photo => photo.id)
            console.log(photoList)
            console.log('PHOTOTS HIT IN IF BLOCK', photos)
            setPhotos(photoList)
            setLoaded(true)
        }
    },[dispatch, album, albumId, name, about, loaded])

    const onSubmit = (e) => {
        e.preventDefault()

        let errors = [];

        setSubmitted(true)

        if(!name) errors.push('You must enter a name between 2 and 5 characters.')
        if(!about) errors.push('You must enter a about between 35 and 500 characters.')
        if(errors.length >= 1) 
            setValidationErrors(errors);
        else
            dispatch(thunkUpdateSingleAlbum(name, about, photos.toString(), albumId))
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
            <h1>AlbumUpdateForm component waiting to be built!</h1>
            {loaded && (
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
                <div className='wrapper'>
                {userPhotos && (
                    <div className='album-photo-wrapper'>
                        {userPhotos.map(photo => {
                            if ( photo.albumId === +albumId || !photo.albumId ){
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
                            }
                           }
                        )}
                     </div>
                )}
                </div>
                <button type='submit'>Create Album</button>

               </form>  
            )}
           
        </div>
    )
}


export default AlbumUpdateForm
