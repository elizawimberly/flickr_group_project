import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {thunkCreateSingleComment} from '../../../store/photosReducer'

function CommentCreateForm({onClose}) {

    const dispatch = useDispatch();

    const photosState = useSelector((state) => state.photos);

    const photo = photosState.singlePhotoDetails;

    const [comment, setComment] = useState('')

    const createComment = async (e) => {
        e.preventDefault()
        await dispatch(thunkCreateSingleComment(photo.id, comment))
        onClose()
    }

    return (
        <div className='page-wrapper-container'>
            <h1>Add a Comment</h1>

            <form onSubmit={createComment}>
                <label>
                     <input
                     className="inputFieldTypeText"
                     type="text"
                     name="comment"
                     placeholder="Add Comment"
                     onChange={(e) => setComment(e.target.value)}
                     required={true}
                     minLength={2}
                     maxLength={50}
                     value={comment}
                     />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}


export default CommentCreateForm
