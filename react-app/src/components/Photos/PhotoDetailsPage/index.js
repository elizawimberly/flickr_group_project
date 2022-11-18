/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import {
  thunkDeleteSinglePhoto,
  thunkReadSinglePhotoDetails,
} from "../../../store/photosReducer";
import "./PhotoDetailsPage.css";
import CommentCreateFormModal from "../../Comments/CommentCreateFormModal";
import CommentDeleteModal from "../../Comments/CommentDeleteModal";
import TagCreateFormModal from "../../Tags/TagCreateFormModal";
import TagDeleteModal from "../../Tags/TagDeleteModal";
import buddyIcon from "../../../assets/buddyicon.png";
import { convertDate } from "../../../component-resources";
import FooterAccount from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function PhotoDetailsPage() {
  /****************** access store *******************/
  const sessionState = useSelector((state) => state.session);
  const photosState = useSelector((state) => state.photos);

  /************ key into pertinent values ************/
  // user
  const user = sessionState.user;
  // photo
  const photo = photosState.singlePhotoDetails;
  // comments
  const photoComments = photo.Comments;
  const comments = Object.values(photoComments);
  // tags
  const photoTags = photo.Tags;
  const tags = Object.values(photoTags);
  // params
  const { photoId } = useParams();

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadSinglePhotoDetails(photoId));
  }, [dispatch]);

  /****************** manage state *******************/
  const [isShown, setIsShown] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  /************* conditional components **************/
  useEffect(()=> {
    if(photo.User) {
      setFirstName(photo.User.firstName)
      setLastName(photo.User.lastName)
    }
  },[photo.User])


  let photostreamButton = <></>;
  let updatePhotoButtons = <></>;
  if (user) {
    photostreamButton = (
      <NavLink to="/photostream" id="back-to-photostream">
        <i class="fa-solid fa-arrow-left-long"></i> Photostream
      </NavLink>
    );
    updatePhotoButtons = (
      <>
        <div>
          <NavLink to={`/photos/${photoId}/edit`} id="photo-page-edit-button">
            <i class="fa-solid fa-pen"></i>
          </NavLink>
        </div>

        <div id="photo-page-delete-button">
          <i class="fa-solid fa-trash" onClick={deletePhoto}></i>
        </div>
      </>
    );
  }
  console.log(photo)

  /***************** handle events *******************/
  const history = useHistory();

  function deletePhoto() {
    dispatch(thunkDeleteSinglePhoto(photoId));
    history.push("/photostream");
  }

  /**************** render component *****************/
  return (
    <>
    <div className="page-wrapper-container">
      <div className="PhotoDetailsPage-component">
        <div
          className="top-half"
          style={{
            backgroundColor: "#212124",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="top-half-section-A">
            {user?.id === photo?.userId && (
                    <div>{photostreamButton}</div>
            )}
          </div>

          <div className="top-half-section-B">
            {/* <div>
              <i class="fa-solid fa-chevron-left"></i>
            </div> */}

            <div>
              <img
                src={photo.url}
                atl={photo.name}
                className="view-photo"
              ></img>
            </div>

            {/* <div>
              <i class="fa-solid fa-chevron-right"></i>
            </div> */}
          </div>
            {user?.id === photo?.userId && (
              <div className="top-half-section-C">{updatePhotoButtons}</div>
            )}
        </div>

        <div className="bottom-half">
          <div className="bottom-half-left">
            <div className="photo-blurb">
              <div className="photo-blurb-profile-pic-container">
                <img
                  src={buddyIcon}
                  alt="profile picture"
                  className="photo-blurb-profile-pic"
                ></img>
              </div>
              <div className="photo-blurb-about-container">
                {/* <div className="photo-blurb-photographer">{photo.User.username}</div> */}
                {firstName && lastName && (
                  <div className="photo-blurb-photographer">{firstName} {lastName}</div>
                )}
                <div className="photo-blurb-name">{photo && photo?.name}</div>
                <div className="photo-blurb-about">{photo && photo?.about}</div>
              </div>
            </div>

            <div className="comments-section">
              {comments &&
                comments.map((comment) => (
                  <div
                    className="display-comment"
                    // onMouseEnter={() => setIsShown(true)}
                    // onMouseLeave={() => setIsShown(false)}
                  >
                    <div className="comment-text">{comment.comment}</div>
                    <div className="comment-bottom-line-container">
                      <div className="comment-createdAt">
                        {convertDate(comment.createdAt)}
                      </div>
                      {user?.id == comment.User.id || user?.id == photo.userId ? <CommentDeleteModal comment={comment} /> : <></>}
                      {/* {isShown && */}
                      {/* } */}
                    </div>
                  </div>
                ))}
            </div>

            <div className="add-comment-section">
              {user ? <CommentCreateFormModal /> : <></>}
            </div>
          </div>

          <div className="bottom-half-right">
            <div className="stats-container">
              <div className="comments-stats">
                <div className="comment-count">{comments?.length}</div>
                <div className="comment-label">comments</div>
              </div>
              <div className="photo-stats">
                <div>
                  Uploaded on {photo.createdAt && convertDate(photo.createdAt)}
                </div>
              </div>
            </div>

            <div className="tags-container">
              <div className="tags-container-title">Tags</div>

              <div className="display-tag-container">
                {tags &&
                  tags.map((tag) => (
                    <div className="display-tag">
                      {tag.tag}
                      {user?.id == photo.userId ? <TagDeleteModal tag={tag} /> : <></>}
                    </div>
                  ))}
              </div>
              {user?.id == photo.userId ? <TagCreateFormModal /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterAccount />
    </>
  );
}

export default PhotoDetailsPage;
