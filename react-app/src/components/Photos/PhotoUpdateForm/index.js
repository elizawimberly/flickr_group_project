// photoupdateform

import React from "react";
import {
  thunkReadAllPhotos,
  thunkReadSinglePhotoDetails,
  thunkUpdateSinglePhoto,
} from "../../../store/photosReducer";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllAlbums, thunkReadSingleAlbumDetails } from "../../../store/albumsReducer";
import "./PhotoUpdateForm.css";

function PhotoUpdateForm() {
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
  const [private_var, setPrivate_var] = useState(false);
  const [tags, setTags] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [takenOn, setTakenOn] = useState(null);
  const [albumId, setAlbumId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dropDown, setDropDown] = useState('album-dropdown-hide')
  const [albumName, setAlbumName] = useState(null)

  const longDate = new Date();
  const year = longDate.getFullYear();
  let month = longDate.getMonth() + 1;
  let day = longDate.getDate() + 1;
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${Number(day + 1)}`;
  const date = `${year}-${month}-${day}`;

  console.log(album)
  console.log('This is album ', albumName)

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
      let tag_array = Object.values(photo.Tags);
      let tag_names = tag_array.map((tag) => tag.tag);
      if (name === null || name === undefined) setName(photo.name);
      if (about === null || about === undefined) setAbout(photo.about);
      if (url === null || url === undefined) setUrl(photo.url);
      if (tags === null || tags === undefined) setTags(tag_names.join(" "));
      if (albumId === null || albumId === undefined) setAlbumId(photo.albumId);
      let takenDate = new Date(photo.takenOn);
      let takenYear = takenDate.getFullYear();
      let takenMonth = takenDate.getMonth();
      let takenDay = takenDate.getDate();
      if (takenMonth < 10) takenMonth = `0${takenMonth}`;
      if (takenDay < 10) takenDay = `0${takenDay}`;
      if (takenOn === null || takenOn === undefined)
        setTakenOn(`${takenYear}-${takenMonth}-${takenDay}`);
    }
  }, [dispatch, photo.name, name, about, url, tags, albumId, photoId, takenOn, album, albumName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    let errors = [];
    if (!name) errors.push("Name needs to be between 2 and 50 characters.");
    if (!about) errors.push("About needs to be between 10 and 500 characters.");
    if (!url) errors.push("You must enter a valid url");
    if (errors.length >= 1) setValidationErrors(errors);
    else
      dispatch(
        thunkUpdateSinglePhoto(
          photoId,
          name,
          about,
          url,
          takenOn,
          private_var,
          tags,
          albumId
        )
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) errors.push(data.errors);
        setValidationErrors(errors);
      });

    if (errors.length <= 0) {
      setName("");
      setAbout("");
      setUrl("");
      setTags("");
      history.push("/");
    }
  };

  const onError = (e) => {
    setCheckUrl(
      "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
    );
    e.target.src =
      "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png";
  };

  return (
    <div className="page-wrapper-container">
      {photo.name && loaded && (
        <div className="PhotoCreateForm-component">
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
  );
}

export default PhotoUpdateForm;
