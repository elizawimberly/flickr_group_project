import React, { useState } from 'react';
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
    <div className='page-wrapper-container'>
      <h1>Are you sure you want to delete this comment?</h1>
      <div className="display-comment">
         <div className="comment-text">{comment.comment}</div>
       </div>
       <button onClick={deleteComment}>Delete Comment</button>
    </div>
  )
}

export default CommentDeleteConfirmation;
