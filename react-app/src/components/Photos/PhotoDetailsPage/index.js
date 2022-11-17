/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkDeleteSinglePhoto, thunkReadSinglePhotoDetails } from "../../../store/photosReducer";
import "./PhotoDetailsPage.css";
import CommentCreateFormModal from '../../Comments/CommentCreateFormModal'
import TagCreateFormModal from "../../TagCreateFormModal";
import buddyIcon from "../../../assets/buddyicon.png"
import { convertDate } from "../../../component-resources";


/******************************* COMPONENT *******************************/
function PhotoDetailsPage() {

  /****************** access store *******************/
  const sessionState = useSelector((state) => state.session);
  const photosState = useSelector((state) => state.photos);

  /************ key into pertinent values ************/
  // user
  const user = sessionState.user
  // photo
  const photo = photosState.singlePhotoDetails;
  // comments
  const photoComments = photo.Comments;
  const comments = Object.values(photoComments);
  console.log("comments", comments)
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

  /************* conditional components **************/
  let photostreamButton = (
    <></>
  )
  let updatePhotoButtons = (
    <></>
  )
  if (user) {
    photostreamButton = (
      <NavLink to="/photostream" id="back-to-photostream">
        <i class="fa-solid fa-arrow-left-long"></i> Photostream
      </NavLink>
    )
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
    )
  }

  /***************** handle events *******************/
  const history = useHistory()

  function deletePhoto() {
    dispatch(thunkDeleteSinglePhoto(photoId));
    history.push('/photostream')
  }

  /**************** render component *****************/
  return (
    <div className="page-wrapper-container">
      <div className="PhotoDetailsPage-component">

        <div className="top-half"
                    style={{
                      backgroundColor: "#212124",
                      backgroundRepeat:"no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      }}
                  >

          <div className="top-half-section-A">
            <div>
              { photostreamButton }
            </div>
          </div>

          <div className="top-half-section-B">
            {/* <div>
              <i class="fa-solid fa-chevron-left"></i>
            </div> */}

            <div>
              <img src={photo.url} atl={photo.name} className="view-photo"></img>
            </div>

            {/* <div>
              <i class="fa-solid fa-chevron-right"></i>
            </div> */}
          </div>

          <div className="top-half-section-C">
            { updatePhotoButtons }
          </div>

        </div>



        <div className="bottom-half">
          <div className="bottom-half-left">

            <div className="photo-blurb">
              <div className="photo-blurb-profile-pic-container">
                <img src={buddyIcon} alt="profile picture" className="photo-blurb-profile-pic"></img>
              </div>
              <div className="photo-blurb-about-container">
                <div className="photo-blurb-photographer">{user.first_name} {user.last_name}</div>
                <div className="photo-blurb-name">{photo && photo.name}</div>
                <div className="photo-blurb-about">{photo && photo.about}</div>
              </div>
            </div>

            <div className="comments-section">
              {comments &&
                comments.map((comment) => (
                  <div className="display-comment">
                    <div className="comment-text">{comment.comment}</div>
                    <div className="comment-createdAt">{convertDate(comment.createdAt)}</div>
                  </div>
                ))}
            </div>

            <div>
              <CommentCreateFormModal />
            </div>

          </div>

          <div className="bottom-half-right">
            <div className="stats-container">
              <div className="photo-stats">
                <div className="comment-stats">
                  <div>{comments?.length}</div>
                  <div>comments</div>
                </div>
                <div>
                  <div>Taken on {photo?.takenOn}</div>
                </div>
              </div>

              <div className="tags-stats">
                <div>Tags</div>
                <TagCreateFormModal />
                <div className="tag-container">
                  {tags &&
                    tags.map((tag) => (
                      <div className="display-tag">{tag.tag}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetailsPage;
