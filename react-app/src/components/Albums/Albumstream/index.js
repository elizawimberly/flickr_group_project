/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import { thunkReadAllAlbums } from "../../../store/albumsReducer";
import './Albumstream.css'
import { albumPlaceholderImage } from "../../../component-resources";
import watermark from "../../../assets/no-albums-watermark.jpeg"


/******************************* COMPONENT *******************************/
function Albumstream() {

    /****************** access store *******************/
    const albumsState = useSelector(state => state.albums)

    /************ key into pertinent values ************/
    const allAlbums = albumsState.allAlbums
    const allAlbumsArr = Object.values(allAlbums)
    // Uncomment to demo conditional render:
    // const allAlbumsArr = []

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadAllAlbums())
    }, [dispatch]);

    /************* conditional components **************/
    let albumstreamFeed = (
        <></>
    )

    if (allAlbumsArr.length <= 0) {
        albumstreamFeed = (
          <div className="no-photos-or-albums-text-box-container">
            <div className="no-photos-or-albums-text-box" id="no-albums-text-box">
              <p className="no-photos-or-albums">Let's make an album.</p>
              <p className="no-photos-or-albums-upload-prompt">Easily organize all your photos into beautiful albums to share with friends, family, or even other Flare members.</p>
              <div>
                <NavLink to='/upload' exact={true}>
                  <button className="no-photos-or-albums-upload-button">Create an album</button>
                </NavLink>
              </div>
            </div>
            <img src={watermark} className="watermark"></img>
          </div>
        )

    } else {
        albumstreamFeed = (
        <>
            <div className="photostream-title-strip">
                <div className="photostream-title-strip-left">
                </div>

                <div className="photostream-title-strip-right">
                    <NavLink
                    to="albums/create"
                    exact={true}
                    id='albumstream-new-album-button'
                    >
                        <i class="fa-regular fa-square-plus" style={{paddingRight:"7px"}}></i>
                        <span>New album</span>
                    </NavLink>
                </div>
            </div>
            {allAlbumsArr && allAlbumsArr.map((album) => (
                    <Link
                    to={`/albums/${album.id}`}
                    key={`${album.id}`}
                    >
                        <img
                        src={album.Photos.length ? album.Photos[0].url : albumPlaceholderImage }
                        className="albumstream-album-card"
                        >
                        </img>
                    </Link>
                )
            )}
        </>
        )
    }


    /**************** render component *****************/
    return (
        <div className='page-wrapper-container'>

            <Account />
            <NavBarUser />

            <div className="albumstream-component">

                <div className="albumstream-feed">
                    { albumstreamFeed }
                </div>

            </div>

        </div>
    )
}


export default Albumstream
