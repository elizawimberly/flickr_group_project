import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateSingleTag } from "../../../store/photosReducer";

function TagCreateForm({ onClose }) {
  const dispatch = useDispatch();

  const photosState = useSelector((state) => state.photos);

  const photo = photosState.singlePhotoDetails;

  const [tags, setTags] = useState("");

  const createTag = async (e) => {
    e.preventDefault();
    await dispatch(thunkCreateSingleTag(photo.id, tags));
    onClose()
  };

  return (
      <div className="modal-container">
        <p className="modal-title">Add tags</p>

        <div className="modal-body">
          <form className="modal-form" onSubmit={createTag}>
            <label>
              <textarea
                className="modal-textarea-input-field"
                type="text"
                name="tags"
                placeholder="Add tags"
                onChange={(e) => setTags(e.target.value)}
                minLength={2}
                maxLength={50}
                value={tags}
              ></textarea>
            </label>
            <button className="modal-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
  );
}

export default TagCreateForm;
