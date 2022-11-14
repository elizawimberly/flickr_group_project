/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// local files
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import thunkReadAllAlbums from "../../../store/albumsReducer";
import './Albumstream.css'


/******************************* COMPONENT *******************************/
function Albumstream() {

    /********* hard-coded data (remove later) **********/
    const albumsState = {}
    albumsState.allAlbums =  {
        1: {
            id: 1,
            userId: 1,
            name: "name1",
            about: "about1",
            createdAt: "createdAt",
        },
        2: {
            id: 2,
            userId: 1,
            name: "name2",
            about: "about2",
            createdAt: "createdAt",
        },
        3: {
            id: 3,
            userId: 1,
            name: "name2",
            about: "about2",
            createdAt: "createdAt",
        },
    }


    /****************** access store *******************/
    // const albumsState = useSelector(state => state.albums)

    /************ key into pertinent values ************/
    const allAlbums = albumsState.allAlbums
    const allAlbumsArr = Object.values(allAlbums)

    /************ reducer/API communication ************/
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(thunkReadAllAlbums())
    // }, [dispatch]);

    /**************** render component *****************/
    return (
        <div className='page-wrapper-container'>

            <Account />
            <NavBarUser />

            <div className="albumstream-component">

                <div className="albumstream-feed">
                    {allAlbumsArr && allAlbumsArr.map((album) => (
                        <Link
                        to={`/albums/${album.id}`}
                        key={`${album.id}`}
                        >
                            <img
                            src="https://www.freepngimg.com/thumb/facebook/72531-pusheen-short-haired-breed-domestic-british-cat-tabby.png"
                            className="albumstream-album-card"
                            >
                            </img>
                            {/* <img src={photo.url} className="photostream-photo-card"></img> */}
                        </Link>
                    ))}
                </div>

            </div>

        </div>
    )
}


export default Albumstream
