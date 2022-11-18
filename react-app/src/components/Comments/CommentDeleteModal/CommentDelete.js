import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteSingleComment} from '../../../store/photosReducer';

function CommentDeleteConfirmation({onClose, comment}) {
  const dispatch = useDispatch();

  const photosState = useSelector((state) => state.photos);
  const photo = photosState.singlePhotoDetails;

  const deleteComment = async (e) => {
    e.preventDefault()
    dispatch(thunkDeleteSingleComment(photo.id, comment.id))
    onClose()
  }

  return (
        <div className='modal-container'>

            <p className='modal-title'>Are you sure you want to delete this comment?</p>

          <div className='modal-body'>

            <div className="modal-display-content">
              <div className="comment-text">{comment.comment}</div>
            </div>

            <div>
              <button className="modal-button" onClick={deleteComment}>Delete Comment</button>
            </div>

          </div>
        </div>
  )
}

export default CommentDeleteConfirmation;
