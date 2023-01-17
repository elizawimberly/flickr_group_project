/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadSingleAlbumDetails, thunkDeleteSingleAlbum } from "../../../store/albumsReducer";
import './AlbumDetailsPage.css';
import { albumPlaceholderImage } from "../../../component-resources";
import Footer from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function AlbumDetailsPage() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const albumsState = useSelector(state => state.albums);

    /************ key into pertinent values ************/
    // album
    const album = albumsState.singleAlbumDetails
    const albumName = album.name;
    const albumDescription = album.about;
    // photos
    const allPhotosArr = Object.values(album.Photos)
    const { albumId } = useParams();

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadSingleAlbumDetails(albumId))
    }, [dispatch, albumId])

    /****************** manage state *******************/
    let [photoCardSize, setPhotoCardSize] = useState('albumDetails-photo-card-small')

    /************* conditional components **************/
    const coverPhoto = allPhotosArr.length ? allPhotosArr[0].url : albumPlaceholderImage

    /***************** handle events *******************/
    const history = useHistory()

    function navigateToAlbumstream() {
        return history.push(`/albums`);
    }

    function editAlbum() {
        return history.push(`/albums/${albumId}/organize`);
    }

    function deleteAlbum() {
        dispatch(thunkDeleteSingleAlbum(albumId));
        history.push('/albums')
    }

    /**************** render component *****************/
    if (!sessionState.user) return <Redirect to="/" />;

    return (
        <>
            <div className='page-wrapper-container'>
                <div className="AlbumDetailsPage-component">

                    <div className="title-strip">
                        <div className="title-strip-left">
                            <span onClick={navigateToAlbumstream} id="navigate-to-albumstream-button">
                                <i class="fa-solid fa-arrow-left-long"></i> Back to albums list
                            </span>
                        </div>
                        <div className="title-strip-right">
                            <i class="fa-solid fa-grip" onClick={() => setPhotoCardSize("albumDetails-photo-card-small")}></i>
                            <i class="fa-solid fa-square" onClick={() => setPhotoCardSize("albumDetails-photo-card-large")}></i>
                        </div>
                    </div>

                    <div className="banner-photo-container"
                        style={{
                            backgroundImage: `url("${coverPhoto}")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                            // objectFit:"contain"
                        }}
                    >
                        <div id="banner-album-name">{albumName && albumName}</div>
                        <div id="banner-album-description">{albumDescription && albumDescription}</div>
                        <div id="banner-album-photo-count">{allPhotosArr && allPhotosArr.length} photo{allPhotosArr.length === 1 ? "" : "s"}</div>
                        <div id="banner-modify-album-buttons-container">
                            <i class="fa-solid fa-pen" onClick={editAlbum}></i>
                            <i class="fa-solid fa-trash" onClick={deleteAlbum} style={{ color: "white" }}></i>
                        </div>
                    </div>

                    <div className="album-page-photostream">
                        {allPhotosArr && allPhotosArr.map((photo) => (
                            <Link
                                to={`/photos/${photo.id}`}
                                key={`${photo.id}`}
                            >
                                <img src={photo.url} className={photoCardSize} alt={photo.name}></img>
                            </Link>
                        ))}
                    </div>
                    <Footer />
                </div>

            </div>
        </>
    )
}


export default AlbumDetailsPage
