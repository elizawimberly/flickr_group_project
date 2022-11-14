/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import thunkReadSinglePhotoDetails from "../../../store/photosReducer";
import './PhotoDetailsPage.css';
import CommentCreateForm from "../../Comments/CommentCreateForm";
import TagCreateForm from "../../Tags";


/******************************* COMPONENT *******************************/
function PhotoDetailsPage() {

    /********* hard-coded data (remove later) **********/
    const photoState = {}
    photoState.singlePhotoDetails = {
        id: 1,
        userId: 1,
        albumId: 1,
        name: "name",
        about: "about",
        url: "https://www.printablee.com/postpic/2014/09/pusheen-cat-coloring-pages_200482.jpg",
        private: true,
        takenOn: "takenOn",
        createdAt: "createdAt",
        Comments: {
            1: {
                commentId: 1,
                userId: 1,
                comment: "comment string 1",
            },
            2: {
                commentId: 2,
                userId: 1,
                comment: "comment string 2",
            },
        },
        Tags: {
            1: {
                tagId: 1,
                tag: "tag string 1",
            },
            2: {
                tagId: 2,
                tag: "tag string 2",
            },
        },
    }

    /****************** access store *******************/
    // const sessionState = useSelector(state => state.session);
    // const photosState = useSelector(state => state.photos);

    /************ key into pertinent values ************/
    // // user
    // const userId = sessionState.user.id;
    // photo
    const photo = photoState.singlePhotoDetails;
    // comments
    const photoComments = photo.Comments;
    const comments = Object.values(photoComments);
    // tags
    const photoTags = photo.Tags;
    const tags = Object.values(photoTags);
    // params
    const { photoId } = useParams()

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(thunkReadSinglePhotoDetails(photoId));
    // }, [dispatch]);


    /************* conditional components **************/
    // render tag components if current user === photo.userId



    /**************** render component *****************/
    return (
        <div className='page-wrapper-container'>
            <div className="PhotoDetailsPage-component">

                <div className="top-half">
                <div className="photo-viewing-background"></div>

                    <div>
                        <NavLink to="/photostream">
                        <button type="submit">Back to photostream</button>
                        </NavLink>
                    </div>

                    <div>
                        <img src={photo.url} atl={photo.name} className="photo-view"></img>
                    </div>

                    <div>
                        <NavLink to={`/photos/${photoId}/edit`}>
                        <button type="submit">Edit icon</button>
                        </NavLink>
                    </div>

                    <div>
                        <button type="submit">Delete icon</button>
                    </div>

                </div>

                <div className="bottom-half">
                    <div className="bottom-half-left">
                        <div className="photo-blurb">
                            <div>{photo && photo.name}</div>
                            <div>{photo && photo.about}</div>
                        </div>
                        <div>
                            {comments && comments.map((comment) => (
                                <div className="display-comment">{comment.comment}</div>
                            ))}
                        </div>
                        <div>
                            <CommentCreateForm />
                        </div>
                    </div>

                    <div className="bottom-half-right">

                        <div className="stats-container">

                            <div className="photo-stats">
                                <div className="comment-stats">
                                    <div>{comments && comments.length}</div>
                                    <div>comments</div>
                                </div>
                                <div>
                                    <div>Uploaded on {photo && photo.takenOn}</div>
                                </div>
                            </div>

                            <div className="tags-stats">
                                <div>Tags</div>
                                <TagCreateForm />
                                <div className="tag-container">
                                    {tags && tags.map((tag) => (
                                        <div className="display-tag">{tag.tag}</div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PhotoDetailsPage
