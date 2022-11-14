/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import thunkReadSingleAlbumDetails from "../../../store/albumsReducer";
import './AlbumDetailsPage.css';
import CommentCreateForm from "../../Comments/CommentCreateForm";
import TagCreateForm from "../../Tags";


/******************************* COMPONENT *******************************/
function AlbumDetailsPage() {

    /********* hard-coded data (remove later) **********/
    const albumsState = {}
    albumsState.singleAlbumDetails = {
        id: 1,
        userId: 1,
        albumId: 1,
        name: "name",
        about: "about",
        createdAt: "createdAt",
        Photos: {
            1: {
                id: 1,
                userId: 1,
                albumId: 1,
                name: "name 1",
                about: "about 1",
                url: "https://www.printablee.com/postpic/2014/09/pusheen-cat-coloring-pages_200482.jpg",
                private: true,
                takenOn: "takenOn 1",
                createdAt: "createdAt 1",
            },
            2: {
                id: 2,
                userId: 1,
                albumId: 1,
                name: "name 2",
                about: "about 2",
                url: "https://vignette.wikia.nocookie.net/pusheenthecat/images/7/7e/C9y7fFNWAAUQVG6.jpg/revision/latest?cb=20171211112656",
                private: true,
                takenOn: "takenOn 2",
                createdAt: "createdAt 2",
            },
            3: {
                id: 3,
                userId: 1,
                albumId: 1,
                name: "name 3",
                about: "about 3",
                url: "https://www.rxwallpaper.site/wp-content/uploads/pusheen-lol-pinterest-pusheen-pusheen-cat-and-cat.jpg",
                private: true,
                takenOn: "takenOn 3",
                createdAt: "createdAt 3",
            },
        },
    }

    /****************** access store *******************/
    // const sessionState = useSelector(state => state.session);
    // const albumsState = useSelector(state => state.albums);

    /************ key into pertinent values ************/
    const album = albumsState.singleAlbumDetails
    const allPhotosArr = Object.values(album.Photos)

    return (
        <div className='page-wrapper-container'>
            <div className="AlbumDetailsPage-component">

                <div className="banner-photo-container">
                    <img
                    src={allPhotosArr && allPhotosArr[0].url}
                    className="banner-photo"
                    >
                    </img>
                </div>

                <div className="album-page-photostream">
                    {allPhotosArr && allPhotosArr.map((photo) => (
                            <Link
                            to={`/photos/${photo.id}`}
                            key={`${photo.id}`}
                            >
                                <img src={photo.url} className="album-page-photo-card"></img>
                            </Link>
                        ))}
                </div>

            </div>
        </div>
    )
}


export default AlbumDetailsPage
