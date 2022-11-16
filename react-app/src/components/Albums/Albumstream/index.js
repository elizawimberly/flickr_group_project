/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import { thunkReadAllAlbums } from "../../../store/albumsReducer";
import './Albumstream.css'


/******************************* COMPONENT *******************************/
function Albumstream() {

    /********* hard-coded data (remove later) **********/


    /****************** access store *******************/
    const albumsState = useSelector(state => state.albums)

    /************ key into pertinent values ************/
    const allAlbums = albumsState.allAlbums
    const allAlbumsArr = Object.values(allAlbums)

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadAllAlbums())
    }, [dispatch]);

    /**************** render component *****************/
    return (
        <div className='page-wrapper-container'>

            <Account />
            <NavBarUser />

            <div className="albumstream-component">

                <div className="albumstream-feed">
                    {allAlbumsArr && allAlbumsArr.map((album) => {
                        let photoOne = album.Photos[0]
                        if(album.Photos.length >= 1){
                            return (
                                <Link
                                to={`/albums/${album.id}`}
                                key={`${album.id}`}
                                >
                                    <img
                                    src={photoOne.url}
                                    className="albumstream-album-card"
                                    >
                                    </img>
                                    {/* <img src={photo.url} className="photostream-photo-card"></img> */}
                                </Link>
                            )  
                        }
                        else {
                            return (
                                <Link
                                to={`/albums/${album.id}`}
                                key={`${album.id}`}
                                >
                                    <img
                                    src="https://www.springsmontessori.com/wp-content/uploads/2022/06/Photo-Coming-Soon.png"
                                    className="albumstream-album-card"
                                    >
                                    </img>
                                    {/* <img src={photo.url} className="photostream-photo-card"></img> */}
                                </Link>
                            )
                        }
                      })}
                </div>

            </div>

        </div>
    )
}


export default Albumstream
