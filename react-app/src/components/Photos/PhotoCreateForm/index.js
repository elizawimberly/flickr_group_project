/******************************** IMPORTS ********************************/
// libraries
import React, {useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import thunkReadAllPhotosByUser from "../../../store/photosReducer";
import './PhotoCreateForm.css'


/******************************* COMPONENT *******************************/
function PhotoCreateForm() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [albums, setAlbums] = useState("");
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [url, setUrl] = useState("");
    // const [private, setPrivate] = useState("");
    const [tags, setTags] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);


    /**************** render component *****************/
    // if (!sessionState.user.id) return <Redirect to="/" />;

    return (
        <div className='page-wrapper-container'>

            <div className="PhotoCreateForm-component">

                <div className="photo-form-container">

                    <form
                        className="create-spot-form"
                        // onSubmit={handleSubmit}
                        >

                        <div className="mock-upload-navbar">
                        <button
                            className="photo-submit-button"
                            type="submit"
                            // onSubmit={handleSubmit}
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
                            onChange={(e) => setName(e.target.value)}
                            value={about}
                            />
                        </label>

                        <label>
                            <input
                            className="inputFieldTypeText"
                            type="text"
                            name="tags"
                            placeholder="Add tags"
                            onChange={(e) => setName(e.target.value)}
                            value={tags}
                            />
                        </label>

                        <label>
                            <input
                            className="inputFieldTypeText"
                            type="text"
                            name="albums"
                            placeholder="Add to albums"
                            onChange={(e) => setName(e.target.value)}
                            value={albums}
                            />
                        </label>

                        </div>
                    </form>

                    <div className="view-uploaded-image-section">
                        <div className="view-uploaded-image">
                            <img src="https://www.rxwallpaper.site/wp-content/uploads/pusheen-lol-pinterest-pusheen-pusheen-cat-and-cat.jpg"></img>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default PhotoCreateForm
