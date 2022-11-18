import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteSingleTag} from '../../../store/photosReducer';

function TagDeleteConfirmation({onClose, tag}) {
  const dispatch = useDispatch();

  const photosState = useSelector((state) => state.photos);
  const photo = photosState.singlePhotoDetails;

  const deleteTag = async (e) => {
    e.preventDefault()
    dispatch(thunkDeleteSingleTag(photo.id, tag.id))
    onClose()
  }

  return (
    <div className='page-wrapper-container'>
      <h1>Are you sure you want to delete this comment?</h1>
      <div className="display-comment">
         <div className="comment-text">{tag.tag}</div>
       </div>
       <button onClick={deleteTag}>Delete Tag</button>
    </div>
  )
}

export default TagDeleteConfirmation;
