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
            <div className='modal-container'>

                <p className='modal-title'>Add a comment</p>

                <div className='modal-body'>

                    <form
                        className='modal-form'
                        onSubmit={createComment}>
                        <label>
                            <textarea
                            className="modal-textarea-input-field"
                            type="text"
                            name="comment"
                            placeholder="Add a comment"
                            onChange={(e) => setComment(e.target.value)}
                            required={true}
                            minLength={2}
                            maxLength={500}
                            value={comment}
                            ></textarea>
                        </label>
                        <button className="modal-button" type='submit'>Submit</button>
                    </form>

                </div>
            </div>
    )
}


export default CommentCreateForm
