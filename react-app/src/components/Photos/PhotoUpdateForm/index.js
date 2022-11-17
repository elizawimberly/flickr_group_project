import React from "react";
import {thunkReadAllPhotos, thunkReadSinglePhotoDetails, thunkUpdateSinglePhoto} from '../../../store/photosReducer'
import {useEffect, useState} from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllAlbums } from "../../../store/albumsReducer";


function PhotoUpdateForm() {
    const sessionUser = useSelector(state => state.session.user);
    const userAlbums = useSelector(state => Object.values(state.albums.allAlbums))
    const photo = useSelector(state => state.photos.singlePhotoDetails)
    /************ reducer/API communication ************/
    const history = useHistory()
    const dispatch = useDispatch();
    const params = useParams()
    const {photoId} = params

    const [name, setName] = useState(null);
    const [about, setAbout] = useState(null);
    const [url, setUrl] = useState(null);
    const [private_var, setPrivate_var] = useState(false);
    const [tags, setTags] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [takenOn, setTakenOn] = useState(null)
    const [albumId, setAlbumId] = useState(null)
    const [loaded, setLoaded] = useState(false)

    const longDate = new Date();
    const year = longDate.getFullYear()
    let month = longDate.getMonth() + 1
    let day = longDate.getDate() + 1
    if(month < 10) month = `0${month}`
    if(day < 10) day = `0${Number(day + 1)}`
    const date = `${year}-${month}-${day}`
   

    useEffect(()=>{
        dispatch(thunkReadAllAlbums())
    },[dispatch])

    useEffect(()=> {
        setLoaded(true)
        dispatch(thunkReadSinglePhotoDetails(photoId))
        if(photo.name){
            let tag_array = Object.values(photo.Tags)
            let tag_names = tag_array.map(tag => tag.tag)
            if(name === null || name === undefined) setName(photo.name)
            if(about === null || about === undefined) setAbout(photo.about)
            if(url === null || url === undefined) setUrl(photo.url)
            if(tags === null || tags === undefined) setTags(tag_names.join(' '))
            if(albumId === null || albumId === undefined) setAlbumId(photo.albumId)
            let takenDate = new Date(photo.takenOn)
            let takenYear = takenDate.getFullYear()
            let takenMonth = takenDate.getMonth()
            let takenDay = takenDate.getDate()
            if(takenMonth < 10) takenMonth = `0${takenMonth}`
            if(takenDay < 10) takenDay = `0${takenDay}`
            if(takenOn === null || takenOn === undefined) setTakenOn(`${takenYear}-${takenMonth}-${takenDay}`)
        }
    },[dispatch, photo.name, name, about, url, tags, albumId, photoId, takenOn])

    const handleSubmit = () => {
        let errors = [];
        if(!name) errors.push('Name needs to be between 2 and 50 characters.')
        if(!about) errors.push('About needs to be between 10 and 500 characters.')
        if(!url) errors.push('You must enter a valid url')
        if(errors.length >= 1) 
            setValidationErrors(errors);
        else
            dispatch(thunkUpdateSinglePhoto(photoId, name, about, url, takenOn, private_var, tags, albumId))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) errors.push(data.errors)
                setValidationErrors(errors)
            })
        
        if(errors.length <= 0) {
            setName('')
            setAbout('')
            setUrl('')
            setTags('')
            history.push('/')
        }
    }


    return (
        <div className='page-wrapper-container'>
              <div className='page-wrapper-container'>
                {photo.name && loaded && (
                 <div className="PhotoCreateForm-component">

                    <div className="photo-form-container">

                        <form
                            className="create-spot-form"
                            onSubmit={handleSubmit}
                            >

                            <div className="mock-upload-navbar">
                            <button
                                className="photo-submit-button"
                                type="submit"
                                disabled={!!validationErrors.length}
                                >
                                Upload 1 Photo
                                </button>
                            </div>

                            <div className="input-section">

                            <div>Editing 1 photo:</div>

                            <label>
                                <input
                                className="inputFieldTypeText"
                                type="text"
                                name="name"
                                placeholder="Add a title"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                />
                            </label>

                            <label>
                                <input
                                className="inputFieldTypeText"
                                type="text"
                                name="about"
                                placeholder="Add a description"
                                onChange={(e) => setAbout(e.target.value)}
                                value={about}
                                />
                            </label>


                            <label>
                                <input
                                className="inputFieldTypeText"
                                type="text"
                                name="url"
                                placeholder="Add a photo url"
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}
                                />
                            </label>

                            <label>
                                <input 
                                type="date" 
                                id="takenOn" 
                                name="takenOn"
                                onChange={(e) => setTakenOn(e.target.value)}
                                value={takenOn}
                                max={date}/>
                            </label>


                            <label>
                                <input
                                className="inputFieldTypeText"
                                type="text"
                                name="tags"
                                placeholder="Add tags"
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                                />
                            </label>

                            <label>
                            {userAlbums.length >= 1 && (
                                <div className='album-dropdown'>
                                    <span className='album-dropdown-span'>Select a Album to add your photo to.</span>
                                    <div className='dropdown-content'>
                                        {userAlbums.map(album => {
                                            return (
                                                <div 
                                                id={album.id} 
                                                className={albumId === album.id ? 'album-selected' : 'album-not-selected'}
                                                onClick={()=> setAlbumId(album.id)}
                                                >
                                                    <div>{album.name} photos {album.Photos.length}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                
                            { userAlbums.length <= 0 && (
                                <>
                                    <div>Current User has no albums</div>
                                </>
                            )}  
                            </label>
                            
                            </div>
                        </form>

                        <div className="view-uploaded-image-section">
                            {url && (
                                <div className="view-uploaded-image">
                                <img alt='' src={url}/>
                            </div>
                            )}
                        </div>

                    </div>


                </div>   
                )}    
                
                </div>
        </div>
    )
}


export default PhotoUpdateForm
