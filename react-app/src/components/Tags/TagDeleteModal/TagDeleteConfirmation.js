import React from 'react';
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
      <div className='modal-container'>

            <p className='modal-title'>Are you sure you want to delete this tag?</p>

            <div className='modal-body'>

              <div className="modal-display-content">
                <div className="comment-text">{tag.tag}</div>
              </div>

              <div>
                <button className="modal-button" onClick={deleteTag}>Delete Tag</button>
              </div>

            </div>
        </div>
  )
}

export default TagDeleteConfirmation;
