// photoupdateform

import React from "react";
import {
  thunkReadSinglePhotoDetails,
  thunkUpdateSinglePhoto,
} from "../../../store/photosReducer";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllAlbums, thunkReadSingleAlbumDetails } from "../../../store/albumsReducer";
import "./PhotoUpdateForm.css";
import FooterAccount from "../../Footer/FooterAccount";

function PhotoUpdateForm() {

  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);
  const album = useSelector((state)=> state.albums.singleAlbumDetails)
  const userAlbums = useSelector((state) =>
    Object.values(state.albums.allAlbums)
  );
  const photo = useSelector((state) => state.photos.singlePhotoDetails);
  /************ reducer/API communication ************/
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { photoId } = params;

  const [name, setName] = useState(null);
  const [about, setAbout] = useState(null);
  const [url, setUrl] = useState(null);
  const [checkUrl, setCheckUrl] = useState("");
  const [private_var] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [takenOn, setTakenOn] = useState(null);
  const [albumId, setAlbumId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [dropDown, setDropDown] = useState('album-dropdown-hide')
  const [albumName, setAlbumName] = useState(null)

  const longDate = new Date();
  const year = longDate.getFullYear();
  let month = longDate.getMonth() + 1;
  let day = longDate.getDate() + 1;
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${Number(day + 1)}`;
  const date = `${year}-${month}-${day}`;


  useEffect(() => {
    dispatch(thunkReadAllAlbums());
    if(albumId){
     dispatch(thunkReadSingleAlbumDetails(albumId))
    }
  }, [dispatch, albumId]);

  useEffect(() => {
    setLoaded(true);
    dispatch(thunkReadSinglePhotoDetails(photoId));
    if(album){
      if (albumName === null || albumName === undefined) setAlbumName(album.name)
    }
    if (photo.name) {
      if (name === null || name === undefined) setName(photo.name);
      if (about === null || about === undefined) setAbout(photo.about);
      if (url === null || url === undefined) setUrl(photo.url);
      if (albumId === null || albumId === undefined) setAlbumId(photo.albumId);
      let takenDate = new Date(photo.takenOn);
      let takenYear = takenDate.getFullYear();
      let takenMonth = takenDate.getMonth() + 1;
      let takenDay = takenDate.getDate() + 1;
      if (takenMonth < 10) takenMonth = `0${takenMonth}`;
      if (takenDay < 10) takenDay = `0${takenDay}`;
      if (takenOn === null || takenOn === undefined)
        setTakenOn(`${takenYear}-${takenMonth}-${takenDay}`);
    }
    console.log(takenOn)
  }, [dispatch, photo.name, name, about, url, albumId, photoId, takenOn, album, albumName, photo.about, photo.albumId, photo.takenOn, photo.url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    console.log('TAKENON DATE', takenOn)
    if (!name) errors.push("Name needs to be between 2 and 50 characters.");
    if (!about) errors.push("About needs to be between 10 and 500 characters.");
    if (!url) errors.push("You must enter a valid url");
    if ( !url || checkUrl === "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png") errors.push("You must enter a valid url");
    if (errors.length >= 1) setValidationErrors(errors);
    if (errors.length <= 1 && validationErrors <= 1) {
      dispatch(
        thunkUpdateSinglePhoto(
          photoId,
          name,
          about,
          url,
          takenOn,
          private_var,
          albumId
        )
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) errors.push(data.errors);
        setValidationErrors(errors);
      });
    }

    if (errors.length <= 0) {
      setName("");
      setAbout("");
      setUrl("");
      history.push(`/photos/${photoId}`);
    }
  };

  const onError = (e) => {
    setCheckUrl(
      "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
    );
    e.target.src =
      "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png";
  };

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className="page-wrapper-container">
      {photo.name && loaded && (
        <div id="PhotoCreateForm-component">
          <div className="photo-form-container">
            <form className="photo-form-container" onSubmit={handleSubmit}>
              <div className="mock-upload-navbar">
                <button
                  className="photo-submit-button"
                  type="submit"
                  disabled={!!validationErrors.length}
                >
                  Update 1 Photo
                </button>
              </div>
              <div className="photo-form-top-sub-container">
                <div className="photo-form-top-left-sub-container">
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
                      className="inputFieldTypeText"
                      type="date"
                      id="takenOn"
                      name="takenOn"
                      onChange={(e) => setTakenOn(e.target.value)}
                      value={takenOn}
                      max={date}
                    />
                  </label>

                  <label className='dropdown-label'>
                    {userAlbums.length >= 1 && (
                      <div className={dropDown} onClick={()=>{
                        if(dropDown === 'album-dropdown-hide') setDropDown('album-dropdown-show')
                        else setDropDown('album-dropdown-hide')
                      }}>
                  <span className={albumName ? 'inputFieldTypeText3' : 'inputFieldTypeText2'}>{albumName ? albumName : 'Add a album'}</span>
                  <div className={dropDown === 'album-dropdown-show' ? 'dropdown-content-show' : 'dropdown-content-hide'}>
                          {userAlbums.map((album) => {
                            return (
                              <div
                                id={album.id}
                                className={
                                  albumId === album.id
                                    ? "album-selected"
                                    : "album-not-selected"
                                }
                                onClick={() => {
                                  setAlbumId(album.id)
                                  setAlbumName(album.name)
                                }}
                              >
                                <div className='dropdown-text'>
                                  {album.name} photos {album.Photos.length}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {userAlbums.length <= 0 && (
                      <>
                        <div>Current User has no albums</div>
                      </>
                    )}
                  </label>
                </div>
                <div className="photo-form-top-right-sub-container">
                  {url && (
                    <div className="view-uploaded-image">
                      <img onError={onError} alt="" src={url} />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    <FooterAccount />
    </>
  );
}

export default PhotoUpdateForm;
