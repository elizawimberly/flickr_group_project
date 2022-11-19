/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import { thunkReadAllPhotosByUser } from "../../../store/photosReducer";
import "./Photostream.css";
import watermark from "../../../assets/no-albums-watermark.jpeg"
import FooterAccount from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function Photostream() {

  /****************** access store *******************/
  const sessionState = useSelector((state) => state.session)
  const photosState = useSelector((state) => state.photos);

  /************ key into pertinent values ************/
  const sessionUser = sessionState.user
  const allPhotos = photosState.userPhotos;
  const allPhotosArr = Object.values(allPhotos);
  // Uncomment to demo conditional render:
  // const allPhotosArr = []

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllPhotosByUser());
  }, [dispatch]);

  /****************** manage state *******************/
  let [photostreamCardSize, setPhotostreamCardSize] = useState('photostream-photo-card-small')

  /************* conditional components **************/
  let photostreemFeed = (
    <></>
  )

  if (allPhotosArr.length <= 0) {
    photostreemFeed = (
      <div className="no-photos-or-albums-text-box-container">
        <div className="no-photos-or-albums-text-box">
          <p className="no-photos-or-albums">You have no public photos.</p>
          <p className="no-photos-or-albums-upload-prompt">Your photostream is your public-facing portfolio. Set your photos to public within the Upload tool to populate your photostream.</p>
          <div>
            <NavLink to='/photos/upload' exact={true}>
              <button className="no-photos-or-albums-upload-button">Go to Upload</button>
            </NavLink>
          </div>
        </div>
        <img src={watermark} alt='watermark' className="watermark"></img>
      </div>
    )

  } else {
    photostreemFeed = (
      <>
      {allPhotosArr &&
        allPhotosArr.map((photo) => (
          <Link to={`/photos/${photo.id}`} key={`${photo.id}`}>
            <img src={photo.url} alt={photo.name} className={photostreamCardSize}></img>
          </Link>
        ))}
      </>
    )
  }

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className="page-wrapper-container">

      <Account />
      <NavBarUser />

      <div className="photostream-component">

        <div className="photostream-title-strip">
          <div className="photostream-title-strip-left">
            <span>View all</span>
          </div>
          <div className="photostream-title-strip-right">
            <i class="fa-solid fa-grip" onClick={() => setPhotostreamCardSize("photostream-photo-card-small")}></i>
            <i class="fa-solid fa-square" onClick={() => setPhotostreamCardSize("photostream-photo-card-large")}></i>
          </div>
        </div>

        <div className="photostream-feed">
          { photostreemFeed }
        </div>
      </div>

    </div>
    <FooterAccount />
    </>
  );
}

export default Photostream;
