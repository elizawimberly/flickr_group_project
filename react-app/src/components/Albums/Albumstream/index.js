/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory, Redirect } from "react-router-dom";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import { thunkReadAllAlbums } from "../../../store/albumsReducer";
import "./Albumstream.css";
import { albumPlaceholderImage } from "../../../component-resources";
import watermark from "../../../assets/no-albums-watermark.jpeg";
import FooterAccount from "../../Footer/FooterAccount";


/******************************* COMPONENT *******************************/
function Albumstream() {

  /****************** access store *******************/
  const sessionState = useSelector((state) => state.session)
  const albumsState = useSelector((state) => state.albums);

  /************ key into pertinent values ************/
  const sessionUser = sessionState.user
  const allAlbums = albumsState.allAlbums;
  const allAlbumsArr = Object.values(allAlbums);
  // Uncomment to demo conditional render:
  // const allAlbumsArr = []

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllAlbums());
  }, [dispatch]);

  /***************** handle events *******************/
  const history = useHistory();

  function navigateToAlbum(id) {
    return history.push(`/albums/${id}`);
  }

  
  /************* conditional components **************/
  let albumstreamFeed = <></>;

  if (allAlbumsArr.length <= 0) {
    albumstreamFeed = (
      <div className="no-photos-or-albums-text-box-container">
        <div className="no-photos-or-albums-text-box" id="no-albums-text-box">
          <p className="no-photos-or-albums">Let's make an album.</p>
          <p className="no-photos-or-albums-upload-prompt">
            Easily organize all your photos into beautiful albums to share with
            friends, family, or even other Flare members.
          </p>
          <div>
            <NavLink to="/albums/create" exact={true}>
              <button className="no-photos-or-albums-upload-button">
                Create an album
              </button>
            </NavLink>
          </div>
        </div>
        <img src={watermark} alt='watermark' className="watermark"></img>
      </div>
    );
  } else {
    albumstreamFeed = (
      <>
        <div className="albumstream-title-strip">
          <div className="albumstream-title-strip-right">
            <NavLink
              to="albums/create"
              exact={true}
              id="albumstream-new-album-button"
            >
              <i
                class="fa-regular fa-square-plus"
                style={{ paddingRight: "7px" }}
              ></i>
              <span>New album</span>
            </NavLink>
          </div>
        </div>

        <div className="albumstream-feed">
          {allAlbumsArr &&
            allAlbumsArr.map((album) => (
              <div
                className="albumstream-album-card"
                style={{
                  backgroundImage: `url("${
                    allAlbumsArr.length &&
                    album.Photos[0]?.url !== undefined
                      ? album.Photos[0]?.url
                      : albumPlaceholderImage
                  }")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  // objectFit:"contain"
                }}
                onClick={() => navigateToAlbum(album.id)}
              >
                <div id="albumstream-album-name">{album.name}</div>
                <div id="albumstream-album-photo-count">
                  {album.Photos.length} photo
                  {allAlbumsArr.length === 1 ? "" : "s"}
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className="page-wrapper-container">
      <Account />
      <NavBarUser />

      <div className="albumstream-component">{albumstreamFeed}</div>
    </div>
    <FooterAccount />
    </>
  );
}


/******************************** EXPORTS ********************************/
export default Albumstream;
