/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadSingleAlbumDetails } from "../../../store/albumsReducer";
import './AlbumDetailsPage.css';

/******************************* COMPONENT *******************************/
function AlbumDetailsPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const { albumId } = params;

    useEffect(()=> {
        dispatch(thunkReadSingleAlbumDetails(albumId))
    },[dispatch])

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const albumsState = useSelector(state => state.albums);

    /************ key into pertinent values ************/
    const album = albumsState.singleAlbumDetails

    const allPhotosArr = Object.values(album.Photos)


    return (
        <div className='page-wrapper-container'>
            {allPhotosArr.length >= 1 && (
                <div className="AlbumDetailsPage-component">

                <div className="banner-photo-container">
                    <img
                    src={allPhotosArr && allPhotosArr[0].url}
                    className="banner-photo"
                    alt=''
                    >
                    </img>
                </div>

                <div className="album-page-photostream">
                    {allPhotosArr && allPhotosArr.map((photo) => (
                            <Link
                            to={`/photos/${photo.id}`}
                            key={`${photo.id}`}
                            >
                                <img src={photo.url} className="album-page-photo-card" alt=''></img>
                            </Link>
                        ))}
                </div>
            </div>
            )}
            

        </div>
    )
}


export default AlbumDetailsPage
