/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// local files
import "./Explore.css";
import { thunkReadAllPhotos } from "../../../store/photosReducer";

/******************************* COMPONENT *******************************/
function Explore() {
  /********* hard-coded data (remove later) **********/
  //   const photoState = {};
  //   photoState.allPhotos = {
  //     1: {
  //       id: 1,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://www.printablee.com/postpic/2014/09/pusheen-cat-coloring-pages_200482.jpg",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     2: {
  //       id: 2,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://vignette.wikia.nocookie.net/pusheenthecat/images/7/7e/C9y7fFNWAAUQVG6.jpg/revision/latest?cb=20171211112656",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     3: {
  //       id: 3,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://www.rxwallpaper.site/wp-content/uploads/pusheen-lol-pinterest-pusheen-pusheen-cat-and-cat.jpg",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     4: {
  //       id: 4,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://i.pinimg.com/736x/fd/77/d9/fd77d99fe04625cbd00774eca7a81166.jpg",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     5: {
  //       id: 5,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://www.scribblefun.com/wp-content/uploads/2018/02/Pusheen-Coloring-Images.png",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     6: {
  //       id: 6,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://yt3.ggpht.com/a/AGF-l784nOTf4OKQiRLdTKrSIqHISfeHEeNPmoinaA=s900-mo-c-c0xffffffff-rj-k-no",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     7: {
  //       id: 7,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://pusheen.com/wp-content/uploads/2019/01/pusheen-fan-700x700.jpg",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     8: {
  //       id: 8,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://wallpapercave.com/wp/wp7362871.jpg",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //     9: {
  //       id: 9,
  //       userId: 1,
  //       albumId: 1,
  //       name: "name",
  //       about: "about",
  //       url: "https://78.media.tumblr.com/ff9287842f26cd9993b8151736992244/tumblr_osj6r9gFH21qhy6c9o1_1280.gif",
  //       private: true,
  //       takenOn: "takenOn",
  //       createdAt: "createdAt",
  //     },
  //   };

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

  /**************** render component *****************/
  return (
    <div className="page-wrapper-container">
      <div className="explore-component">
        <h1>Explore</h1>

        <div className="explore-photo-feed">
          {allPhotosArr &&
            allPhotosArr.map((photo) => (
              <Link to={`/photos/${photo.id}`} key={`${photo.id}`}>
                <img src={photo.url} className="explore-photo-card"></img>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

/******************************** EXPORTS ********************************/
export default Explore;
