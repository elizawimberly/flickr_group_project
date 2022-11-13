import React from "react";
import { Link } from "react-router-dom";
import Account from "../../Account";
import NavBarUser from "../../NavigationBars/NavBarUser";
import './Photostream.css'

function Photostream() {

    const photos = [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "name": "Evening Tennis on the Water",
          "about": "Rounds of tennis between a tight-nit group of people on the water facing the Brooklyn Bridge.",
          "url": "https://cristinapicteaza.com/wp-content/uploads/2019/08/pusheen-1140x681.png",
          "private": true,
          "takenOn": "2021-11-19 20:39:36",
          "createdAt": "2021-11-19 20:39:36"
        },
        {
            "id": 1,
            "userId": 1,
            "albumId": 1,
            "name": "Evening Tennis on the Water",
            "about": "Rounds of tennis between a tight-nit group of people on the water facing the Brooklyn Bridge.",
            "url": "https://78.media.tumblr.com/ff9287842f26cd9993b8151736992244/tumblr_osj6r9gFH21qhy6c9o1_1280.gif",
            "private": true,
            "takenOn": "2021-11-19 20:39:36",
            "createdAt": "2021-11-19 20:39:36"
          },
      ]



    return (
        <div className='page-wrapper-container'>
            <Account />
            <NavBarUser />
            <div className="photostream-component">

                {photos.map((photo) => (
                    <Link
                    key={`${photo.id}`}
                    to={`/photos/${photo.id}`}
                    >
                        <img src={photo.url} className="photostream-photo"></img>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default Photostream
