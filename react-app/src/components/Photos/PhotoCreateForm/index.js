/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkCreateSinglePhoto } from "../../../store/photosReducer";
import "./PhotoCreateForm.css";
import { thunkReadAllAlbums } from "../../../store/albumsReducer";
import FooterAccount from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function PhotoCreateForm() {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);
  const userAlbums = useSelector((state) =>
    Object.values(state.albums.allAlbums)
  );
  /************ key into pertinent values ************/
  const longDate = new Date();
  const year = longDate.getFullYear();
  let month = longDate.getMonth() + 1;
  let day = longDate.getDate() + 1;
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${Number(day)}`;
  const date = `${year}-${month}-${day}`;
  /****************** manage state *******************/
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState("");
  const [checkUrl, setCheckUrl] = useState("");
  const [private_var] = useState(false);
  const [tags, setTags] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [takenOn, setTakenOn] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dropDown, setDropDown] = useState("album-dropdown-hide");
  const [albumName, setAlbumName] = useState("");
  /************ reducer/API communication ************/
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkReadAllAlbums());
  }, [dispatch]);
  useEffect(() => {
    let errors = [];
    if (!name) errors.push("Name needs to be between 2 and 50 characters.");
    if (!about) errors.push("About needs to be between 10 and 500 characters.");
    if (
      !url ||
      checkUrl ===
        "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
    )
      errors.push("You must enter a valid url");
    setValidationErrors(errors);
  }, [submitted, name, about, url, checkUrl]);
  /***************** handle events *******************/
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    let newPhoto
    setSubmitted(true);
    if (!name) errors.push("Name needs to be between 2 and 50 characters.");
    if (!about) errors.push("About needs to be between 10 and 500 characters.");
    if ( !url || checkUrl === "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png") errors.push("You must enter a valid url");
    if (errors.length >= 1) setValidationErrors(errors);
    if (errors.length <= 1 && validationErrors <= 1) {
      newPhoto = await dispatch(
        thunkCreateSinglePhoto(
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
    }
    if (errors.length <= 0) {
      setName("");
      setAbout("");
      setUrl("");
      setTags("");
      history.push(`/photos/${newPhoto.id}`);
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
      <div id="PhotoCreateForm-component">
        <form className="photo-form-container" onSubmit={handleSubmit}>
          <div className="mock-upload-navbar">
            <button className="photo-submit-button" type="submit">
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
                  required={true}
                  minLength={2}
                  maxLength={50}
                />
                <input
                  className="inputFieldTypeText"
                  type="text"
                  name="about"
                  placeholder="Add a description"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  required={true}
                  minLength={2}
                  maxLength={250}
                />
              </label>
              <label>
                <input
                  className="inputFieldTypeText"
                  type="text"
                  name="url"
                  placeholder="Add a photo url"
                  onChange={(e) => {
                    setCheckUrl(e.target.value);
                    setUrl(e.target.value);
                  }}
                  value={url}
                  required={true}
                  minLength={2}
                  maxLength={250}
                />
              </label>
              <label className="taken-on-label">
                <p>Taken On</p>
                <input
                  type="date"
                  className="inputFieldTypeText"
                  id="takenOn"
                  name="takenOn"
                  onChange={(e) => setTakenOn(e.target.value)}
                  value={takenOn}
                  max={date}
                  required={true}
                  minLength={2}
                  maxLength={50}
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
                  required={true}
                  minLength={2}
                  maxLength={50}
                />
              </label>
              <label className="dropdown-label">
                {userAlbums.length >= 1 && (
                  <div
                    className={dropDown}
                    onClick={() => {
                      if (dropDown === "album-dropdown-hide")
                        setDropDown("album-dropdown-show");
                      else setDropDown("album-dropdown-hide");
                    }}
                  >
                    <span
                      className={
                        albumName
                          ? "inputFieldTypeText3"
                          : "inputFieldTypeText2"
                      }
                    >
                      {albumName ? albumName : "Add a album"}
                    </span>
                    <div
                      className={
                        dropDown === "album-dropdown-show"
                          ? "dropdown-content-show"
                          : "dropdown-content-hide"
                      }
                    >
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
                              setAlbumId(album.id);
                              setAlbumName(album.name);
                            }}
                          >
                            <div className="dropdown-text">
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

              <div className="errors-container">
                {submitted &&
                  validationErrors &&
                  validationErrors.map((error, i = 0) => (
                    <div className="form-errors" key={i}>
                      {error}
                    </div>
                  ))}
              </div>
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
    <FooterAccount />
    </>
  );
}

/******************************** EXPORTS ********************************/
export default PhotoCreateForm;
