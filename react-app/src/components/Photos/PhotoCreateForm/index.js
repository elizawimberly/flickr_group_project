/******************************** IMPORTS ********************************/
// libraries
import React, {useEffect, useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import { thunkCreateSinglePhoto } from "../../../store/photosReducer";
import './PhotoCreateForm.css'
import { thunkReadAllAlbums } from '../../../store/albumsReducer'


/******************************* COMPONENT *******************************/
function PhotoCreateForm() {

    /****************** access store *******************/
    const sessionUser = useSelector(state => state.session.user);
    const userAlbums = useSelector(state => Object.values(state.albums.allAlbums))

    /************ key into pertinent values ************/
    const longDate = new Date();
    const year = longDate.getFullYear()
    let month = longDate.getMonth() + 1
    let day = longDate.getDate() + 1
    if(month < 10) month = `0${month}`
    if(day < 10) day = `0${Number(day)}`
    const date = `${year}-${month}-${day}`

    /****************** manage state *******************/
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [url, setUrl] = useState("");
    const [private_var, setPrivate_var] = useState(false);
    const [tags, setTags] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [takenOn, setTakenOn] = useState("")
    const [albumId, setAlbumId] = useState("")
    
 
    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(thunkReadAllAlbums())
    },[dispatch])

    /***************** handle events *******************/
    const history = useHistory()

    const handleSubmit = () => {
        let errors = [];
        if(!name) errors.push('Name needs to be between 2 and 50 characters.')
        if(!about) errors.push('About needs to be between 10 and 500 characters.')
        if(!url) errors.push('You must enter a valid url')

        if(errors.length >= 1)
            setValidationErrors(errors);
        else
            dispatch(thunkCreateSinglePhoto(name, about, url, takenOn, private_var, tags, albumId))

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

    /**************** render component *****************/
    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className='page-wrapper-container'>
            <div className="PhotoCreateForm-component">

                    <form

                        className="photo-form-container"

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


                        <div className="photo-form-top-sub-container">

                            <div className="photo-form-top-left-sub-container">

                                <label>
                                    <input
                                    className="inputFieldTypeText"
                                    id="input-photo-name"
                                    type="text"
                                    name="name"
                                    placeholder="Add a title"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    />

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
                                    className="inputFieldTypeText"
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
                                            <span className='album-dropdown-span'>Add to albums</span>
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

                                <div className='errors-container'>
                                    {validationErrors && validationErrors.map((error, ind) => (
                                        <div className='form-errors' key={ind}>{error}</div>
                                        ))}
                                </div>

                            </div>


                            <div className="photo-form-top-right-sub-container">
                                    {url && (
                                        <div className="view-uploaded-image">
                                        <img alt='' src={url}/>
                                    </div>
                                    )}
                            </div>

                    </div>
                </form>
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default PhotoCreateForm
