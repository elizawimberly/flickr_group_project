/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// local files
import "./Explore.css";
import { thunkReadAllPhotos } from "../../../store/photosReducer";
import FooterAccount from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function Explore() {

  /****************** access store *******************/
  const photosState = useSelector((state) => state.photos);

  /************ key into pertinent values ************/
  const allPhotos = photosState.allPhotos;
  const allPhotosArr = Object.values(allPhotos);

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllPhotos());
  }, [dispatch]);

  /****************** manage state *******************/
  let [photoCardSize, setPhotoCardSize] = useState('explore-photo-card-small')

  /**************** render component *****************/
  return (
    <>
    <div className="page-wrapper-container">
      <div className="explore-component">

        <div className="title-strip">
          <div className="title-strip-left">
            <span>Explore</span>
          </div>
          <div className="title-strip-right">
            <i class="fa-solid fa-grip" onClick={() => setPhotoCardSize("explore-photo-card-small")}></i>
            <i class="fa-solid fa-square" onClick={() => setPhotoCardSize("explore-photo-card-large")}></i>
          </div>
        </div>

        <div className="explore-photo-feed">
          {allPhotosArr &&
            allPhotosArr.map((photo) => (
              <Link to={`/photos/${photo.id}`} key={`${photo.id}`}>
                <img src={photo.url} alt={photo.name} className={photoCardSize}></img>
              </Link>
            ))}
        </div>
      </div>
    </div>
    <FooterAccount />
    </>
  );
}

/******************************** EXPORTS ********************************/
export default Explore;
