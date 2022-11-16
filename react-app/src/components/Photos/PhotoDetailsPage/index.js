/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadSinglePhotoDetails } from "../../../store/photosReducer";
import "./PhotoDetailsPage.css";
import CommentCreateForm from "../../Comments/CommentCreateForm";
import TagCreateFormModal from "../../TagCreateFormModal";

/******************************* COMPONENT *******************************/
function PhotoDetailsPage() {

  /****************** access store *******************/
  const sessionState = useSelector((state) => state.session);
  const photosState = useSelector((state) => state.photos);

  /************ key into pertinent values ************/
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

  /************* conditional components **************/
  // render tag components if current user === photo.userId

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
              <NavLink to="/photostream">
              <i class="fa-solid fa-arrow-left-long"></i> Back to photostream
              </NavLink>
            </div>
          </div>

          <div className="top-half-section-B">
            <div>
              <i class="fa-solid fa-chevron-left"></i>
            </div>

            <div>
              <img src={photo.url} atl={photo.name} className="view-photo"></img>
            </div>

            <div>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <div className="top-half-section-C">
            <div>
              <NavLink to={`/photos/${photoId}/edit`}>
                <button type="submit">Edit icon</button>
              </NavLink>
            </div>

            <div>
              <button type="submit">Delete icon</button>
            </div>
          </div>

        </div>

        <div className="bottom-half">
          <div className="bottom-half-left">
            <div className="photo-blurb">
              <div>{photo && photo.name}</div>
              <div>{photo && photo.about}</div>
            </div>
            <div>
              {comments &&
                comments.map((comment) => (
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
