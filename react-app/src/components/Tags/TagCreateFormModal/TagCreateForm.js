import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {thunkCreateSingleTag} from '../../../store/photosReducer'

function TagCreateForm({onClose}) {

    const dispatch = useDispatch();

    const photosState = useSelector((state) => state.photos);

    const photo = photosState.singlePhotoDetails;

    const [tags, setTags] = useState("");

    const createTag = async (e) => {
        e.preventDefault()
        const data = await dispatch(thunkCreateSingleTag(photo.id, tags));
    };


    return (
        <div className='page-wrapper-container'>
            <div className='modal-container'>

                <p className='modal-title'>Add tags</p>

                <div className='modal-body'>

                    <form
                        className="modal-form"
                        onSubmit={createTag}>
                        <label>
                            <textarea
                            className="modal-textarea-input-field"
                            type="text"
                            name="tags"
                            placeholder="Add tags"
                            onChange={(e) => setTags(e.target.value)}
                            required={true}
                            maxLength={500}
                            value={tags}
                            ></textarea>
                        </label>
                        <button className="modal-button" type='submit'>Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}


export default TagCreateForm
