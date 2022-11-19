/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// local files
import {
  thunkUpdateSingleAlbum,
  thunkReadSingleAlbumDetails,
} from "../../../store/albumsReducer";
import { thunkReadAllPhotosByUser } from "../../../store/photosReducer";
import "./AlbumUpdateForm.css";
import FooterAccount from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function AlbumUpdateForm() {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums.singleAlbumDetails);
  const userPhotos = useSelector((state) =>
    Object.values(state.photos.userPhotos)
  );
  const albumPhotos = Object.values(album.Photos);

  /************ key into pertinent values ************/
  const params = useParams();
  const { albumId } = params;

  /****************** manage state *******************/
  const [name, setName] = useState(null);
  const [about, setAbout] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [photos, setPhotos] = useState(null);
  const [loaded, setLoaded] = useState(false);

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  if(photos === null || photos === undefined) {
    let photoList = albumPhotos.map((photo) => photo.id);
    setPhotos(photoList);
  }

  useEffect(() => {
    dispatch(thunkReadSingleAlbumDetails(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    if (album && albumPhotos) {
      if (name === null || name === undefined) setName(album.name);
      if (about === null || about === undefined) setAbout(album.about);
      setLoaded(true);
    }
  }, [album, albumId, name, about, loaded, albumPhotos]);

  useEffect(()=> {
    dispatch(thunkReadAllPhotosByUser());
  }, [dispatch])

  /***************** handle events *******************/
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    setSubmitted(true);

    if (!name) errors.push("You must enter a name between 2 and 5 characters.");
    if (!about)
      errors.push("You must enter a about between 5 and 500 characters.");
    if (errors.length >= 1) setValidationErrors(errors);
    else
      dispatch(
        thunkUpdateSingleAlbum(name, about, photos.toString(), albumId)
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });

    if (errors.length <= 0) {
      setName("");
      setAbout("");
      history.push(`/albums/${albumId}`);
    }
  };

  /**************** render component *****************/
  if (!sessionUser) {
    history.push("/");
  }

  return (
    <>
    <div className="page-wrapper-container">
      <div id="AlbumCreateForm-component">
        <div id="AlbumCreateForm-title">Editing {album.name}</div>

        {loaded && (
          <form onSubmit={onSubmit} className="album-form-container">
            <div className="album-form-top-sub-container">
              <div className="album-form-top-left-sub-container">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Name"
                  minLength={2}
                  maxLength={50}
                  className="album-form-name"
                  required={true}
                  ></input>

                <textarea
                  type="textarea"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  placeholder="Description"
                  minLength={25}
                  maxLength={500}
                  className="album-form-description"
                  required
                  ></textarea>

                <button type="submit" id="photo-form-submit-button">
                  Looks good
                </button>
              </div>

              <div className="album-form-top-right-sub-container">
                <div id="photo-checklist-instructions">
                  <p>Select which photos to add to the album</p>
                </div>

                <div className="photo-checklist-container">
                  {userPhotos &&
                    userPhotos.map((photo) => {
                      if (photo.albumId === +albumId || !photo.albumId) {
                        return (
                          <div id={photo.id} className="photo-item-container">
                            <input
                              className="checkbox"
                              type="checkbox"
                              checked={photos.find((e) => e === photo.id)}
                              onChange={() => {
                                let currentPhotos = [...photos];
                                if (currentPhotos.find((e) => e === photo.id)) {
                                  let i = currentPhotos.findIndex(
                                    (e) => e === photo.id
                                    );
                                    currentPhotos.splice(i, 1);
                                  } else {
                                    currentPhotos.push(photo.id);
                                  }
                                  setPhotos(currentPhotos);
                                }}
                                ></input>

                            {/* <div> */}
                              <img
                                src={photo.url}
                                alt=""
                                className="photo-item-thumbnail"
                                id={
                                  photos.find((e) => e === photo.id)
                                  ? "photo-checked"
                                  : "photo-not-checked"
                                }
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
                            {/* </div> */}

                            <div className="photo-item-description">
                              <p className="photo-item-name">{photo.name}</p>
                              <p className="photo-item-about">{photo.about}</p>
                            </div>
                          </div>
                        );
                      }
                    else return <></>
                    })}
                </div>

                {validationErrors && submitted && (
                  <ul className="create-event-errors">
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
        )}
      </div>
    </div>
    <FooterAccount />
    </>
  );
}

export default AlbumUpdateForm;
