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

            <p>Tag Create Form</p>
            <form onSubmit={createTag}>
                <label>
                     <input
                     className="inputFieldTypeText"
                     type="text"
                     name="tags"
                     placeholder="Add tags"
                     onChange={(e) => setTags(e.target.value)}
                     required={true}
                     minLength={2}
                     maxLength={50}
                     value={tags}
                     />
                </label>
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}


export default TagCreateForm
